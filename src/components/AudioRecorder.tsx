import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface AudioRecorderProps {
  onRecordingComplete: (text: string) => void; // Pass transcribed text to parent
  isDisabled: boolean;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  isDisabled,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [livePreview, setLivePreview] = useState(""); // Optional: for UI display
  const fullTranscriptRef = useRef(""); // Collects the full transcript
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startRecording = () => {
    if (
      !("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      (window as any).webkitSpeechRecognition)();
    recognitionRef.current = recognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    fullTranscriptRef.current = ""; // reset transcript
    setLivePreview("");
    setIsRecording(true);

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          fullTranscriptRef.current += result[0].transcript + " ";
        } else {
          interim += result[0].transcript;
        }
      }
      setLivePreview(fullTranscriptRef.current + interim); // live display
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      alert("Speech recognition error. Please try again.");
      stopRecording();
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      const finalTranscript = fullTranscriptRef.current.trim();
      console.log("📝 Final Full Transcript:", finalTranscript); // Final output
      onRecordingComplete(finalTranscript);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isDisabled}
        className={`px-6 py-3 rounded-md text-white font-semibold transition-colors duration-200
    ${
      isDisabled
        ? "bg-gray-400 cursor-not-allowed"
        : isRecording
        ? "bg-red-600 hover:bg-red-700 animate-pulse"
        : "bg-blue-600 hover:bg-blue-700"
    }`}
      >
        {isRecording ? "Stop Recording" : "Start Speaking"}
      </Button>

      {isRecording && (
        <div className="mt-4 w-full max-w-xl text-sm text-white bg-black/60 backdrop-blur-sm border border-white/10 rounded-md p-4 shadow-md whitespace-pre-wrap max-h-48 overflow-y-auto">
          {livePreview || "Listening..."}
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
