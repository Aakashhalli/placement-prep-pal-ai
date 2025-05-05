import React, { useEffect } from "react";
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
} from "./ResumeTemplates/Templates";
import { useDispatch, useSelector } from "react-redux";
import { GetResumeById } from "../Slices/ResumeSlice";
import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAppSelector } from "../Store/hook";

function LivePreview() {
  const dispatch = useDispatch();
  const resumeData = useAppSelector((state) => state.Resume.resume);

  useEffect(() => {
    const FetchResume = async () => {
      if (resumeData) {
        await dispatch(GetResumeById(resumeData._id)).unwrap();
      }
    };
    FetchResume();
  }, [dispatch, resumeData._id]);

  const Templates = [
    {
      template: <TemplateOne data={resumeData} />,
      code: "101",
    },
    {
      template: <TemplateTwo data={resumeData} />,
      code: "102",
    },
    {
      template: <TemplateThree data={resumeData} />,
      code: "103",
    },
    {
      template: <TemplateFour data={resumeData} />,
      code: "104",
    },
    {
      template: <TemplateFive data={resumeData} />,
      code: "105",
    },
    {
      template: <TemplateSix data={resumeData} />,
      code: "106",
    },
    {
      template: <TemplateSeven data={resumeData} />,
      code: "107",
    },
    {
      template: <TemplateEight data={resumeData} />,
      code: "108",
    },
    {
      template: <TemplateNine data={resumeData} />,
      code: "109",
    },
    {
      template: <TemplateTen data={resumeData} />,
      code: "110",
    },
  ];

  if (Object.keys(resumeData).length === 0) {
    return (
      <Button disabled>
        <Loader2 className="animate-spin" />
        Please wait
      </Button>
    );
  }

  return (
    <div className="w-full flex">
      {Templates.map((item, index) => {
        if (item.code === resumeData.template) {
          return (
            <div key={index} className="w-full min-h-screen">
              {item.template}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default LivePreview;
