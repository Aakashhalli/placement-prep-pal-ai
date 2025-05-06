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
import { ArrowLeft, ArrowRight, Download, Save, Check, Trash2, Copy, Plus, FilePlus, Briefcase, GraduationCap, Code } from "lucide-react";
import { generateResumePdf } from "@/utils/pdfGenerator";
<<<<<<< HEAD

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
=======
import { toast } from "@/hooks/use-toast";
import TemplateSelector from "@/components/resume/TemplateSelector";
import ResumeSteps from "@/components/resume/ResumeSteps";
import { ResumeStep, Resume, TemplateType, Experience, Project } from "@/types/resume";
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d

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
<<<<<<< HEAD
=======
    jobTitle: "",
    bio: ""
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
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
<<<<<<< HEAD
=======
  certificates: [],
  languages: []
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
};

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState<ResumeStep>("template");
  const [resume, setResume] = useState<Resume>(initialResumeState);

<<<<<<< HEAD
  // Helper functions to manage form state
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
=======
  const notify = (message: string, type: "info" | "success" | "error" = "info") => {
    toast({
      title: type === "success" ? "Success" : type === "error" ? "Error" : "Info",
      description: message,
      variant: type === "error" ? "destructive" : "default"
    });
  };

  const updatePersonalInfo = (field: keyof Resume["personalInfo"], value: string) => {
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
    setResume({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value,
      },
    });
  };

<<<<<<< HEAD
  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
=======
  const updateEducation = (index: number, field: keyof Resume["education"][0], value: string) => {
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
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
    notify("New education entry added", "success");
  };

  const removeEducation = (index: number) => {
    if (resume.education.length <= 1) {
      notify("You must have at least one education entry", "error");
      return;
    }
    
    const newEducation = [...resume.education];
    newEducation.splice(index, 1);
    
    setResume({
      ...resume,
      education: newEducation
    });
    notify("Education entry removed", "info");
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [
        ...resume.experience,
        {
          id: Date.now().toString(),
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          location: "",
          description: "",
          highlights: []
        }
      ]
    });
    notify("New experience entry added", "success");
  };

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    const newExperience = [...resume.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    };
    
    setResume({
      ...resume,
      experience: newExperience
    });
  };

  const removeExperience = (index: number) => {
    const newExperience = [...resume.experience];
    newExperience.splice(index, 1);
    
    setResume({
      ...resume,
      experience: newExperience
    });
    notify("Experience entry removed", "info");
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
    notify("New project added", "success");
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

<<<<<<< HEAD
=======
  const removeProject = (index: number) => {
    const newProjects = [...resume.projects];
    newProjects.splice(index, 1);
    
    setResume({
      ...resume,
      projects: newProjects
    });
    notify("Project removed", "info");
  };

>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
  const updateSkill = (categoryIndex: number, value: string) => {
    const newSkills = [...resume.skills];
    newSkills[categoryIndex] = {
      ...newSkills[categoryIndex],
<<<<<<< HEAD
      items: value.split(",").map((item) => item.trim()),
=======
      items: value.split(',').map(item => item.trim()).filter(item => item !== '')
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
    };

    setResume({
      ...resume,
      skills: newSkills,
    });
  };

  const addSkillCategory = () => {
    setResume({
      ...resume,
      skills: [
        ...resume.skills,
        {
          category: "New Category",
          items: []
        }
      ]
    });
    notify("New skill category added", "success");
  };

  const updateSkillCategory = (index: number, categoryName: string) => {
    const newSkills = [...resume.skills];
    newSkills[index] = {
      ...newSkills[index],
      category: categoryName
    };
    
    setResume({
      ...resume,
      skills: newSkills
    });
  };

  const removeSkillCategory = (index: number) => {
    if (resume.skills.length <= 1) {
      notify("You must have at least one skill category", "error");
      return;
    }
    
    const newSkills = [...resume.skills];
    newSkills.splice(index, 1);
    
    setResume({
      ...resume,
      skills: newSkills
    });
    notify("Skill category removed", "info");
  };

  const nextStep = () => {
    const steps: ResumeStep[] = [
<<<<<<< HEAD
      "template",
      "personal",
      "education",
      "skills",
      // "experience",
      "projects",
      "preview",
    ];

=======
      "template", "personal", "education", "skills", "experience", "projects", "preview"
    ];
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
      if (steps[currentIndex + 1] === "preview") {
        notify("Preview your resume before downloading", "info");
      }
    }
  };

  const previousStep = () => {
    const steps: ResumeStep[] = [
<<<<<<< HEAD
      "template",
      "personal",
      "education",
      "skills",
      // "experience",
      "projects",
      "preview",
    ];

=======
      "template", "personal", "education", "skills", "experience", "projects", "preview"
    ];
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const downloadResume = async () => {
    try {
<<<<<<< HEAD
      // In a real implementation, this would capture the HTML of the resume preview
      // and convert it to PDF
      const resumeHTML =
        document.querySelector(".resume-preview")?.innerHTML || "";

=======
      const resumeHTML = document.querySelector('.resume-preview')?.innerHTML || '';
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
      await generateResumePdf(
        resumeHTML,
        `${resume.personalInfo.firstName.toLowerCase()}-${resume.personalInfo.lastName.toLowerCase()}-resume.pdf`
      );
<<<<<<< HEAD

      // Would add toast notification in real implementation
      console.log("Resume PDF downloaded successfully");
=======
      notify("Resume PDF downloaded successfully!", "success");
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
    } catch (error) {
      notify("Failed to generate resume PDF", "error");
    }
  };

  const saveProgress = () => {
    // In a real application, this would save to a database
    localStorage.setItem('savedResume', JSON.stringify(resume));
    notify("Resume progress saved successfully!", "success");
  };

  const selectTemplate = (template: TemplateType) => {
    setResume({
      ...resume,
      template
    });
    notify(`Selected ${template} template`, "success");
  };

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
<<<<<<< HEAD
          <Heading level={1} className="mb-2">
            ATS-Friendly Resume Builder
          </Heading>
          <p className="text-muted-foreground">
            Create a professional resume optimized for Applicant Tracking
            Systems
