
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { BookCheck, FileText, History } from "lucide-react";

const Dashboard = () => {
  const [recentNotes, setRecentNotes] = useState([
    { id: '1', title: 'Introduction to Data Structures', date: '2023-04-10' },
    { id: '2', title: 'Advanced JavaScript Concepts', date: '2023-04-05' }
  ]);

  const [recentResumes, setRecentResumes] = useState([
    { id: '1', title: 'Software Engineer Resume', date: '2023-04-12' },
    { id: '2', title: 'Data Analyst Resume', date: '2023-04-03' }
  ]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Heading level={1} className="mb-2">Dashboard</Heading>
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
            {recentNotes.map(note => (
              <div key={note.id} className="p-3 bg-secondary/20 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{note.title}</span>
                  <span className="text-xs text-muted-foreground">{note.date}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Resume Builder"
          description="Create and manage your resumes"
          icon={<FileText className="h-6 w-6 text-highlight" />}
          footer={
            <Link to="/resume-builder" className="w-full">
              <Button className="w-full">Create New Resume</Button>
            </Link>
          }
        >
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Recent resumes:</p>
            {recentResumes.map(resume => (
              <div key={resume.id} className="p-3 bg-secondary/20 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{resume.title}</span>
                  <span className="text-xs text-muted-foreground">{resume.date}</span>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Your recent activities and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-md">
                <div className="bg-highlight/20 p-2 rounded-full">
                  <History className="h-5 w-5 text-highlight" />
                </div>
                <div>
                  <p className="font-medium">Generated notes from "Introduction to Data Structures"</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-md">
                <div className="bg-highlight/20 p-2 rounded-full">
                  <FileText className="h-5 w-5 text-highlight" />
                </div>
                <div>
                  <p className="font-medium">Created "Software Engineer Resume"</p>
                  <p className="text-xs text-muted-foreground">5 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-md">
                <div className="bg-highlight/20 p-2 rounded-full">
                  <BookCheck className="h-5 w-5 text-highlight" />
                </div>
                <div>
                  <p className="font-medium">Generated notes from "Advanced JavaScript Concepts"</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
