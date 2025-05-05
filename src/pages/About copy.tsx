
import React from "react";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

const About = () => {
  return (
    <PageTransition className="min-h-screen flex flex-col bg-dark text-light">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-6 py-12 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About AI Interviewer</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-blue">Our Mission</h2>
              <p className="text-light-muted">
                AI Interviewer is dedicated to helping Computer Science & Engineering students prepare 
                for technical interviews through AI-powered practice sessions. Our platform simulates 
                realistic interview scenarios, provides instant feedback, and helps students identify 
                areas for improvement.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-blue">How It Works</h2>
              <p className="text-light-muted mb-4">
                Our platform uses advanced AI to generate interview questions tailored to your 
                selected topic and difficulty level. The system analyzes your responses across 
                multiple parameters:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-light-muted">
                <li><span className="font-medium text-light">Confidence Level</span> - How assertively and confidently you present your answers</li>
                <li><span className="font-medium text-light">Depth of Knowledge</span> - Your understanding of core concepts and applications</li>
                <li><span className="font-medium text-light">Relevance to Topic</span> - How well your answers address the specific questions</li>
                <li><span className="font-medium text-light">Language Proficiency</span> - Your communication skills and technical vocabulary</li>
                <li><span className="font-medium text-light">Clarity</span> - The structure and organization of your responses</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-accent-blue">Technology</h2>
              <p className="text-light-muted">
                AI Interviewer leverages state-of-the-art natural language processing and speech 
                recognition technologies to create a seamless interview experience. Our system 
                continuously learns from interactions to improve question quality and feedback accuracy.
              </p>
            </section>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default About;
