import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { SaveExperienceDetails } from "../Slices/ResumeSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Preview from "../Utilities/Preview";

function Experience() {
  const loadingState = useSelector((state) => state.Resume.loading);
  const error = useSelector((state) => state.Resume.error);
  const resumeData = useSelector((state) => state.Resume.resume);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();
  const dispatch = useDispatch();
  const [isOpen, setisOpen] = useState(false);

  const submit = async (data) => {
    try {
      if (data) {
        await dispatch(
          SaveExperienceDetails({ resumeId: resumeData._id, data })
        ).unwrap();
        toast.success("Experience details saved!");
        navigate("/create/skills");
      }
    } catch (err) {
      toast.error(error);
      console.log(err);
    }
  };

  useEffect(() => {
    setValue("title", resumeData.previousJob?.title);
    setValue("companyName", resumeData.previousJob?.companyName);
    setValue("location", resumeData.previousJob?.location);
    setValue("remote", resumeData.previousJob?.remote);
    setValue("currentlyWorking", resumeData.previousJob?.currentlyWorking);
  }, [resumeData, setValue]);

  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">
        Tell us about your most recent job
      </h2>
      <p className="text-gray-600 mb-6">We'll start there and work backward.</p>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-medium">Job / Post Title *</label>
          <Input
            placeholder="e.g. Retail Sales Associate"
            {...register("title", {
              required: "Job title is required.",
            })}
          />
          {errors.title && (
            <div className="text-red-600">{errors.title.message}</div>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Company / Workplace Name
          </label>
          <Input placeholder="e.g. H&M" {...register("companyName")} />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Location</label>
          <Input
            placeholder="e.g. New Delhi, India"
            {...register("location")}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remote"
            onCheckedChange={(value) => setValue("remote", value)}
          />
          <label htmlFor="remote" className="text-sm">
            Remote
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
            <div className="space-y-1 flex-1">
              <label className="text-sm font-medium">Start Date</label>
              <Select onValueChange={(value) => setValue("startMonth", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
                    <SelectItem key={index} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1 flex-1">
              <label className="text-sm font-medium">Year</label>
              <Select onValueChange={(value) => setValue("startYear", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => (
                    <SelectItem key={i} value={`${2025 - i}`}>
                      {2025 - i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full">
            <div className="space-y-1 flex-1">
              <label className="text-sm font-medium">End Date</label>
              <Select onValueChange={(value) => setValue("endMonth", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
                    <SelectItem key={index} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1 flex-1">
              <label className="text-sm font-medium">Year</label>
              <Select onValueChange={(value) => setValue("endYear", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 50 }, (_, i) => (
                    <SelectItem key={i} value={`${2025 - i}`}>
                      {2025 - i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="currently-working"
            onCheckedChange={(value) => setValue("currentlyWorking", value)}
          />
          <label htmlFor="currently-working" className="text-sm">
            I currently work here
          </label>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
          <Button
            variant=""
            className="rounded-md"
            onClick={(e) => {
              e.preventDefault();
              setisOpen(true);
            }}
          >
            Preview
          </Button>
          {loadingState ? (
            <Button
              disabled
              className="rounded-md bg-[#007BFF] hover:bg-[#2e93ff] text-[#E0E0E0] flex items-center gap-2"
            >
              <Loader2 className="animate-spin" />
              Saving...
            </Button>
          ) : (
            <Button
              type="submit"
              className="rounded-md bg-[#007BFF] hover:bg-[#2e93ff] text-[#E0E0E0]"
            >
              Next: Skills
            </Button>
          )}
        </div>
      </form>
      {isOpen && <Preview Open={isOpen} onClose={() => setisOpen(false)} />}
    </div>
  );
}

export default Experience;
