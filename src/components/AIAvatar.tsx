
import React from "react";

interface AIAvatarProps {
  size?: "large" | "small";
}

const AIAvatar: React.FC<AIAvatarProps> = ({ size = "large" }) => {
  return (
    <div className={`ai-avatar-container ${size === "large" ? "w-80 h-80" : "w-40 h-40"} relative mx-auto`}>
      <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-accent-blue/20 z-10">
        <img 
          src="https://cdn.dribbble.com/userupload/23662114/file/original-e1b947cb36707ae1cec1023eddafec04.gif" 
          alt="AI Avatar" 
          className="w-full h-full object-cover"
        />
      </div>
      {/* Animated neon lights */}
      <div className="animate-spin-slow absolute inset-0 rounded-full border-2 border-accent-blue opacity-70" style={{ animationDuration: "8s" }}></div>
      <div className="animate-spin-slow absolute inset-0 rounded-full border-2 border-accent-red opacity-70" style={{ animationDuration: "10s", animationDirection: "reverse" }}></div>
    </div>
  );
};

export default AIAvatar;
