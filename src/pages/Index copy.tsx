
import React from "react";
import Navbar from "@/components/Navbar";
import AIAvatar from "@/components/AIAvatar";
import InterviewForm from "@/components/InterviewForm";
import PageTransition from "@/components/PageTransition";
import { CheckCircle } from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "AI-Powered Interviews",
      description: "Experience realistic interview scenarios with our advanced AI interviewer"
    },
    {
      title: "Voice Interaction",
      description: "Natural voice-based conversations for a more immersive experience"
    },
    {
      title: "Instant Feedback",
      description: "Receive detailed performance analysis and improvement suggestions"
    },
    {
      title: "Multiple Topics",
      description: "Practice interviews across various CS domains including DSA, DBMS, OS, and more"
    },
    {
      title: "Customizable Difficulty",
      description: "Choose your preferred difficulty level to match your preparation stage"
    },
    {
      title: "Resume Integration",
      description: "Upload your resume for personalized interview questions"
    }
  ];

  return (
    <PageTransition className="min-h-screen flex flex-col bg-dark text-light">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-center mb-16">
          {/* Form Section */}
          <div className="w-full md:w-3/5 flex flex-col items-center animate-slide-right">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Prepare for Your Next CSE Interview with AI
              </h1>
              <p className="text-light-muted text-lg max-w-2xl mx-auto">
                Practice with AI-powered interviews tailored to your preferences and get instant feedback to improve your skills.
              </p>
            </div>
            
            <InterviewForm />
          </div>
          
          {/* Avatar Section */}
          <div className="w-full md:w-2/5 flex items-center justify-center animate-slide-left">
            <div className="relative">
              <AIAvatar size="large" />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-12 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-dark-light p-6 rounded-lg border border-neutral/20 hover:border-neutral transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-accent-blue shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-light-muted">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Index;
