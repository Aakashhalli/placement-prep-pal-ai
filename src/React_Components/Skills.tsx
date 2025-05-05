import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { useSelector, useDispatch } from "react-redux";
import { SaveSkillsDetails } from "../Slices/ResumeSlice.js";
import toast from "react-hot-toast";
import { Loader2, CopyPlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Preview from "../Utilities/Preview";
import { X } from "lucide-react";
import { PlusIcon } from "lucide-react";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  const [aiSkills, setAiSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingState = useSelector((state) => state.Resume.loading);
  const error = useSelector((state) => state.Resume.error);
  const resumeData = useSelector((state) => state.Resume.resume);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    setSkills(resumeData.skills || []);
  }, [resumeData.skills]);

  const addSkill = () => {
    if (inputSkill.trim() !== "") {
      setSkills([...skills, inputSkill.trim()]);
      setInputSkill("");
    }
  };
  const handleRemoveSkill = (indexToRemove) => {
    setSkills((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const askAI = async () => {
    setLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `List 5 professional and technical skills relevant to ${resumeData.previousJob.title}. Include 2 communication skills. Keep responses concise and response should be plain text no highlighting and text formating, no bold text only plain. dont add numbering or - before a skill`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const suggestedSkills = text
        .split("\n")
        .map((skill) => skill.trim())
        .filter((skill) => skill);
      setAiSkills(suggestedSkills);
    } catch (error) {
      console.error("Error fetching AI skills:", error);
      toast.error("Something went wrong! please try again");
    }
    setLoading(false);
  };

  const submit = async () => {
    try {
      await dispatch(
        SaveSkillsDetails({ resumeId: resumeData._id, data: skills })
      ).unwrap();
      toast.success("Skills saved!");
      navigate("/create/projects");
    } catch (err) {
      console.error(err);
      toast.error(error || "An error occurred.");
    }
  };

  const CopySummary = async (data) => {
    if (data !== "") {
      navigator.clipboard.writeText(data).then(() => {
        toast.success("Copied to clipboard!");
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-black rounded-lg ">
      <h2 className="text-3xl font-bold text-white">
        What skills would you like to highlight?
      </h2>
      <p className="text-gray-600">
        Choose from AI recommendations or enter your own.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Recommendations */}
        <Card className="shadow-lg bg-black">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full bg-black hover:bg-gray-800 text-white mb-3 border border-zinc-400"
              onClick={askAI}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Ask AI for Skills"
              )}
            </Button>
            <ul className="space-y-2">
              {aiSkills.map((skill, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md"
                >
                  <span className="text-gray-700">{skill}</span>
                  <PlusIcon
                    onClick={() => {
                      if (!skills.includes(skill)) {
                        setSkills((prev) => [...prev, skill]);
                      } else {
                        toast("Skill already added!");
                      }
                    }}
                    className="cursor-pointer text-green-600 hover:text-black"
                    size={20}
                    title="Add to your skills"
                  />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Your Skills */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Add Your Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Input
                placeholder="Type a skill..."
                value={inputSkill}
                onChange={(e) => setInputSkill(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={addSkill}
                className="bg-black hover:bg-gray-800 text-white"
              >
                Add
              </Button>
            </div>
            <Separator className="my-4" />
            <ul className="space-y-2">
              {skills.map((skill, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-4 py-2 rounded-md bg-[#1E1E1E] text-[#F5F5F5] hover:bg-[#2A2A2A] transition"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(index)}
                    className="text-[#FF4C4C] hover:text-red-600 transition"
                    aria-label="Remove skill"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant=""
          className="rounded-md"
          onClick={(e) => {
            e.preventDefault();
            setisOpen(true);
          }}
        >
          Preview
        </Button>

        {loadingState ? (
          <Button
            disabled
            className="rounded-md bg-[#007BFF] hover:bg-[#2e93ff] text-[#E0E0E0] flex items-center"
          >
            <Loader2 className="animate-spin mr-2" />
            Saving...
          </Button>
        ) : (
          <Button
            onClick={submit}
            className="rounded-md bg-[#007BFF] hover:bg-[#2e93ff] text-[#E0E0E0]"
          >
            Next: Projects
          </Button>
        )}
      </div>

      {isOpen && <Preview Open={isOpen} onClose={() => setisOpen(false)} />}
    </div>
  );
}