=======
          <Heading level={1} className="mb-2">ATS-Friendly Resume Builder</Heading>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create a professional resume optimized for Applicant Tracking Systems with our easy-to-use builder. Follow the steps below to craft your perfect resume.
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
          </p>
        </div>

        <Card className="border shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <CardTitle className="text-2xl font-bold">Resume Builder</CardTitle>
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
                <Button variant="outline" onClick={saveProgress}>
                  <Save className="h-4 w-4 mr-2" /> Save Progress
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
<<<<<<< HEAD
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
=======
              <ResumeSteps 
                currentStep={currentStep} 
                resume={resume} 
                onStepClick={setCurrentStep} 
              />
            </div>

            {currentStep === "template" && (
              <div className="space-y-6">
                <Heading level={3} className="mb-4 text-center">Choose a Template</Heading>
                <TemplateSelector 
                  selectedTemplate={resume.template} 
                  onSelectTemplate={selectTemplate} 
                />
                <div className="mt-4 text-center text-muted-foreground text-xs">
                  * All templates are optimized for ATS scanning while maintaining professional design
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                </div>
              </div>
            )}

            {currentStep === "personal" && (
<<<<<<< HEAD
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
=======
              <div className="space-y-6">
                <Heading level={3} className="mb-4">Personal Information</Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      value={resume.personalInfo.firstName}
                      onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      value={resume.personalInfo.lastName}
                      onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobTitle">Professional Title</Label>
                    <Input 
                      id="jobTitle" 
                      value={resume.personalInfo.jobTitle || ''}
                      onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={resume.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input 
                      id="phone" 
                      value={resume.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input 
                      id="location" 
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                      placeholder="City, State"
                      value={resume.personalInfo.location}
                      onChange={(e) =>
                        updatePersonalInfo("location", e.target.value)
                      }
                    />
                  </div>
                  <div>
<<<<<<< HEAD
                    <Label htmlFor="website">Personal Website (optional)</Label>
                    <Input
                      id="website"
=======
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input 
                      id="linkedin" 
                      placeholder="https://linkedin.com/in/username"
                      value={resume.personalInfo.linkedin || ''}
                      onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    <Input 
                      id="github" 
                      placeholder="https://github.com/username"
                      value={resume.personalInfo.github || ''}
                      onChange={(e) => updatePersonalInfo('github', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Personal Website</Label>
                    <Input 
                      id="website" 
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                      placeholder="https://example.com"
                      value={resume.personalInfo.website || ""}
                      onChange={(e) =>
                        updatePersonalInfo("website", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">Professional Summary</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="A brief summary of your professional background and goals..."
                    value={resume.personalInfo.bio || ''}
                    onChange={(e) => updatePersonalInfo('bio', e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}

            {currentStep === "education" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <Heading level={3}>Education</Heading>
                  <Button variant="outline" size="sm" onClick={addEducation}>
                    <Plus className="h-4 w-4 mr-2" /> Add Education
                  </Button>
                </div>
                {resume.education.map((edu, index) => (
<<<<<<< HEAD
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
=======
                  <div key={index} className="mb-6 p-4 border rounded-lg bg-card/50">
                    <div className="flex justify-between items-center mb-4">
                      <Heading level={4} className="flex items-center">
                        <GraduationCap className="h-5 w-5 mr-2 text-muted-foreground" /> 
                        Education #{index + 1}
                      </Heading>
                      <Button variant="ghost" size="sm" onClick={() => removeEducation(index)} className="h-8 w-8 p-0" disabled={resume.education.length <= 1}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`institution-${index}`}>Institution *</Label>
                        <Input 
                          id={`institution-${index}`} 
                          value={edu.institution}
                          onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                          placeholder="University Name"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`degree-${index}`}>Degree *</Label>
                        <Input 
                          id={`degree-${index}`} 
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`field-${index}`}>Field of Study *</Label>
                        <Input 
                          id={`field-${index}`} 
                          value={edu.fieldOfStudy}
                          onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                          placeholder="Computer Science"
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                        />
                      </div>
                      <div>
                        <Label htmlFor={`gpa-${index}`}>GPA</Label>
                        <Input
                          id={`gpa-${index}`}
                          value={edu.gpa}
<<<<<<< HEAD
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
=======
                          onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                          placeholder="3.8/4.0"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`start-date-${index}`}>Start Date *</Label>
                        <Input 
                          id={`start-date-${index}`} 
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                          type="month"
                          value={edu.startDate}
                          onChange={(e) =>
                            updateEducation(index, "startDate", e.target.value)
                          }
                        />
                      </div>
                      <div>
<<<<<<< HEAD
                        <Label htmlFor={`end-date-${index}`}>End Date</Label>
                        <Input
                          id={`end-date-${index}`}
=======
                        <Label htmlFor={`end-date-${index}`}>End Date (or Expected) *</Label>
                        <Input 
                          id={`end-date-${index}`} 
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                          type="month"
                          value={edu.endDate}
                          onChange={(e) =>
                            updateEducation(index, "endDate", e.target.value)
                          }
                        />
                      </div>
                      <div>
<<<<<<< HEAD
                        <Label htmlFor={`location-${index}`}>Location</Label>
                        <Input
                          id={`location-${index}`}
                          value={edu.location}
                          onChange={(e) =>
                            updateEducation(index, "location", e.target.value)
                          }
=======
                        <Label htmlFor={`location-${index}`}>Location *</Label>
                        <Input 
                          id={`location-${index}`} 
                          value={edu.location}
                          onChange={(e) => updateEducation(index, 'location', e.target.value)}
                          placeholder="City, State, Country"
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                        />
                      </div>
                    </div>
                    <div className="mt-4">
<<<<<<< HEAD
                      <Label htmlFor={`description-${index}`}>
                        Description (optional)
                      </Label>
                      <Textarea
                        id={`description-${index}`}
                        value={edu.description || ""}
                        onChange={(e) =>
                          updateEducation(index, "description", e.target.value)
                        }
=======
                      <Label htmlFor={`description-${index}`}>Description (optional)</Label>
                      <Textarea 
                        id={`description-${index}`} 
                        value={edu.description || ''}
                        onChange={(e) => updateEducation(index, 'description', e.target.value)}
                        placeholder="Relevant coursework, achievements, or honors"
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {currentStep === "skills" && (
<<<<<<< HEAD
              <div>
                <Heading level={3} className="mb-4">
                  Skills
                </Heading>
=======
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <Heading level={3}>Skills</Heading>
                  <Button variant="outline" size="sm" onClick={addSkillCategory}>
                    <Plus className="h-4 w-4 mr-2" /> Add Category
                  </Button>
                </div>
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                <p className="text-muted-foreground mb-4">
                  Enter skills separated by commas (e.g., "JavaScript, React,
                  Node.js")
                </p>
                {resume.skills.map((skill, index) => (
<<<<<<< HEAD
                  <div key={index} className="mb-4">
                    <Label htmlFor={`skills-${index}`}>{skill.category}</Label>
                    <Textarea
                      id={`skills-${index}`}
                      placeholder={`Enter ${skill.category.toLowerCase()} skills`}
                      value={skill.items.join(", ")}
                      onChange={(e) => updateSkill(index, e.target.value)}
                    />
=======
                  <div key={index} className="mb-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-1 mr-4">
                        <Label htmlFor={`skill-category-${index}`}>Category</Label>
                        <Input 
                          id={`skill-category-${index}`} 
                          value={skill.category}
                          onChange={(e) => updateSkillCategory(index, e.target.value)}
                          placeholder="Category Name"
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeSkillCategory(index)} 
                        className="h-8 w-8 p-0 mt-6"
                        disabled={resume.skills.length <= 1}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div>
                      <Label htmlFor={`skills-${index}`}>{skill.category} Skills</Label>
                      <Textarea 
                        id={`skills-${index}`} 
                        placeholder={`Enter ${skill.category.toLowerCase()} skills, separated by commas`}
                        value={skill.items.join(', ')}
                        onChange={(e) => updateSkill(index, e.target.value)}
                      />
                      {skill.items.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {skill.items.map((item, idx) => (
                            <Badge key={idx} variant="secondary" className="mr-1 mb-1">{item}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                  </div>
                ))}
              </div>
            )}

            {currentStep === "experience" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <Heading level={3}>Work Experience</Heading>
                  <Button variant="outline" size="sm" onClick={addExperience}>
                    <Plus className="h-4 w-4 mr-2" /> Add Experience
                  </Button>
                </div>
                
                {resume.experience.length === 0 ? (
                  <div className="text-center py-8 border rounded-lg">
                    <Briefcase className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-4" />
                    <p className="text-muted-foreground mb-4">
                      No work experience added yet. Add your professional experience to showcase your skills!
                    </p>
                    <Button onClick={addExperience}>Add Your First Experience</Button>
                  </div>
                ) : (
                  resume.experience.map((exp, index) => (
                    <div key={exp.id} className="mb-6 p-4 border rounded-lg bg-card/50">
                      <div className="flex justify-between items-center mb-4">
                        <Heading level={4} className="flex items-center">
                          <Briefcase className="h-5 w-5 mr-2 text-muted-foreground" />
                          Experience #{index + 1}
                        </Heading>
                        <Button variant="ghost" size="sm" onClick={() => removeExperience(index)} className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`company-${index}`}>Company *</Label>
                          <Input 
                            id={`company-${index}`} 
                            value={exp.company}
                            onChange={(e) => updateExperience(index, 'company', e.target.value)}
                            placeholder="Company Name"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`position-${index}`}>Position *</Label>
                          <Input 
                            id={`position-${index}`} 
                            value={exp.position}
                            onChange={(e) => updateExperience(index, 'position', e.target.value)}
                            placeholder="Software Engineer"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`exp-start-${index}`}>Start Date *</Label>
                          <Input 
                            id={`exp-start-${index}`} 
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`exp-end-${index}`}>End Date *</Label>
                          <Input 
                            id={`exp-end-${index}`} 
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                            placeholder="Present (for current positions)"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`exp-location-${index}`}>Location *</Label>
                          <Input 
                            id={`exp-location-${index}`} 
                            value={exp.location}
                            onChange={(e) => updateExperience(index, 'location', e.target.value)}
                            placeholder="City, State, Country"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Label htmlFor={`exp-description-${index}`}>Description *</Label>
                        <Textarea 
                          id={`exp-description-${index}`} 
                          value={exp.description}
                          onChange={(e) => updateExperience(index, 'description', e.target.value)}
                          placeholder="Describe your responsibilities and achievements in this role"
                          className="min-h-[100px]"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Pro tip: Use bullet points and action verbs to highlight your achievements
                        </p>
                      </div>
                      
                      <div className="mt-4">
                        <Label htmlFor={`highlights-${index}`}>Key Achievements (separated by new lines)</Label>
                        <Textarea 
                          id={`highlights-${index}`} 
                          value={exp.highlights.join('\n')}
                          onChange={(e) => updateExperience(index, 'highlights', e.target.value.split('\n').filter(h => h.trim() !== ''))}
                          placeholder="• Increased site performance by 40%
• Led a team of 5 developers
• Implemented new feature that increased conversions by 25%"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {currentStep === "projects" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <Heading level={3}>Projects</Heading>
                  <Button variant="outline" size="sm" onClick={addProject}>
                    <Plus className="h-4 w-4 mr-2" /> Add Project
                  </Button>
                </div>
                
                {resume.projects.length === 0 ? (
                  <div className="text-center py-8 border rounded-lg">
                    <Code className="mx-auto h-12 w-12 text-muted-foreground opacity-30 mb-4" />
                    <p className="text-muted-foreground mb-4">
                      No projects added yet. Add some projects to showcase your
                      skills!
                    </p>
                    <Button onClick={addProject}>Add Your First Project</Button>
                  </div>
                ) : (
                  resume.projects.map((project, index) => (
<<<<<<< HEAD
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
=======
                    <div key={project.id} className="mb-6 p-4 border rounded-lg bg-card/50">
                      <div className="flex justify-between items-center mb-4">
                        <Heading level={4} className="flex items-center">
                          <FilePlus className="h-5 w-5 mr-2 text-muted-foreground" />
                          Project #{index + 1}
                        </Heading>
                        <Button variant="ghost" size="sm" onClick={() => removeProject(index)} className="h-8 w-8 p-0">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor={`project-title-${index}`}>Project Title *</Label>
                          <Input 
                            id={`project-title-${index}`} 
                            value={project.title}
                            onChange={(e) => updateProject(index, 'title', e.target.value)}
                            placeholder="E-commerce Platform"
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
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
<<<<<<< HEAD
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
=======
                          <Label htmlFor={`project-tech-${index}`}>Technologies Used *</Label>
                          <Input 
                            id={`project-tech-${index}`} 
                            placeholder="React, Node.js, MongoDB, etc."
                            value={project.technologies.join(', ')}
                            onChange={(e) => updateProject(index, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(t => t !== ''))}
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                          />
                          {project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.technologies.map((tech, idx) => (
                                <Badge key={idx} variant="outline" className="mr-1 mb-1">{tech}</Badge>
                              ))}
                            </div>
                          )}
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
<<<<<<< HEAD
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
=======
                          <Label htmlFor={`project-desc-${index}`}>Description *</Label>
                          <Textarea 
                            id={`project-desc-${index}`} 
                            placeholder="Describe your project, its features, and your role"
                            value={project.description}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            className="min-h-[100px]"
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {currentStep === "preview" && (
<<<<<<< HEAD
              <div>
                <Heading level={3} className="mb-4">
                  Resume Preview
                </Heading>
                <div className="resume-preview border rounded-lg p-6 bg-card text-card-foreground shadow">
=======
              <div className="space-y-6">
                <Heading level={3} className="mb-4">Resume Preview</Heading>
                <div className="flex justify-center mb-6">
                  <div className="inline-flex rounded-md shadow-sm">
                    <Button variant="outline" onClick={downloadResume} className="rounded-r-none">
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                    <Button variant="outline" onClick={saveProgress} className="rounded-l-none border-l-0">
                      <Save className="mr-2 h-4 w-4" /> Save Progress
                    </Button>
                  </div>
                </div>
                <div className="resume-preview border rounded-lg p-6 bg-white text-black shadow-sm max-w-4xl mx-auto">
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                  <div className="mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold mb-1">
                      {resume.personalInfo.firstName}{" "}
                      {resume.personalInfo.lastName}
                    </h1>
                    {resume.personalInfo.jobTitle && (
                      <p className="text-lg text-gray-600 mb-2">{resume.personalInfo.jobTitle}</p>
                    )}
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
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm mt-1">
                      {resume.personalInfo.linkedin && (
<<<<<<< HEAD
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
=======
                        <span className="text-blue-600">{resume.personalInfo.linkedin}</span>
                      )}
                      {resume.personalInfo.github && (
                        <span className="text-blue-600">{resume.personalInfo.github}</span>
                      )}
                      {resume.personalInfo.website && (
                        <span className="text-blue-600">{resume.personalInfo.website}</span>
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                      )}
                    </div>
                    {resume.personalInfo.bio && (
                      <p className="mt-3 text-sm">{resume.personalInfo.bio}</p>
                    )}
                  </div>

<<<<<<< HEAD
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
=======
                  {resume.education.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2 border-b pb-1">Education</h2>
                      {resume.education.map((edu, index) => (
                        <div key={index} className="mb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{edu.institution}</h3>
                              <p>{edu.degree} in {edu.fieldOfStudy}</p>
                            </div>
                            <div className="text-right">
                              <p>{edu.startDate} - {edu.endDate}</p>
                              <p>{edu.location}</p>
                            </div>
                          </div>
                          {edu.gpa && <p className="text-sm mt-1">GPA: {edu.gpa}</p>}
                          {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {resume.experience.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2 border-b pb-1">Work Experience</h2>
                      {resume.experience.map((exp, index) => (
                        <div key={exp.id} className="mb-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{exp.position}</h3>
                              <p className="text-gray-700">{exp.company}</p>
                            </div>
                            <div className="text-right">
                              <p>{exp.startDate} - {exp.endDate}</p>
                              <p>{exp.location}</p>
                            </div>
                          </div>
                          <p className="text-sm mt-1">{exp.description}</p>
                          {exp.highlights.length > 0 && (
                            <ul className="list-disc list-inside text-sm mt-1 ml-1">
                              {exp.highlights.map((highlight, idx) => (
                                <li key={idx}>{highlight}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {resume.skills.some(sk => sk.items.length > 0) && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2 border-b pb-1">Skills</h2>
                      {resume.skills.map((skillCategory, index) => (
                        skillCategory.items.length > 0 && (
                          <div key={index} className="mb-2">
                            <h3 className="font-medium">{skillCategory.category}</h3>
                            <p className="text-sm">{skillCategory.items.join(', ')}</p>
                          </div>
                        )
                      ))}
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
                    </div>
                  )}

                  {resume.projects.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold mb-2 border-b pb-1">Projects</h2>
                      {resume.projects.map((project, index) => (
                        <div key={project.id} className="mb-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{project.title}</h3>
<<<<<<< HEAD
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
=======
                            {(project.startDate || project.endDate) && (
                              <p>{project.startDate} - {project.endDate}</p>
                            )}
                          </div>
                          <p className="text-sm text-blue-600 mb-1">
                            {project.technologies.join(' • ')}
                          </p>
                          <p className="text-sm">{project.description}</p>
                          {project.link && (
                            <p className="text-sm text-blue-600 mt-1">{project.link}</p>
>>>>>>> 686a666bda35eabdc981c0519dd0059b9302622d
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
