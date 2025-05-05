import React, { useEffect, useState } from "react";
import {
  TemplateOne,
  TemplateTwo,
  TemplateThree,
  TemplateFour,
  TemplateFive,
  TemplateSix,
  TemplateSeven,
  TemplateEight,
  TemplateNine,
  TemplateTen,
} from "../React_Components/ResumeTemplates/Templates";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

function Preview({ Open, onClose }) {
  const resumeData = useSelector((state) => state.Resume.resume);
  const [isVisible, setIsVisible] = useState(Open);

  useEffect(() => {
    if (Open) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 200);
    }
  }, [Open]);

  const Templates = [
    { template: <TemplateOne data={resumeData} />, code: "101" },
    { template: <TemplateTwo data={resumeData} />, code: "102" },
    { template: <TemplateThree data={resumeData} />, code: "103" },
    { template: <TemplateFour data={resumeData} />, code: "104" },
    { template: <TemplateFive data={resumeData} />, code: "105" },
    { template: <TemplateSix data={resumeData} />, code: "106" },
    { template: <TemplateSeven data={resumeData} />, code: "107" },
    { template: <TemplateEight data={resumeData} />, code: "108" },
    { template: <TemplateNine data={resumeData} />, code: "109" },
    { template: <TemplateTen data={resumeData} />, code: "110" },
  ];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {Open && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white p-4 sm:p-6 rounded-lg shadow-xl w-full max-w-[90%] md:max-w-4xl relative mx-4"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Button
              className="absolute top-4 right-4 hover:bg-red-600 bg-red-500 text-white px-3 py-2 rounded-full"
              onClick={onClose}
            >
              <X size={"20px"} />
            </Button>

            <h2 className="text-2xl font-bold mb-4 text-center">
              Resume Preview
            </h2>

            <div className="max-h-[80vh] overflow-y-auto p-4 custom-scroll">
              {Templates.map(
                (item, index) =>
                  item.code === resumeData.template && (
                    <div key={index}>{item.template}</div>
                  )
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preview;
