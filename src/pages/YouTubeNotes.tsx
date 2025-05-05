import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { BookCheck, Copy, Download, Search } from "lucide-react";
import { mockPreviousNotes, VideoNote } from "@/services/mockData";
import axios from "axios";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

import { toast } from "@/components/ui/use-toast";

const YouTubeNotes = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<VideoNote | null>(null);
  const [previousNotes, setPreviousNotes] = useState<VideoNote[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/history");
        console.log("Fetched history:", res.data);
        if (Array.isArray(res.data)) {
          setPreviousNotes(res.data);
        } else {
          console.warn("Unexpected data format", res.data);
          setPreviousNotes([]);
        }
      } catch (error) {
        console.error("Failed to fetch history", error);
        setPreviousNotes([]);
      }
    };
    console.log("Generated Note Content", generatedNote);
    console.log("Previous Notes", previousNotes);

    fetchHistory();
  }, []);

  const downloadAsWord = async () => {
    if (!generatedNote) return;

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: generatedNote.title,
              heading: HeadingLevel.TITLE,
              spacing: { after: 300 },
            }),

            ...generatedNote.content.sections.flatMap((section) => {
              const content: Paragraph[] = [];

              // Section heading
              content.push(
                new Paragraph({
                  text: section.heading,
                  heading: HeadingLevel.HEADING_2,
                  spacing: { after: 200 },
                })
              );

              // Main points and subpoints
              section.points.forEach((point) => {
                content.push(
                  new Paragraph({
                    text: point.text,
                    bullet: { level: 0 },
                  })
                );

                if (point.subpoints?.length) {
                  point.subpoints.forEach((sub) => {
                    content.push(
                      new Paragraph({
                        text: sub,
                        bullet: { level: 1 },
                      })
                    );
                  });
                }
              });

              // Applications
              if (section.applications?.length) {
                content.push(
                  new Paragraph({
                    text: "Applications:",
                    spacing: { before: 200, after: 100 },
                    bold: true,
                  })
                );
                section.applications.forEach((app) =>
                  content.push(
                    new Paragraph({ text: app, bullet: { level: 0 } })
                  )
                );
              }

              // Examples
              if (section.examples?.length) {
                content.push(
                  new Paragraph({
                    text: "Examples:",
                    spacing: { before: 200, after: 100 },
                    bold: true,
                  })
                );
                section.examples.forEach((ex) =>
                  content.push(
                    new Paragraph({ text: ex, bullet: { level: 0 } })
                  )
                );
              }

              content.push(new Paragraph("")); // Spacer
              return content;
            }),

            // Aptitude Questions
            new Paragraph({
              text: "Aptitude Questions",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 300, after: 200 },
            }),
            ...generatedNote.questions.map(
              (q, i) =>
                new Paragraph({
                  text: `${i + 1}. ${q}`,
                  spacing: { after: 100 },
                })
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(
      blob,
      `${generatedNote.title.toLowerCase().replace(/\s+/g, "-")}.docx`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log("Previous Notes", previousNotes);

    // Check if the URL already exists in history
    const alreadyExists = previousNotes.some(
      (note) => note.videoLink === youtubeUrl
    );
    console.log("Already exists:", alreadyExists);
    if (alreadyExists) {
      toast({
        title: "Duplicate Video",
        description: "Notes already exist for this video.",
        variant: "default",
      });
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/process", {
        link: youtubeUrl,
      });

      const data = response.data;
      const structuredData = data.generatedData;
      console.log("Response from backend:", structuredData);

      const mockNote: VideoNote = {
        _id: Date.now().toString(),
        title: structuredData.title,
        url: youtubeUrl,
        content: structuredData, // Store the entire structured data
        topics: structuredData.sections?.map((s: any) => s.heading) || [],
        timestamp: new Date().toISOString(),
        questions: structuredData.questions,
      };

      setPreviousNotes((prev) => [mockNote, ...prev]);
      setGeneratedNote(mockNote); // <-- ADD THIS LINE
    } catch (error) {
      console.error("Error generating note:", error);
      toast.error("Failed to generate notes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <Heading level={1} className="mb-2">
            YouTube Notes Generator
          </Heading>
          <p className="text-muted-foreground">
            Extract concise notes and technical questions from any CS-related
            YouTube video
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate New Notes</CardTitle>
            <CardDescription>
              Paste a YouTube video URL to generate concise notes and practice
              questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter YouTube URL"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !youtubeUrl}>
                {isLoading ? (
                  <div className="flex items-center">
                    <span className="animate-spin mr-2">⏳</span>
                    Processing
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Generate
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Tabs defaultValue="current" className="mb-8">
          <TabsList>
            <TabsTrigger value="current">Current Note</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            {generatedNote ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{generatedNote.title}</CardTitle>
                      <CardDescription>
                        Generated on{" "}
                        {new Date(generatedNote.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={downloadAsWord}
                        >
                          <Download className="h-4 w-4 mr-1" /> Word
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {generatedNote.topics?.map((topic, index) => (
                      <Badge key={index} variant="topic">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 text-sm">
                    {generatedNote?.content.sections.map((section, idx) => (
                      <div
                        key={`section-${idx}-${section.heading}`}
                        className="space-y-2"
                      >
                        <h2 className="text-xl font-bold text-white">
                          {section.heading}
                        </h2>

                        <ul className="list-disc list-inside ml-4 space-y-1 text-gray-300">
                          {section.points.map((point, pIdx) => (
                            <li key={`point-${pIdx}-${point.text}`}>
                              {point.text}
                              {point.subpoints && (
                                <ul className="list-disc list-inside ml-5 mt-1">
                                  {point.subpoints.map((sub, sIdx) => (
                                    <li
                                      key={`subpoint-${sIdx}-${sub}`}
                                      className="text-gray-400"
                                    >
                                      {sub}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>

                        {section.applications?.length > 0 && (
                          <div className="ml-4 mt-2">
                            <h3 className="font-semibold text-white">
                              Applications:
                            </h3>
                            <ul className="list-disc list-inside ml-4 text-gray-300">
                              {section.applications.map((app, i) => (
                                <li key={`application-${i}-${app}`}>{app}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {section.examples?.length > 0 && (
                          <div className="ml-4 mt-2">
                            <h3 className="font-semibold text-white">
                              Examples:
                            </h3>
                            <ul className="list-disc list-inside ml-4 text-gray-300">
                              {section.examples.map((ex, i) => (
                                <li key={`example-${i}-${ex}`}>{ex}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* <CardFooter className="flex-col items-start">
                  <Heading level={3} className="mb-4">
                    Practice Questions
                  </Heading>
                  <div className="space-y-2 w-full">
                    {generatedNote.questions.map((question, index) => (
                      <div
                        key={`question-${index}-${question}`}
                        className="bg-secondary/30 p-3 rounded-lg"
                      >
                        <div className="flex items-start gap-2">
                          <div className="bg-highlight/20 text-highlight rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                            {index + 1}
                          </div>
                          <p>{question}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardFooter> */}
                <CardFooter className="flex-col items-start">
                  <Heading level={3} className="mb-4">
                    Practice Questions
                  </Heading>
                  <div className="space-y-2 w-full">
                    {generatedNote.questions.map((question, index) => (
                      <div
                        key={`question-${index}-${question}`}
                        className="bg-secondary/30 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                      >
                        <div className="flex items-start gap-2">
                          <div className="bg-highlight/20 text-highlight rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-sm">{question}</p>
                        </div>
                        <button
                          onClick={() =>
                            window.open(
                              `https://chat.openai.com/?model=gpt-4&prompt=${encodeURIComponent(
                                question
                              )}`,
                              "_blank"
                            )
                          }
                          className="text-sm px-3 py-1 bg-muted hover:bg-muted/80 text-primary rounded-md transition"
                        >
                          Ask ChatGPT
                        </button>
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <div className="text-center py-10">
                <BookCheck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No notes generated yet. Enter a YouTube URL above to get
                  started.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="history">
            {Array.isArray(previousNotes) && previousNotes.length > 0 ? (
              <div className="space-y-4">
                {previousNotes.map((note, idx) => (
                  <Card
                    key={note._id || note.id || idx}
                    className="cursor-pointer hover:bg-secondary/10 transition-colors"
                    onClick={() =>
                      setGeneratedNote({
                        title: note.title,
                        content: { sections: note.sections || [] },
                        questions: note.questions || [],
                        topics: note.topics || [],
                        createdAt: note.createdAt,
                      })
                    }
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{note.title}</CardTitle>
                          <CardDescription>
                            Generated on{" "}
                            {new Date(note.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Array.isArray(note.topics) &&
                          note.topics.map((topic, tIdx) => (
                            <Badge
                              key={`${note._id}-topic-${tIdx}-${topic}`}
                              variant="topic"
                            >
                              {topic}
                            </Badge>
                          ))}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No history yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default YouTubeNotes;
