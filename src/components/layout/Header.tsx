
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookCheck, FileText, User, LogIn, LayoutDashboard } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <BookCheck className="h-6 w-6 text-highlight" />
            <span className="font-bold text-xl">PrepPal AI</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-highlight">
              <div className="flex items-center gap-1.5">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link to="/youtube-notes" className="text-sm font-medium transition-colors hover:text-highlight">
              <div className="flex items-center gap-1.5">
                <BookCheck className="h-4 w-4" />
                <span>YouTube Notes</span>
              </div>
            </Link>
            <Link to="/resume-builder" className="text-sm font-medium transition-colors hover:text-highlight">
              <div className="flex items-center gap-1.5">
                <FileText className="h-4 w-4" />
                <span>Resume Builder</span>
              </div>
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Link to="/auth">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
