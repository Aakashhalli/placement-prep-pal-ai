import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Search, CopyPlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { SaveAboutDetails } from "../Slices/ResumeSlice";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Preview from "../Utilities/Preview";
import { useNavigate } from "react-router-dom";

function About() {
  const [searchTerm, setSearchTerm] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedSummary, setSuggestedSummary] = useState([]);
  const resumeData = useSelector((state) => state.Resume.resume);
  const error = useSelector((state) => state.Resume.error);
  const loadingState = useSelector((state) => state.Resume.loading);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const navigate = useNavigate();

  const searchWithAI = async () => {
    if (searchTerm) {
      setLoading(true);
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `give me 3 different descriptive summaries on ${searchTerm} for the summary section of my resume. It should be at least 5 lines long, with each summary in its own paragraph. Do not include a title.`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const suggestions = text
          .split("\n")
          .map((s) => s.trim())
          .filter((s) => s);
        setSuggestedSummary(suggestions);
      } catch (err) {
        console.error("Error fetching AI suggestions:", err);
      }
      setLoading(false);
    }
  };

  const submit = async () => {
    try {
      if (summary !== "") {
        await dispatch(
          SaveAboutDetails({
            resumeId: resumeData._id,
            data: summary,
          })
        ).unwrap();
        toast.success("Summary saved!");
        navigate("/create/finalize");
      } else {
        toast.error("Please add something about yourself!");
      }
    } catch (err) {
      toast.error(error);
      console.error(err);
    }
  };

  const copySummary = async (data) => {
    if (data !== "") {
      navigator.clipboard.writeText(data).then(() => {
        toast.success("Copied to Clipboard!");
      });
    }
  };

  return (
    <div className="p-8 w-full bg-black rounded-lg min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-white">
          Briefly tell us about your background
        </h1>
        <p className="text-gray-600 mb-6">
          Choose from our pre-written examples below or write your own.
        </p>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 border-b pb-2">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by job title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-none focus:ring-0"
              />
            </div>
            <div className="mt-3 flex flex-wrap justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {[
                  "Cyber Security Analyst",
                  "Customer Service Representative",
                  "Full Stack Developer",
                  "Backend Developer",
                ].map((job, index) => (
                  <span
                    key={index}
                    onClick={(e) => setSearchTerm(e.target.innerText)}
                    className="cursor-pointer bg-gray-600 text-white rounded-full px-2 py-1 hover:bg-gray-700"
                  >
                    {job}
                  </span>
                ))}
              </div>
              {loading ? (
                <Button className="rounded-full" disabled>
                  Searching...
                </Button>
              ) : (
                <Button className="rounded-full" onClick={searchWithAI}>
                  {<Search />} Search
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ready-to-use Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              {suggestedSummary.length !== 0 ? (
                suggestedSummary.map((text, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-md mb-2 flex items-start gap-2"
                  >
                    <p className="text-sm flex-1">{text}</p>
                    <CopyPlusIcon
                      onClick={() => copySummary(text)}
                      className="cursor-pointer text-orange-500 hover:text-black"
                      width="20px"
                    />
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400">
                  Start by searching something...
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Write your summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your summary here..."
                onChange={(e) => setSummary(e.target.value)}
                className="h-32"
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
          <Button
            className="rounded-md"
            variant=""
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
            }}
          >
            Preview
          </Button>
          {loadingState ? (
            <Button
              disabled
              className="rounded-md bg-[#007BFF] hover:bg-[#2e93ff] text-[#E0E0E0] flex items-center gap-2"
            >
              <Loader2 className="animate-spin" />
              Saving...
            </Button>
          ) : (
            <Button
              onClick={submit}
              className="rounded-md bg-[#007BFF] hover:bg-[#2e93ff] text-[#E0E0E0]"
            >
              Next: Finalize
            </Button>
          )}
        </div>
        {isOpen && <Preview Open={isOpen} onClose={() => setIsOpen(false)} />}
      </div>
    </div>
  );
}

export default About;
