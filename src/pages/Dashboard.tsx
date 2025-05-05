import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { BookCheck, FileText, History } from "lucide-react";

interface Note {
  id: string;
  title: string;
  date: string;
}

interface Resume {
  id: string;
  title: string;
  date: string;
}

const Dashboard = () => {
  const [recentNotes, setRecentNotes] = useState<Note[]>([]);
  const [recentResumes, setRecentResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const fetchRecentNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes/recent");
        const data = await response.json();
        setRecentNotes(data); // should be array
      } catch (error) {
        // console.error("Failed to fetch recent notes:", error);
      }
    };

    const fetchRecentResumes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/resumes/recent"
        );
        const data = await response.json();
        setRecentResumes(data); // should be array
      } catch (error) {
        // console.error("Failed to fetch recent resumes:", error);
      }
    };

    fetchRecentNotes();
    fetchRecentResumes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Heading level={1} className="mb-2">
          Dashboard
        </Heading>
        <p className="text-muted-foreground">
          Welcome back! Continue your placement preparation journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="YouTube Notes"
          description="Generate and manage your notes"
          icon={<BookCheck className="h-6 w-6 text-highlight" />}
          footer={
            <Link to="/youtube-notes" className="w-full">
              <Button className="w-full">Create New Notes</Button>
            </Link>
          }
        >
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Recent notes:</p>
            {recentNotes.length > 0 ? (
              recentNotes.map((note) => (
                <div key={note.id} className="p-3 bg-secondary/20 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{note.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(note.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No recent notes</p>
            )}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Resume Builder"
          description="Create and manage your resumes"
          icon={<FileText className="h-6 w-6 text-highlight" />}
          footer={
            <Link to="/legacy" className="w-full">
              <Button className="w-full">Create New Resume</Button>
            </Link>
          }
        >
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Recent resumes:</p>
            {recentResumes.length > 0 ? (
              recentResumes.map((resume) => (
                <div key={resume.id} className="p-3 bg-secondary/20 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{resume.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(resume.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No recent resumes</p>
            )}
          </div>
        </DashboardCard>
      </div>

      {/* You can leave Activity Overview same */}
    </div>
  );
};

export default Dashboard;
