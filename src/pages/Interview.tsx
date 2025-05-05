import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import Navbar from "@/components/Navbar";
import AIAvatar from "@/components/AIAvatar";
import PageTransition from "@/components/PageTransition";
import { toast } from "@/components/ui/sonner";
import ChatInterface from "@/components/interview/ChatInterface";
import InterviewControls from "@/components/interview/InterviewControls";

interface Message {
  role: "ai" | "user";
  content: string;
  timestamp: string; // Example: "10:32 AM"
}

interface ScoreData {
  confidence: number[];
  knowledge: number[];
  relevance: number[];
  language: number[];
  clarity: number[];
}

// global.d.ts
interface Window {
  SpeechRecognition: typeof SpeechRecognition | undefined;
  webkitSpeechRecognition: typeof webkitSpeechRecognition | undefined;
}
const getCurrentTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const Interview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [readyForReport, setReadyForReport] = useState(false);
  const [scores, setScores] = useState<ScoreData>({
    confidence: [],
    knowledge: [],
    relevance: [],
    language: [],
    clarity: [],
  });

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get("topic") || "";
  const difficulty = queryParams.get("difficulty") || "";
  const tone = queryParams.get("tone") || "";

  const handleStartInterview = async () => {
    setIsLoading(true);

    try {
      const queryParams = new URLSearchParams(location.search);
      const topic = queryParams.get("topic") || "";
      const difficulty = queryParams.get("difficulty") || "";
      const tone = queryParams.get("tone") || "";

      // Send the interview configuration to the backend
      const response = await fetch(
        "http://localhost:5000/api/start-interview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic, difficulty, tone }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.question) {
        throw new Error("Invalid response from interview API.");
      }

      const firstQuestion = data.question;

      // Display the question in the chat
      setMessages([
        { role: "ai", content: firstQuestion, timestamp: getCurrentTime() },
      ]);
      setInterviewStarted(true);
      toast.success("Interview started successfully!");

      // Fetch the audio from Murf API
      const speakResponse = await fetch("http://localhost:5000/api/speak", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: firstQuestion }),
      });

      const speakData = await speakResponse.json();

      if (!speakResponse.ok || !speakData.audioUrl) {
        throw new Error("Failed to generate audio");
      }

      // Play the audio
      const audio = new Audio(speakData.audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error starting interview:", error);
      toast.error("Failed to start interview. Please try again.");
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAudioRecordingComplete = async (transcribedText: string) => {
    setIsLoading(true); // Indicate loading state

    try {
      // Send the transcribed text to the backend to get a response and scores
      const response = await fetch("http://localhost:5000/api/mid-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: transcribedText }), // Use transcribed text directly
      });

      const data = await response.json();
      const {
        message,
        scores: {
          confidencelevel,
          clarityOfThought,
          depthOfknowledge,
          languageProficiency,
          revelencetotopic,
        },
      } = data;

      // Update messages with the user input and AI response
      setMessages((prev) => [
        ...prev,
        { role: "user", content: transcribedText, timestamp: getCurrentTime() },
        { role: "ai", content: message, timestamp: getCurrentTime() },
      ]);

      // Update scores for reporting
      setScores((prev) => ({
        confidence: [...prev.confidence, confidencelevel],
        clarity: [...prev.clarity, clarityOfThought],
        knowledge: [...prev.knowledge, depthOfknowledge],
        language: [...prev.language, languageProficiency],
        relevance: [...prev.relevance, revelencetotopic],
      }));

      // Call API to get speech synthesis for the AI's response
      const speakRes = await fetch("http://localhost:5000/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }), // Pass AI response text
      });

      const speakData = await speakRes.json();

      if (speakData.audioUrl) {
        // Play the AI response audio
        const audio = new Audio(speakData.audioUrl);
        audio.play();
      } else {
        console.warn("No audio returned from /api/speak");
      }
    } catch (err) {
      console.error("Failed to fetch follow-up or speak:", err);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleStopInterview = () => {
    setReadyForReport(true);
    toast.success("Interview completed! You can now view your report.");
  };

  const handleViewReport = () => {
    // Calculate average of each metric
    const average = (arr: number[]) =>
      arr.reduce((sum, val) => sum + val, 0) / arr.length || 0;

    const averageConfidence = average(scores.confidence);
    const averageKnowledge = average(scores.knowledge);
    const averageRelevance = average(scores.relevance);
    const averageLanguage = average(scores.language);
    const averageClarity = average(scores.clarity);

    // Calculate overall score (average of all averages)
    const overallScore =
      (averageConfidence +
        averageKnowledge +
        averageRelevance +
        averageLanguage +
        averageClarity) /
      5;

    navigate("/report", {
      state: {
        scores,
        topic,
        difficulty,
        tone,
        messages,
        overallScore: parseFloat(overallScore.toFixed(1)), // rounded to 1 decimal place
      },
    });
  };

  return (
    <PageTransition className="min-h-screen flex flex-col bg-dark text-white">
      {/* <Navbar /> */}

      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        {/* Top Section (20% height) - Avatar */}
        <div className="h-1/5 flex justify-center items-center mb-6">
          <AIAvatar size="small" />
        </div>

        {/* Middle Section (60% height) - Chat */}
        <div className="h-3/5 mb-6">
          <ChatInterface messages={messages} isLoading={isLoading} />
        </div>

        {/* Bottom Section (20% height) - Controls */}
        <div className="h-1/5">
          <InterviewControls
            interviewStarted={interviewStarted}
            readyForReport={readyForReport}
            isLoading={isLoading}
            messagesLength={messages.length}
            onAudioRecordingComplete={handleAudioRecordingComplete}
            onStartInterview={handleStartInterview}
            onStopInterview={handleStopInterview}
            onViewReport={handleViewReport}
          />
        </div>
      </main>
    </PageTransition>
  );
};

export default Interview;
