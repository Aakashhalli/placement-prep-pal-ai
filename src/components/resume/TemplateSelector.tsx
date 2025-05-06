
import React from "react";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { TemplateType } from "@/types/resume";

interface TemplateSelectorProps {
  selectedTemplate: TemplateType | null;
  onSelectTemplate: (template: TemplateType) => void;
}

interface TemplateCardInfo {
  id: TemplateType;
  label: string;
  bg: string;
  border: string;
  description: string;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  const templateCards: TemplateCardInfo[] = [
    {
      id: "modern",
      label: "Modern",
      bg: "bg-gradient-to-tl from-violet-500/40 via-purple-200/30 to-white/20",
      border: "border-primary",
      description: "Clean and contemporary design with a focus on skills and experience."
    },
    {
      id: "classic",
      label: "Classic",
      bg: "bg-gradient-to-br from-neutral-700/30 via-white/10 to-gray-500/10",
      border: "border-secondary",
      description: "Traditional layout ideal for conventional industries and roles."
    },
    {
      id: "minimal",
      label: "Minimal",
      bg: "bg-gradient-to-br from-gray-800/40 via-white/15 to-neutral-300/5",
      border: "border-muted",
      description: "Streamlined design that prioritizes content over styling."
    },
    {
      id: "professional",
      label: "Professional",
      bg: "bg-gradient-to-br from-blue-600/30 via-sky-300/20 to-white/10",
      border: "border-blue-400",
      description: "Polished template suitable for executive and business roles."
    },
    {
      id: "creative",
      label: "Creative",
      bg: "bg-gradient-to-br from-pink-500/30 via-purple-300/20 to-blue-200/10",
      border: "border-pink-400",
      description: "Distinctive design for creative fields and design roles."
    }
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-center">
        {templateCards.map((template) => (
          <Card
            key={template.id}
            className={`
              cursor-pointer transition-all duration-200 hover:shadow-lg
              border-2 rounded-xl shadow-md flex flex-col items-center py-6 px-4 relative group
              ${selectedTemplate === template.id ? `${template.border} ring-2 ring-primary bg-highlight/5` : "border-muted"}
              ${template.bg}
            `}
            onClick={() => onSelectTemplate(template.id)}
            style={{ width: 220, height: 280 }}
          >
            <div className="aspect-[3/4] w-32 h-40 rounded overflow-hidden flex items-center justify-center bg-white text-primary font-semibold text-lg shadow border">
              {template.label}
            </div>
            <p className="text-center font-medium mt-3">{template.label}</p>
            <p className="text-xs text-center text-muted-foreground mt-1 px-2">{template.description}</p>
            {selectedTemplate === template.id && (
              <span className="absolute top-3 right-4 rounded-full bg-primary text-primary-foreground text-xs px-3 py-1 font-bold shadow z-10">
                Selected
              </span>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
