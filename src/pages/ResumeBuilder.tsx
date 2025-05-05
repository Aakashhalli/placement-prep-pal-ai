import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Download, Save, Check } from "lucide-react";
import { mockResumeTemplates } from "@/services/mockData";
import { generateResumePdf } from "@/utils/pdfGenerator";

type ResumeStep =
  | "template"
  | "personal"
  | "education"
  | "skills"
  // | "experience"
  | "projects"
  | "preview";

type TemplateType = "modern" | "classic" | "minimal";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  website?: string;
  location: string;
}

interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa: string;
  location: string;
  description?: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  highlights: string[];
}

interface Skill {
  category: string;
  items: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
}

interface Resume {
  template: TemplateType;
  personalInfo: PersonalInfo;
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
}

const initialResumeState: Resume = {
  template: "modern",
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    website: "",
    location: "",
  },
  education: [
    {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
      location: "",
      description: "",
    },
  ],
  skills: [
    {
      category: "Programming Languages",
      items: [],
    },
    {
      category: "Frameworks & Libraries",
      items: [],
    },
    {
      category: "Tools & Technologies",
      items: [],
    },
  ],
  experience: [],
  projects: [],
};

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState<ResumeStep>("template");
  const [resume, setResume] = useState<Resume>(initialResumeState);

  // Helper functions to manage form state
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    setResume({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value,
      },
    });
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const newEducation = [...resume.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };

    setResume({
      ...resume,
      education: newEducation,
    });
  };

  const addEducation = () => {
    setResume({
      ...resume,
      education: [
        ...resume.education,
        {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          gpa: "",
          location: "",
          description: "",
        },
      ],
    });
  };

  const addProject = () => {
    setResume({
      ...resume,
      projects: [
        ...resume.projects,
        {
          id: Date.now().toString(),
          title: "",
          description: "",
          technologies: [],
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const newProjects = [...resume.projects];
    newProjects[index] = {
      ...newProjects[index],
      [field]: value,
    };

    setResume({
      ...resume,
      projects: newProjects,
    });
  };

  const updateSkill = (categoryIndex: number, value: string) => {
    const newSkills = [...resume.skills];
    newSkills[categoryIndex] = {
      ...newSkills[categoryIndex],
      items: value.split(",").map((item) => item.trim()),
    };

    setResume({
      ...resume,
      skills: newSkills,
    });
  };

  const nextStep = () => {
    const steps: ResumeStep[] = [
      "template",
      "personal",
      "education",
      "skills",
      // "experience",
      "projects",
      "preview",
    ];

    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const previousStep = () => {
    const steps: ResumeStep[] = [
      "template",
      "personal",
      "education",
      "skills",
      // "experience",
      "projects",
      "preview",
    ];

    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const downloadResume = async () => {
    try {
      // In a real implementation, this would capture the HTML of the resume preview
      // and convert it to PDF
      const resumeHTML =
        document.querySelector(".resume-preview")?.innerHTML || "";

      await generateResumePdf(
        resumeHTML,
        `${resume.personalInfo.firstName.toLowerCase()}-${resume.personalInfo.lastName.toLowerCase()}-resume.pdf`
      );

      // Would add toast notification in real implementation
      console.log("Resume PDF downloaded successfully");
    } catch (error) {
      console.error("Failed to generate resume PDF", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <Heading level={1} className="mb-2">
            ATS-Friendly Resume Builder
          </Heading>
          <p className="text-muted-foreground">
            Create a professional resume optimized for Applicant Tracking
            Systems
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Resume Builder</CardTitle>
                <CardDescription>
                  Step-by-step guide to create your perfect resume
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {currentStep === "preview" && (
                  <Button onClick={downloadResume}>
                    <Download className="h-4 w-4 mr-2" /> Download PDF
                  </Button>
                )}
                <Button variant="outline">
                  <Save className="h-4 w-4 mr-2" /> Save Progress
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <nav className="flex space-x-2">
                {[
                  "template",
                  "personal",
                  "education",
                  "skills",
                  "experience",
                  "projects",
                  "preview",
                ].map((step) => (
                  <Button
                    key={step}
                    variant={currentStep === step ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentStep(step as ResumeStep)}
                    className="first:rounded-l-md last:rounded-r-md"
                  >
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                    {currentStep === step && <Check className="ml-2 h-4 w-4" />}
                  </Button>
                ))}
              </nav>
            </div>

            {currentStep === "template" && (
              <div>
                <Heading level={3} className="mb-4">
                  Choose a Template
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["modern", "classic", "minimal"].map((template) => (
                    <div
                      key={template}
                      className={`border rounded-lg p-4 cursor-pointer ${
                        resume.template === template
                          ? "border-highlight bg-highlight/10"
                          : "hover:bg-secondary/30"
                      }`}
                      onClick={() =>
                        setResume({
                          ...resume,
                          template: template as TemplateType,
                        })
                      }
                    >
                      <div className="aspect-w-8 aspect-h-11 mb-2 bg-secondary flex items-center justify-center">
                        {template.charAt(0).toUpperCase() + template.slice(1)}
                      </div>
                      <p className="text-center font-medium">
                        {template.charAt(0).toUpperCase() + template.slice(1)}
                      </p>
                      {resume.template === template && (
                        <div className="mt-2 flex justify-center">
                          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
                            Selected
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === "personal" && (
              <div>
                <Heading level={3} className="mb-4">
                  Personal Information
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={resume.personalInfo.firstName}
                      onChange={(e) =>
                        updatePersonalInfo("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={resume.personalInfo.lastName}
                      onChange={(e) =>
                        updatePersonalInfo("lastName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resume.personalInfo.email}
                      onChange={(e) =>
                        updatePersonalInfo("email", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resume.personalInfo.phone}
                      onChange={(e) =>
                        updatePersonalInfo("phone", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn (optional)</Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      value={resume.personalInfo.linkedin || ""}
                      onChange={(e) =>
                        updatePersonalInfo("linkedin", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub (optional)</Label>
                    <Input
                      id="github"
                      placeholder="https://github.com/username"
                      value={resume.personalInfo.github || ""}
                      onChange={(e) =>
                        updatePersonalInfo("github", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, State"
                      value={resume.personalInfo.location}
                      onChange={(e) =>
                        updatePersonalInfo("location", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Personal Website (optional)</Label>
                    <Input
                      id="website"
                      placeholder="https://example.com"
                      value={resume.personalInfo.website || ""}
                      onChange={(e) =>
                        updatePersonalInfo("website", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === "education" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Heading level={3}>Education</Heading>
                  <Button variant="outline" size="sm" onClick={addEducation}>
                    Add Education
                  </Button>
                </div>
                {resume.education.map((edu, index) => (
                  <div key={index} className="mb-6 p-4 border rounded-lg">
                    <Heading level={4} className="mb-4">
                      Education #{index + 1}
                    </Heading>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`institution-${index}`}>
                          Institution
                        </Label>
                        <Input
                          id={`institution-${index}`}
                          value={edu.institution}
                          onChange={(e) =>
                            updateEducation(
                              index,
                              "institution",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`degree-${index}`}>Degree</Label>
                        <Input
                          id={`degree-${index}`}
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(index, "degree", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`field-${index}`}>Field of Study</Label>
                        <Input
                          id={`field-${index}`}
                          value={edu.fieldOfStudy}
                          onChange={(e) =>
                            updateEducation(
                              index,
                              "fieldOfStudy",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`gpa-${index}`}>GPA</Label>
                        <Input
                          id={`gpa-${index}`}
                          value={edu.gpa}
                          onChange={(e) =>
                            updateEducation(index, "gpa", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`start-date-${index}`}>
                          Start Date
                        </Label>
                        <Input
                          id={`start-date-${index}`}
                          type="month"
                          value={edu.startDate}
                          onChange={(e) =>
                            updateEducation(index, "startDate", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`end-date-${index}`}>End Date</Label>
                        <Input
                          id={`end-date-${index}`}
                          type="month"
                          value={edu.endDate}
                          onChange={(e) =>
                            updateEducation(index, "endDate", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor={`location-${index}`}>Location</Label>
                        <Input
                          id={`location-${index}`}
                          value={edu.location}
                          onChange={(e) =>
                            updateEducation(index, "location", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor={`description-${index}`}>
                        Description (optional)
                      </Label>
                      <Textarea
                        id={`description-${index}`}
                        value={edu.description || ""}
                        onChange={(e) =>
                          updateEducation(index, "description", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentStep === "skills" && (
              <div>
                <Heading level={3} className="mb-4">
                  Skills
                </Heading>
                <p className="text-muted-foreground mb-4">
                  Enter skills separated by commas (e.g., "JavaScript, React,
                  Node.js")
                </p>
                {resume.skills.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <Label htmlFor={`skills-${index}`}>{skill.category}</Label>
                    <Textarea
                      id={`skills-${index}`}
                      placeholder={`Enter ${skill.category.toLowerCase()} skills`}
                      value={skill.items.join(", ")}
                      onChange={(e) => updateSkill(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}

            {currentStep === "projects" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Heading level={3}>Projects</Heading>
                  <Button variant="outline" size="sm" onClick={addProject}>
                    Add Project
                  </Button>
                </div>
                {resume.projects.length === 0 ? (
                  <div className="text-center py-8 border rounded-lg">
                    <p className="text-muted-foreground mb-4">
                      No projects added yet. Add some projects to showcase your
                      skills!
                    </p>
                    <Button onClick={addProject}>Add Your First Project</Button>
                  </div>
                ) : (
                  resume.projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="mb-6 p-4 border rounded-lg"
                    >
                      <Heading level={4} className="mb-4">
                        Project #{index + 1}
                      </Heading>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor={`project-title-${index}`}>
                            Project Title
                          </Label>
                          <Input
                            id={`project-title-${index}`}
                            value={project.title}
                            onChange={(e) =>
                              updateProject(index, "title", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`project-start-${index}`}>
                            Start Date
                          </Label>
                          <Input
                            id={`project-start-${index}`}
                            type="month"
                            value={project.startDate}
                            onChange={(e) =>
                              updateProject(index, "startDate", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`project-end-${index}`}>
                            End Date
                          </Label>
                          <Input
                            id={`project-end-${index}`}
                            type="month"
                            value={project.endDate}
                            onChange={(e) =>
                              updateProject(index, "endDate", e.target.value)
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor={`project-tech-${index}`}>
                            Technologies Used
                          </Label>
                          <Input
                            id={`project-tech-${index}`}
                            placeholder="React, Node.js, MongoDB, etc."
                            value={project.technologies.join(", ")}
                            onChange={(e) =>
                              updateProject(
                                index,
                                "technologies",
                                e.target.value.split(",").map((t) => t.trim())
                              )
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor={`project-link-${index}`}>
                            Project Link (optional)
                          </Label>
                          <Input
                            id={`project-link-${index}`}
                            placeholder="https://github.com/yourusername/project"
                            value={project.link || ""}
                            onChange={(e) =>
                              updateProject(index, "link", e.target.value)
                            }
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor={`project-desc-${index}`}>
                            Description
                          </Label>
                          <Textarea
                            id={`project-desc-${index}`}
                            placeholder="Describe your project, its features, and your role"
                            value={project.description}
                            onChange={(e) =>
                              updateProject(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {currentStep === "preview" && (
              <div>
                <Heading level={3} className="mb-4">
                  Resume Preview
                </Heading>
                <div className="resume-preview border rounded-lg p-6 bg-card text-card-foreground shadow">
                  <div className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold mb-1">
                      {resume.personalInfo.firstName}{" "}
                      {resume.personalInfo.lastName}
                    </h1>
                    <div className="flex flex-wrap gap-3 text-sm">
                      {resume.personalInfo.email && (
                        <span>{resume.personalInfo.email}</span>
                      )}
                      {resume.personalInfo.phone && (
                        <span>{resume.personalInfo.phone}</span>
                      )}
                      {resume.personalInfo.location && (
                        <span>{resume.personalInfo.location}</span>
                      )}
                      {resume.personalInfo.linkedin && (
                        <span className="text-highlight">
                          {resume.personalInfo.linkedin}
                        </span>
                      )}
                      {resume.personalInfo.github && (
                        <span className="text-highlight">
                          {resume.personalInfo.github}
                        </span>
                      )}
                      {resume.personalInfo.website && (
                        <span className="text-highlight">
                          {resume.personalInfo.website}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Education</h2>
                    {resume.education.map((edu, index) => (
                      <div key={index} className="mb-3">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{edu.institution}</h3>
                            <p>
                              {edu.degree} in {edu.fieldOfStudy}
                            </p>
                          </div>
                          <div className="text-right">
                            <p>
                              {edu.startDate} - {edu.endDate}
                            </p>
                            <p>{edu.location}</p>
                          </div>
                        </div>
                        {edu.gpa && (
                          <p className="text-sm mt-1">GPA: {edu.gpa}</p>
                        )}
                        {edu.description && (
                          <p className="text-sm mt-1">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {resume.skills.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">Skills</h2>
                      {resume.skills.map(
                        (skillCategory, index) =>
                          skillCategory.items.length > 0 && (
                            <div key={index} className="mb-2">
                              <h3 className="font-medium">
                                {skillCategory.category}
                              </h3>
                              <p>{skillCategory.items.join(", ")}</p>
                            </div>
                          )
                      )}
                    </div>
                  )}

                  {resume.projects.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2">Projects</h2>
                      {resume.projects.map((project, index) => (
                        <div key={project.id} className="mb-3">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{project.title}</h3>
                            <p>
                              {project.startDate} - {project.endDate}
                            </p>
                          </div>
                          <p className="text-sm text-highlight mb-1">
                            {project.technologies.join(" • ")}
                          </p>
                          <p className="text-sm">{project.description}</p>
                          {project.link && (
                            <p className="text-sm text-highlight mt-1">
                              {project.link}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={currentStep === "template"}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <Button onClick={nextStep} disabled={currentStep === "preview"}>
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;
