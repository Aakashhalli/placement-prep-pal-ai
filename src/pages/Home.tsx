import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  FileText,
  BookCheck,
  PersonStanding,
  Laptop,
  BriefcaseBusiness,
} from "lucide-react";
import Spline from "@splinetool/react-spline";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="py-20">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 mb-24">
            {/* Left: Title and Subtitle */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Heading level={1} className="text-gradient mb-6">
                  Hire AI
                </Heading>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-muted-foreground text-xl mb-10 max-w-xl mx-auto lg:mx-0"
              >
                Your AI companion for placement preparation. Get ready for
                interviews with our suite of tools: YouTube Notes Generator,
                ATS-Friendly Resume Builder, AI Mock Interview and practice
                Aptitude. Ace your placements with confidence and ease, get
                personalized job recommendations based on your profile.
              </motion.p>
            </div>

            {/* Right: Spline Model */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-1/2 w-full aspect-video"
            >
              {/* <div className="w-full h-full"> */}
              <Spline scene="https://prod.spline.design/f9pjhsfK8kRBetrb/scene.splinecode" />
              {/* </div> */}
            </motion.div>
          </div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
          >
            <Link to="/youtube-notes">
              <Button size="lg" variant="outline" className="gap-2">
                <BookCheck className="h-5 w-5" />
                Generate YouTube Notes
              </Button>
            </Link>
            <Link to="/legacy">
              <Button size="lg" variant="outline" className="gap-2">
                <FileText className="h-5 w-5" />
                Build Your Resume
              </Button>
            </Link>
            <Link to="/interview">
              <Button size="lg" variant="outline" className="gap-2">
                <Laptop className="h-5 w-5" />
                Start Mock Interview
              </Button>
            </Link>
          </motion.div> */}
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
              <Heading level={2} className="border-none">
                YouTube Notes Generator
              </Heading>
            </div>
            <p className="text-muted-foreground mb-4">
              Extract concise, well-structured notes from any CS-related YouTube
              videos. Get technical questions for practice.
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
              <Heading level={2} className="border-none">
                ATS-Friendly Resume Builder
              </Heading>
            </div>
            <p className="text-muted-foreground mb-4">
              Create professional, ATS-optimized resumes with our guided
              builder. Stand out in the placement process.
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
            <Link to="/legacy">
              <Button className="w-full">Build Your Resume</Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-morphism p-8 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <Laptop className="h-8 w-8 text-highlight mr-4" />
              <Heading level={2} className="border-none">
                AI Mock Interview
              </Heading>
            </div>
            <p className="text-muted-foreground mb-4">
              Practice mock interviews with AI. Get real-time feedback on your
              performance and improve your skills.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span>Engage in natural, voice-based interviews</span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span>Get detailed feedback and improvement tips</span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span>Set difficulty based on your prep level</span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span>Practice CS topics like DSA, DBMS, OS, and more</span>
              </li>
            </ul>

            <Link to="/legacy">
              <Button className="w-full">Start an Interview</Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-morphism p-8 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <BriefcaseBusiness className="h-8 w-8 text-highlight mr-4" />
              <Heading level={2} className="border-none">
                AI LinkedIn Job Finder
              </Heading>
            </div>
            <p className="text-muted-foreground mb-4">
              Find job opportunities tailored to your skills and preferences.
              Get personalized job recommendations.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span></span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span></span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span></span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span></span>
              </li>
            </ul>

            <Link to="/job-finder">
              <Button className="w-full">Find Jobs</Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-morphism p-8 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <BriefcaseBusiness className="h-8 w-8 text-highlight mr-4" />
              <Heading level={2} className="border-none">
                Aptitude
              </Heading>
            </div>
            <p className="text-muted-foreground mb-4">
              Practice aptitude questions and improve your problem-solving
              skills. Get personalized feedback and tips for improvement.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span></span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span></span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span></span>
              </li>
              <li className="flex items-center">
                <span className="text-highlight mr-2">✓</span>
                <span></span>
              </li>
            </ul>

            <Link to="/aptitude-home">
              <Button className="w-full">Practice Aptitude</Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
