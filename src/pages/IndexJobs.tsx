import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ResumeParser from "@/components/ResumeParser";

const IndexJobs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-black relative overflow-hidden">
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMTM1NDQiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]" />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto py-16 px-4">
        {/* Heading Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 relative">
            <div className="absolute -inset-1 bg-gradient-to-r  rounded-lg blur opacity-20"></div>
            <h1 className="relative px-7 py-2 bg-black/50 rounded-lg text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white">
              Hire-AI: Resume Analyzer
            </h1>
          </div>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Upload your resume to find matching LinkedIn jobs tailored to your
            skills and experience.
          </p>

          <div className="flex items-center justify-center mt-6">
            <span className="h-px w-8 bg-gray-700"></span>
            <span className="px-3 text-blue-400/70 text-sm tracking-widest">
              AI-POWERED MATCHING
            </span>
            <span className="h-px w-8 bg-gray-700"></span>
          </div>
        </div>

        {/* Only ONE Card Here */}
        <div className="flex justify-center">
          <Card className="w-full max-w-3xl bg-black/70 backdrop-blur-md border-none shadow-lg">
            <CardContent className="p-8 bg-black">
              <ResumeParser />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IndexJobs;
