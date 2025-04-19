
import { Heading } from "@/components/ui/heading";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Heading level={1} className="mb-6">About PrepPal AI</Heading>
        
        <div className="space-y-6 text-muted-foreground">
          <p>
            PrepPal AI is an innovative platform designed to assist students with their placement preparation 
            through AI-powered tools. Our mission is to make the placement preparation process more efficient,
            organized, and accessible to all students.
          </p>
          
          <Heading level={2} className="mt-8 mb-4">Our Features</Heading>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">YouTube Transcript-based Notes Generator</h3>
              <p>
                Our YouTube Notes Generator allows you to extract valuable information from educational videos. Simply 
                provide a link to any CS-related YouTube video, and our AI will generate concise, well-structured notes
                along with relevant technical questions to test your understanding.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">ATS-Friendly Resume Builder</h3>
              <p>
                Creating a resume that passes through Applicant Tracking Systems (ATS) can be challenging. Our Resume 
                Builder guides you through the process step-by-step, ensuring your resume is formatted perfectly, 
                highlights your skills effectively, and maximizes your chances of landing that interview.
              </p>
            </div>
          </div>
          
          <Heading level={2} className="mt-8 mb-4">Why Choose PrepPal AI?</Heading>
          
          <ul className="list-disc list-inside space-y-2">
            <li>AI-powered tools that save you time and effort</li>
            <li>Structured approach to organizing your learning materials</li>
            <li>Technical questions to test and reinforce your knowledge</li>
            <li>ATS-optimized resume templates designed for tech industry success</li>
            <li>Dark mode interface to reduce eye strain during long study sessions</li>
            <li>User-friendly design focused on simplicity and effectiveness</li>
          </ul>
          
          <Heading level={2} className="mt-8 mb-4">Our Team</Heading>
          
          <p>
            PrepPal AI was created by a team of passionate developers and educators who understand the challenges
            students face during placement preparation. Our collective experience in education, AI, and the tech
            industry has shaped this platform to address real needs of students preparing for placements.
          </p>
          
          <div className="mt-12 text-center">
            <p className="italic">
              "Our goal is to empower students with tools that make placement preparation more efficient,
              allowing them to focus on learning rather than organizing."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
