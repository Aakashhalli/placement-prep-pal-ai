import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Message {
  role: "ai" | "user";
  content: string;
}

interface ScoreData {
  confidence: number[];
  knowledge: number[];
  relevance: number[];
  language: number[];
  clarity: number[];
}

import html2pdf from "html2pdf.js";

const downloadReportAsPDF = () => {
  const element = document.getElementById("pdf-content");
  if (!element) return;

  // Clone the element to avoid affecting the visible page
  const clonedElement = element.cloneNode(true) as HTMLElement;
  clonedElement.style.backgroundColor = "#121212";

  // Optionally, set text color for visibility if needed
  // clonedElement.style.color = '#fff';

  const opt = {
    margin: 0,
    filename: "interview-report.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: null, // Let the element's own background show through
    },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(opt).from(clonedElement).save();
};

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scores, topic, difficulty, tone, messages, overallScore } =
    (location.state || {}) as {
      scores: ScoreData;
      topic: string;
      difficulty: string;
      tone: string;
      messages: Message[];
      overallScore: number;
    };

  React.useEffect(() => {
    if (!scores) {
      navigate("/");
    }
  }, [scores, navigate]);

  if (!scores) {
    return <div className="text-light">Loading...</div>;
  }

  const interviewDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const confidenceData = scores.confidence.map((score, index) => ({
    name: `Q${index + 1}`,
    value: score,
  }));

  const knowledgeData = scores.knowledge.map((score, index) => ({
    name: `Q${index + 1}`,
    value: score,
  }));

  const relevanceData = [
    {
      name: "Relevant",
      value: Math.round(
        (scores.relevance.reduce((acc, val) => acc + val, 0) /
          scores.relevance.length) *
          10
      ),
    },
    {
      name: "Irrelevant",
      value:
        100 -
        Math.round(
          (scores.relevance.reduce((acc, val) => acc + val, 0) /
            scores.relevance.length) *
            10
        ),
    },
  ];

  const radarData = [
    {
      subject: "Confidence",
      A:
        scores.confidence.reduce((acc, val) => acc + val, 0) /
        scores.confidence.length,
      fullMark: 10,
    },
    {
      subject: "Knowledge",
      A:
        scores.knowledge.reduce((acc, val) => acc + val, 0) /
        scores.knowledge.length,
      fullMark: 10,
    },
    {
      subject: "Relevance",
      A:
        scores.relevance.reduce((acc, val) => acc + val, 0) /
        scores.relevance.length,
      fullMark: 10,
    },
    {
      subject: "Language",
      A:
        scores.language.reduce((acc, val) => acc + val, 0) /
        scores.language.length,
      fullMark: 10,
    },
    {
      subject: "Clarity",
      A:
        scores.clarity.reduce((acc, val) => acc + val, 0) /
        scores.clarity.length,
      fullMark: 10,
    },
  ];

  const generateFeedback = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scores, // { confidence: [], knowledge: [], relevance: [], language: [], clarity: [] }
          topic,
          difficulty,
          tone,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch feedback");

      const { feedback } = await response.json(); // feedback: string[]
      return feedback;
    } catch (err) {
      console.error("Error fetching feedback:", err);
      return ["Could not generate feedback due to a server error."];
    }
  };
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const result = await generateFeedback();
      setFeedback(result);
    };

    fetchFeedback();
  }, []);

  const COLORS = ["#007BFF", "#FF4C4C", "#FFD700", "#4CAF50", "#9C27B0"];

  return (
    <PageTransition className="min-h-screen flex flex-col bg-dark text-light">
      {/* <Navbar /> */}

      <main className="flex-1 container mx-auto px-4 py-8 animate-fade-in">
        <div id="pdf-content">
          <div className="bg-dark-light rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Interview Performance Report
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-neutral">
              <div>
                <p className="font-medium">
                  Topic: <span className="text-light">{topic}</span>
                </p>
                <p className="font-medium">
                  Difficulty: <span className="text-light">{difficulty}</span>
                </p>
              </div>
              <div>
                <p className="font-medium">
                  Tone: <span className="text-light">{tone}</span>
                </p>
                <p className="font-medium">
                  Questions:{" "}
                  <span className="text-light">{scores.confidence.length}</span>
                </p>
              </div>
              <div>
                <p className="font-medium">
                  Interview Date:{" "}
                  <span className="text-light">{interviewDate}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-dark-light rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Confidence Level</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={confidenceData}>
                  <XAxis dataKey="name" stroke="#e0e0e0" />
                  <YAxis domain={[0, 10]} stroke="#e0e0e0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2A2A2A",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#007BFF"
                    strokeWidth={3}
                    dot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-dark-light rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Depth of Knowledge</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={knowledgeData}>
                  <XAxis dataKey="name" stroke="#e0e0e0" />
                  <YAxis domain={[0, 10]} stroke="#e0e0e0" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2A2A2A",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="value" fill="#007BFF" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-dark-light rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Relevance to Topic</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={relevanceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={60}
                    fill="#8884d8"
                    label
                  >
                    {relevanceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2A2A2A",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-dark-light rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Overall Performance</h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={radarData}
                >
                  <PolarGrid stroke="#555" />
                  <PolarAngleAxis dataKey="subject" stroke="#e0e0e0" />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 10]}
                    stroke="#e0e0e0"
                  />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke="#007BFF"
                    fill="#007BFF"
                    fillOpacity={0.5}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2A2A2A",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-md border border-white/10">
            <h2 className="text-xl font-bold text-white mb-4">Clarity</h2>

            <div className="w-full bg-white/10 rounded-full h-6 mb-2 overflow-hidden">
              <div
                className="bg-white h-6 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${
                    (scores.clarity.reduce((acc, val) => acc + val, 0) /
                      scores.clarity.length) *
                    10
                  }%`,
                }}
              />
            </div>

            <div className="flex justify-between text-xs text-neutral-300">
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
          <div className="bg-dark-light rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center mb-6">
              <div className="md:w-1/3 flex flex-col items-center mb-4 md:mb-0">
                <div className="text-6xl font-bold text-accent-blue mb-2">
                  {overallScore.toFixed(1)}
                </div>
                <p className="text-neutral">Overall Score</p>
              </div>
              <div className="md:w-2/3 md:pl-8 border-l border-neutral">
                <h3 className="text-xl font-bold mb-4">
                  Feedback & Recommendations
                </h3>
                <ul className="space-y-2">
                  {feedback.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent-blue mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>{" "}
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={downloadReportAsPDF}
            className="px-6 py-3 bg-accent-blue text-white rounded-md 
             hover:bg-accent-blue/90 hover:shadow-md 
             border border-transparent hover:border-white 
             transition-all duration-300 ease-in-out 
             disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download Report (PDF)
          </Button>

          <Button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-accent-green text-white rounded-md 
             hover:bg-accent-green/90 hover:shadow-md 
             border border-transparent hover:border-white 
             transition-all duration-300 ease-in-out 
             disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start New Interview
          </Button>
        </div>
      </main>
    </PageTransition>
  );
};

export default Report;
