import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Wand } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GetStarted() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-14 flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-[#000000] to-[#121212]">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mb-4 text-[#FFFFFF]"
        >
          Build a Standout Resume in Minutes
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg max-w-2xl text-[#E0E0E0]"
        >
          Hire AI helps you craft the perfect resume effortlessly with
          AI-powered suggestions and professional designs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6"
        >
          <Button
            onClick={() => navigate("/legacy/templates")}
            size="lg"
            className="bg-[#007BFF] text-white hover:bg-[#005FCC] rounded-md shadow-lg"
          >
            Get Started for Free
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 text-center bg-[#121212]">
        <h2 className="text-4xl font-bold mb-12 text-[#FFFFFF]">
          Why Choose Hire AI?
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<Wand color="#FFD700" />}
            title="AI-Powered Suggestions"
            description="Generate optimized resumes with AI-driven suggestions."
          />
          <FeatureCard
            icon={<CheckCircle color="#007BFF" />}
            title="ATS-Friendly Formatting"
            description="Ensure your resume gets past applicant tracking systems."
          />
          <FeatureCard
            icon={<FileText color="#FF4C4C" />}
            title="One-Click PDF Export"
            description="Download your resume instantly in professional formats."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-[#000000] to-[#121212] text-center">
        <h2 className="text-4xl font-bold mb-6 text-[#FFFFFF]">
          Ready to Land Your Dream Job?
        </h2>
        <p className="text-lg mb-6 text-[#E0E0E0]">
          Join thousands of professionals using Hire AI to create stunning
          resumes in minutes.
        </p>
        <Button
          onClick={() => navigate("/legacy/templates")}
          size="lg"
          className="bg-[#007BFF] rounded-md hover:bg-[#005FCC] text-white shadow-lg"
        >
          Start Building Your Resume
        </Button>
      </section>
    </div>
  );
}

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="p-6 bg-[#1E1E1E] text-[#F8F8F8] shadow-xl border border-[#2A2A2A]">
    <CardContent className="flex flex-col items-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-[#A9A9A9]">{description}</p>
    </CardContent>
  </Card>
);
