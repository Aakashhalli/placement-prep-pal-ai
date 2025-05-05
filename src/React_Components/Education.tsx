import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SaveEducationInfo } from "@/Slices/ResumeSlice";
import toast from "react-hot-toast";
import Preview from "@/Utilities/Preview";
import { Loader2 } from "lucide-react";

function Education() {
  const loadingState = useSelector((state) => state.Resume.loading);
  const error = useSelector((state) => state.Resume.error);
  const resumeDetails = useSelector((state) => state.Resume.resume);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm();

  const submit = async (data) => {
    try {
      if (!data.degreeName) {
        setError("degreeName", {
          message: "Degree is required*",
        });
        return;
      }
      if (data) {
        await dispatch(
          SaveEducationInfo({ resumeId: resumeDetails._id, data })
        ).unwrap();
        toast.success("Education details saved!");
        navigate("/create/professional-experience");
      }
    } catch (err) {
      toast.error(error);
      console.log(err);
    }
  };

  useEffect(() => {
    setValue("name", resumeDetails.college?.name);
    setValue("degreeName", resumeDetails.college?.degree?.degreeName);
    setValue("field", resumeDetails.college?.degree?.field);
    setValue("location", resumeDetails.college?.location);
    setValue("month", resumeDetails.college?.graduation?.month);
    setValue("year", resumeDetails.college?.graduation?.year);
  }, [resumeDetails, setValue]);

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(submit)}>
        <div className="max-w-4xl mx-auto p-6 bg-black rounded-lg shadow-md ">
          <h2 className="text-2xl font-bold">Tell us about your education</h2>
          <p className="text-gray-500 mb-4">
            Enter your education experience so far, even if you are a current
            student or did not graduate.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                School Name *
              </label>
              <Input
                placeholder="e.g. Indian institute of Technology Bombay"
                {...register("name", {
                  required: "School name is required.",
                })}
              />
              {errors.name && (
                <div className="text-red-600">{errors.name.message}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                School Location
              </label>
              <Input
                placeholder="e.g. New Delhi, India"
                {...register("location")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Degree *
              </label>
              <Select onValueChange={(value) => setValue("degreeName", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                  <SelectItem value="Master's">Master's</SelectItem>
                  <SelectItem value="PhD">PhD</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Law">Law</SelectItem>
                </SelectContent>
              </Select>
              {errors.degreeName && (
                <div className="text-red-600">{errors.degreeName.message}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Field of Study
              </label>
              <Input
                placeholder="e.g. Information Technology"
                {...register("field")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Graduation Date (or Expected Graduation Date)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select onValueChange={(value) => setValue("month", value)}>
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

                <Select onValueChange={(value) => setValue("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {["2025", "2026", "2027", "2028", "2029", "2030"].map(
                      (year, index) => (
                        <SelectItem key={index} value={year}>
                          {year}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Card className="mt-6 p-4">
            <p className="text-gray-600 font-medium">Pro Tip</p>
            <p className="text-sm text-gray-500">
              Highlight relevant coursework and certifications to showcase your
              expertise. Even if you lack work experience, mentioning strong
              academic achievements or specialized training can make a
              difference.
            </p>
          </Card>

          {/* Buttons */}
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
                Next: Professional Experience
              </Button>
            )}
          </div>
        </div>
      </form>
      {isOpen && <Preview Open={isOpen} onClose={() => setisOpen(false)} />}
    </div>
  );
}

export default Education;
