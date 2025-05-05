import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import { SaveProjectDetails } from "../Slices/ResumeSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resumeData = useSelector((state) => state.Resume.resume);
  const error = useSelector((state) => state.Resume.error);
  const loadingState = useSelector((state) => state.Resume.loading);
  const [projects, setProjects] = useState([
    { title: "", description: "", link: "" },
  ]);

  const handleChange = (index, field, value) => {
    const newProjects = [...projects];
    newProjects[index][field] = value;
    setProjects(newProjects);
  };

  const addProject = () => {
    setProjects([...projects, { title: "", description: "", link: "" }]);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      if (projects.length !== 0) {
        await dispatch(
          SaveProjectDetails({ resumeId: resumeData._id, data: projects })
        ).unwrap();
        toast.success("Projects saved!");
        navigate("/create/summary");
      }
    } catch (err) {
      toast.error(error);
      console.log(err);
    }
  };

  return (
    <div className="w-full flex justify-center px-4 bg-black rounded-lg">
      <div className="w-full max-w-4xl my-4 space-y-6 mt-10">
        <h2 className="text-3xl font-bold text-white">Add Projects</h2>
        {projects.map((project, index) => (
          <Card key={index} className="p-4 relative">
            <CardHeader className="font-semibold text-gray-700">
              Project {index + 1}
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
              />
              <Input
                placeholder="Project Description"
                value={project.description}
                onChange={(e) =>
                  handleChange(index, "description", e.target.value)
                }
              />
              <Input
                placeholder="Project Link"
                value={project.link}
                onChange={(e) => handleChange(index, "link", e.target.value)}
              />
              {projects.length > 1 && (
                <Button
                  variant="destructive"
                  className="absolute top-2 right-2 rounded-full"
                  onClick={() => removeProject(index)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Button
              onClick={addProject}
              variant="secondary"
              className="flex items-center rounded-md"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Project
            </Button>
            {loadingState ? (
              <Button disabled className="rounded-md">
                Saving...
              </Button>
            ) : (
              <Button className="rounded-md" onClick={handleSave}>
                Save Projects
              </Button>
            )}
          </div>
          <Button
            className="rounded-md"
            onClick={() => navigate("/create/summary")}
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProjects;
