import React from "react";
// import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a backend API
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <PageTransition className="min-h-screen flex flex-col bg-dark text-light">
      <Navbar />

      <main className="flex-1 container mx-auto px-6 py-12 animate-fade-in">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent-blue">
                Get in Touch
              </h2>
              <p className="text-light-muted mb-6">
                Have questions or feedback about AI Interviewer? We'd love to
                hear from you! Fill out the form, and we'll get back to you as
                soon as possible.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-accent-blue"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <span className="text-light-muted">
                    support@ai-interviewer.com
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-accent-blue"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <span className="text-light-muted">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>

            <div className="bg-dark-light rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    className="bg-dark border-neutral"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="bg-dark border-neutral"
                    placeholder="Your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    className="bg-dark border-neutral"
                    placeholder="Message subject"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    className="bg-dark border-neutral min-h-[120px]"
                    placeholder="Your message"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent-blue hover:bg-accent-blue/80"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Contact;
