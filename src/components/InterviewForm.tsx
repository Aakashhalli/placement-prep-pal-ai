import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const InterviewForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topic: "",
    difficulty: "",
    tone: "",
    resume: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (
      file &&
      (file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFormData({ ...formData, resume: file });
    } else if (file) {
      alert("Please upload a valid PDF or DOCX file");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.topic || !formData.difficulty || !formData.tone) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    // Here we would normally make an API call to start the interview
    // For now, we'll simulate a successful API call
    try {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to the interview page with query parameters
      navigate(
        `/interview-start?topic=${formData.topic}&difficulty=${formData.difficulty}&tone=${formData.tone}`
      );
    } catch (error) {
      console.error("Error starting interview:", error);
      alert("Failed to start interview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 animate-fade-in w-full max-w-md"
    >
      <div className="space-y-2">
        <Label htmlFor="topic" className="text-light">
          Topic <span className="text-accent-red">*</span>
        </Label>
        <Select
          required
          value={formData.topic}
          onValueChange={(value) => setFormData({ ...formData, topic: value })}
        >
          <SelectTrigger className="bg-black border-neutral">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent className="bg-black text-light border-neutral">
            <SelectItem value="DBMS">
              Database Management Systems (DBMS)
            </SelectItem>
            <SelectItem value="OS">Operating Systems (OS)</SelectItem>
            <SelectItem value="CN">Computer Networks (CN)</SelectItem>
            <SelectItem value="DSA">
              Data Structures & Algorithms (DSA)
            </SelectItem>
            <SelectItem value="OOP">
              Object-Oriented Programming (OOP)
            </SelectItem>
            <SelectItem value="HR">HR Interview</SelectItem>
            <SelectItem value="TechHR">Technical HR Interview</SelectItem>
            <SelectItem value="AllInOne">All-in-One Interview</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficulty" className="text-light">
          Difficulty <span className="text-accent-red">*</span>
        </Label>
        <Select
          required
          value={formData.difficulty}
          onValueChange={(value) =>
            setFormData({ ...formData, difficulty: value })
          }
        >
          <SelectTrigger className="bg-black border-neutral">
            <SelectValue placeholder="Select difficulty level" />
          </SelectTrigger>
          <SelectContent className="bg-black text-light border-neutral">
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tone" className="text-light">
          Tone <span className="text-accent-red">*</span>
        </Label>
        <Select
          required
          value={formData.tone}
          onValueChange={(value) => setFormData({ ...formData, tone: value })}
        >
          <SelectTrigger className="bg-black border-neutral">
            <SelectValue placeholder="Select interview tone" />
          </SelectTrigger>
          <SelectContent className="bg-black text-light border-neutral">
            <SelectItem value="Friendly">Friendly</SelectItem>
            <SelectItem value="Formal">Formal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* <div className="space-y-2">
        <Label htmlFor="resume" className="text-light">
          Resume (Optional)
        </Label>
        <Input
          id="resume"
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="bg-dark-light text-light border-neutral cursor-pointer file:cursor-pointer file:bg-dark file:text-light file:border-neutral"
        />
        <p className="text-xs text-neutral mt-1">
          Accepts PDF or DOCX files only
        </p>
      </div> */}

      <Button
        type="submit"
        className="w-full bg-black text-white border-[1.5px] border-white font-medium py-3 rounded-md 
             hover:bg-accent-blue hover:border-accent-blue transition-all duration-300 ease-in-out 
             hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Starting Interview..." : "Start Interview"}
      </Button>
    </form>
  );
};

export default InterviewForm;
