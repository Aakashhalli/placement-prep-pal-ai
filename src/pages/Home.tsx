
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { FileText, BookCheck } from "lucide-react";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="py-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading level={1} className="text-gradient mb-6">
              Placement Prep Pal AI
            </Heading>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-xl mb-10 max-w-2xl"
          >
            Your AI companion for placement preparation. Generate concise notes from YouTube videos and create ATS-friendly resumes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
          >
            <Link to="/youtube-notes">
              <Button size="lg" className="gap-2">
                <BookCheck className="h-5 w-5" />
                Generate YouTube Notes
              </Button>
            </Link>
            <Link to="/resume-builder">
              <Button size="lg" variant="outline" className="gap-2">
                <FileText className="h-5 w-5" />
                Build Your Resume
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-morphism p-8 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <BookCheck className="h-8 w-8 text-highlight mr-4" />
              <Heading level={2} className="border-none">YouTube Notes Generator</Heading>
            </div>
            <p className="text-muted-foreground mb-4">
              Extract concise, well-structured notes from any CS-related YouTube videos. Get technical questions for practice.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span>Extract and analyze video transcripts</span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span>Generate structured notes with AI</span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span>Get related technical questions</span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span>Download as formatted PDF</span>
              </li>
            </ul>
            <Link to="/youtube-notes">
              <Button className="w-full">Try YouTube Notes</Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-morphism p-8 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-highlight mr-4" />
              <Heading level={2} className="border-none">ATS-Friendly Resume Builder</Heading>
            </div>
            <p className="text-muted-foreground mb-4">
              Create professional, ATS-optimized resumes with our guided builder. Stand out in the placement process.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span>Choose ATS-friendly templates</span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span>Step-by-step guided builder</span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span>Perfect formatting guaranteed</span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span>Download as professional PDF</span>
              </li>
            </ul>
            <Link to="/resume-builder">
              <Button className="w-full">Build Your Resume</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
