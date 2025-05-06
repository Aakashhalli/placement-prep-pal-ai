
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ResumeStep, Resume } from "@/types/resume";

interface ResumeStepsProps {
  currentStep: ResumeStep;
  resume: Resume;
  onStepClick: (step: ResumeStep) => void;
}

const ResumeSteps: React.FC<ResumeStepsProps> = ({
  currentStep,
  resume,
  onStepClick,
}) => {
  const steps: ResumeStep[] = [
    "template",
    "personal",
    "education",
    "skills",
    "experience",
    "projects",
    "preview",
  ];

  const isStepDisabled = (step: ResumeStep): boolean => {
    switch (step) {
      case "personal":
        return !resume.template;
      case "education":
        return !resume.personalInfo.firstName || !resume.personalInfo.lastName;
      case "skills":
        return resume.education.length === 0;
      case "experience":
        return resume.skills.every((sk) => sk.items.length === 0);
      case "projects":
        return resume.experience.length === 0;
      case "preview":
        return resume.projects.length === 0;
      default:
        return false;
    }
  };

  return (
    <nav className="flex flex-wrap space-x-1 md:space-x-2 justify-center">
      {steps.map((step) => (
        <Button
          key={step}
          variant={currentStep === step ? "default" : "outline"}
          size={currentStep === step ? "default" : "sm"}
          onClick={() => onStepClick(step as ResumeStep)}
          className={`first:rounded-l-md last:rounded-r-md transition-all 
            ${currentStep === step ? "ring-2 ring-primary" : ""} 
            px-2 md:px-3 my-1 text-xs md:text-sm`}
          disabled={isStepDisabled(step)}
        >
          {step.charAt(0).toUpperCase() + step.slice(1)}
          {currentStep === step && <Check className="ml-1 h-3 w-3 md:h-4 md:w-4" />}
        </Button>
      ))}
    </nav>
  );
};

export default ResumeSteps;
