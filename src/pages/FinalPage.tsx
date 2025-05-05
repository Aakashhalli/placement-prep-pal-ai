import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { GetResumeById } from "../Slices/ResumeSlice.js";
import { Loader2, DownloadIcon, FileEditIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function FinalPage() {
  const dispatch = useDispatch();
  const resumeData = useSelector((state) => state.Resume.resume);
  const pdfRef = useRef(null);
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      if (resumeData && resumeData._id) {
        await dispatch(GetResumeById(resumeData._id)).unwrap();
      }
    };
    fetchResume();
  }, [dispatch, resumeData?._id]);

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

  if (!resumeData || Object.keys(resumeData).length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212] text-[#E0E0E0]">
        <Button
          disabled
          className="flex items-center gap-2 bg-[#1E1E1E] text-[#E0E0E0]"
        >
          <Loader2 className="animate-spin" />
          Please wait...
        </Button>
      </div>
    );
  }

  const generatePDF = async () => {
    if (!pdfRef.current) return;

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(pdfRef.current, { scale: 5 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      pdf.save("resume.pdf");
      toast.success("Resume downloaded!");
    } catch (err) {
      toast.error("Failed to generate PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-black rounded-lg ">
      {/* Top Button Row */}
      <div className="flex flex-row justify-end gap-4 p-4 bg-black rounded-t-lg ">
        <Button
          onClick={generatePDF}
          disabled={isDownloading}
          className="flex items-center justify-center bg-[#007BFF] hover:bg-[#006AE6] text-white"
        >
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <DownloadIcon className="mr-2" />
              Download PDF
            </>
          )}
        </Button>
        <Button
          onClick={() => navigate("/legacy/templates")}
          className="flex items-center justify-center bg-[#1E1E1E] text-[#E0E0E0] hover:bg-[#2A2A2A]"
        >
          <FileEditIcon className="mr-2" />
          Change Template
        </Button>
      </div>

      {/* Resume Preview Area */}
      <div className="flex-1 p-4 overflow-auto" ref={pdfRef}>
        {Templates.map((item, index) => {
          if (item.code === resumeData.template) {
            return <div key={index}>{item.template}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default FinalPage;
