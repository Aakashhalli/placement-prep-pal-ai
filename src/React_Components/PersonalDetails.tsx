import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { SavePersonalDetails } from "@/Slices/ResumeSlice";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Preview from "@/Utilities/Preview";

const resumeTemplates = [
  {
    title: "Contemporary",
    image:
      "https://res.cloudinary.com/sanjay100/image/upload/f_auto,q_auto/v1/Resume%20Templates/dugkptcrlaweo0n1urda",
    code: "101",
  },
  {
    title: "Current",
    image:
      "https://res.cloudinary.com/sanjay100/image/upload/f_auto,q_auto/v1/Resume%20Templates/ctb4amkoauqibexb2dka",
    code: "102",
  },
  {
    title: "Innovative",
    image:
      "https://res.cloudinary.com/sanjay100/image/upload/f_auto,q_auto/v1/Resume%20Templates/asa1zghma67j3dd1tanv",
    code: "103",
  },
  {
    title: "Basic",
    image:
      "https://res.cloudinary.com/sanjay100/image/upload/f_auto,q_auto/v1/Resume%20Templates/wrkmaio2ty1rhknxokwi",
    code: "104",
  },
  {
    title: "Polished",
    image:
      "https://res.cloudinary.com/sanjay100/image/upload/f_auto,q_auto/v1/Resume%20Templates/xksus56hwkuxbtvbzd8g",
    code: "105",
  },
  {
    title: "Polished",
    image:
      "https://res.cloudinary.com/sanjay100/image/upload/f_auto,q_auto/v1/Resume%20Templates/qhzrfdadelagrerlzipx",
    code: "106",
  },
  {
    title: "Polished",
    image:
      "https://res.cloudinary.com/sanjay100/image/upload/f_auto,q_auto/v1/Resume%20Templates/qvfqfxgttsyiw9qw7a6p",
    code: "107",
  },
  {
    title: "Polished",
    image:
      "https://res.cloudinary.com/sanjay100/image/upload/f_auto,q_auto/v1/Resume%20Templates/qbuofez5medashgpvdsa",
    code: "108",
  },
  {
    title: "Polished",
    image:
      "https://res.cloudinary.com/sanjay100/image/upload/f_auto,q_auto/v1/Resume%20Templates/s3k6okl2tolpwmst69cp",
    code: "109",
  },
  {
    title: "Polished",
    image:
      "https://res.cloudinary.com/sanjay100/image/upload/f_auto,q_auto/v1/Resume%20Templates/ub1ul5pkgwsbts0yjolz",
    code: "110",
  },
];

function PersonalDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const loadingState = useSelector((state) => state.Resume.loading);
  const error = useSelector((state) => state.Resume.error);
  const resumeDetails = useSelector((state) => state.Resume.resume);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setisOpen] = useState(false);

  const submit = async (data) => {
    try {
      if (data) {
        await dispatch(
          SavePersonalDetails({ resumeId: resumeDetails._id, data: data })
        ).unwrap();
        toast.success("Personal details saved!");
        navigate("/create/education");
      }
    } catch (err) {
      toast.error(error);
      console.log(err);
    }
  };

  useEffect(() => {
    setValue("firstName", resumeDetails.firstName);
    setValue("lastName", resumeDetails.lastName);
    setValue("email", resumeDetails.email);
    setValue("pinCode", resumeDetails.address.pinCode);
    setValue("city", resumeDetails.address.city);
    setValue("country", resumeDetails.address.country);
    setValue("phoneNumber", resumeDetails.phoneNumber);
  }, [resumeDetails, setValue]);

  return (
    <div>
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-10 bg-black rounded-lg">
        <form onSubmit={handleSubmit(submit)} className="w-full">
          <div>
            <h1 className="text-2xl font-bold">
              What's the best way for employers to contact you?
            </h1>
            <p className="text-gray-500">
              We suggest including an email and phone number.
            </p>
            <p className="text-gray-500">Fields marked with * are required.</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {[
                {
                  label: "First Name *",
                  name: "firstName",
                  required: "First name is required.",
                  type: "text",
                },
                {
                  label: "Last Name",
                  name: "lastName",
                  type: "text",
                },
                {
                  label: "City *",
                  name: "city",
                  required: "City is required.",
                  type: "text",
                },
                {
                  label: "Country *",
                  name: "country",
                  required: "Country is required.",
                  type: "text",
                },
                {
                  label: "Phone",
                  name: "phoneNumber",
                  type: "text",
                },
                {
                  label: "Email *",
                  name: "email",
                  required: "Email is required.",
                  type: "email",
                },
                {
                  label: "Pin Code *",
                  name: "pinCode",
                  required: "Pin code is required.",
                  type: "text",
                },
              ].map(({ label, name, required, type }, index) => (
                <div key={index}>
                  <Label>{label}</Label>
                  <Input
                    type={type}
                    placeholder={label.split("*")[0]}
                    {...register(name, { required })}
                  />
                  {errors[name] && (
                    <div className="text-red-600">{errors[name]?.message}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center max-w-3xl gap-4">
              <Button
                className="rounded-md"
                type="button"
                onClick={() => setisOpen(true)}
              >
                Preview
              </Button>
              {loadingState ? (
                <Button
                  disabled
                  className="rounded-md bg-[#007BFF] hover:bg-[#2e93ff] text-[#E0E0E0] px-6 py-2 flex items-center gap-2 transition duration-200"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="rounded-md bg-[#007BFF] hover:bg-[#2e93ff] text-[#E0E0E0] px-6 py-2 transition duration-200"
                >
                  Next: Education
                </Button>
              )}
            </div>
          </div>
        </form>

        <Card className="w-full">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">Preview</h2>
            {resumeTemplates.map((template, index) => {
              return (
                template.code === resumeDetails.template && (
                  <Card
                    key={index}
                    className="relative group overflow-hidden rounded-lg shadow-lg mt-4"
                  >
                    <img
                      src={template.image}
                      alt={template.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                      <Button
                        type="button"
                        className="bg-white text-black font-semibold"
                        onClick={() => setisOpen(true)}
                      >
                        Open Preview
                      </Button>
                    </div>
                  </Card>
                )
              );
            })}
          </CardContent>
        </Card>
      </main>
      {isOpen && <Preview Open={isOpen} onClose={() => setisOpen(false)} />}
    </div>
  );
}

export default PersonalDetails;
