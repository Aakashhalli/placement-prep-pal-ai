import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages from your TS project
import Home from "./pages/Home";
import YouTubeNotes from "./pages/YouTubeNotes";
import ResumeBuilderWrapper from "./pages/ResumeBuilder"; // Acts as a wrapper
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Pages/components from JSX project
import Templates from "./pages/Templates";
import GetStarted from "./pages/GetStarted";
import FinalPage from "./pages/FinalPage";
import ResumeBuilder from "./pages/ResumeBuilder";
import ResumeBuilderPage from "./pages/ResumeBuilderPage";
import PersonalDetails from "./React_Components/PersonalDetails";
import Education from "./React_Components/Education";
import Experience from "./React_Components/Experience";
import Skills from "./React_Components/Skills";
import AddProjects from "./React_Components/Projects";
import AboutLegacy from "./React_Components/About"; // Rename to avoid clash
import Interview from "./pages/Interview";
import Report from "./pages/Report";
import Contact from "./pages/Contact";
import Index from "./pages/Index";
import IndexJobs from "./pages/IndexJobs";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AptitudePage from "./pages/AptitudePage";
import TopicDetailPage from "./pages/TopicDetailPage";
import GrandTestPage from "./pages/GrandTestPage";
import FlashcardsPage from "./pages/FlashcardsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/youtube-notes"
              element={
                <Layout>
                  <YouTubeNotes />
                </Layout>
              }
            />
            <Route
              path="/auth"
              element={
                <Layout>
                  <Auth />
                </Layout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />

            {/* Legacy JSX routes */}
            <Route
              path="/legacy"
              element={
                <Layout>
                  <GetStarted />
                </Layout>
              }
            />
            <Route
              path="/legacy/templates"
              element={
                <Layout>
                  <Templates />
                </Layout>
              }
            />
            <Route
              path="/create"
              element={
                <Layout>
                  <ResumeBuilderPage />
                </Layout>
              }
            >
              <Route path="personal-details" element={<PersonalDetails />} />
              <Route path="education" element={<Education />} />
              <Route path="professional-experience" element={<Experience />} />
              <Route path="skills" element={<Skills />} />
              <Route path="projects" element={<AddProjects />} />
              <Route path="summary" element={<AboutLegacy />} />
              <Route path="finalize" element={<FinalPage />} />
            </Route>
            <Route
              path="/interview"
              element={
                <Layout>
                  <Index />
                </Layout>
              }
            />
            <Route
              path="/interview-start"
              element={
                <Layout>
                  <Interview />
                </Layout>
              }
            />
            <Route
              path="/report"
              element={
                <Layout>
                  <Report />
                </Layout>
              }
            />
            <Route
              path="/job-finder"
              element={
                <Layout>
                  <IndexJobs />
                </Layout>
              }
            />
            <Route path="/aptitude-home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/aptitude" element={<AptitudePage />} />
            <Route
              path="/aptitude/topic/:topicId"
              element={<TopicDetailPage />}
            />
            <Route path="/aptitude/grand-test" element={<GrandTestPage />} />
            <Route path="/flashcards" element={<FlashcardsPage />} />
            {/* Catch-all */}
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
