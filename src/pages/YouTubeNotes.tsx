
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { BookCheck, Copy, Download, Search } from "lucide-react";
import { mockPreviousNotes, VideoNote } from "@/services/mockData";
import { isValidYoutubeUrl } from "@/utils/youtubeParser";
import { generatePdf } from "@/utils/pdfGenerator";

const YouTubeNotes = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedNote, setGeneratedNote] = useState<VideoNote | null>(null);
  const [previousNotes, setPreviousNotes] = useState<VideoNote[]>(mockPreviousNotes);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidYoutubeUrl(youtubeUrl)) {
      // Would add toast notification in real implementation
      console.error("Please enter a valid YouTube URL");
      return;
    }
    
    setIsLoading(true);
    
    // Simulating API call to generate notes
    setTimeout(() => {
      const mockNote: VideoNote = {
        id: Date.now().toString(),
        title: "Introduction to Data Structures",
        url: youtubeUrl,
        content: `# Data Structures Fundamentals

## Arrays
- Contiguous memory locations
- Fixed size in many languages
- O(1) access time for any element
- Insertion and deletion require shifting elements

## Linked Lists
- Non-contiguous memory allocation
- Dynamic size
- O(n) access time
- Efficient insertions and deletions

## Stacks
- LIFO (Last In First Out) principle
- Operations: push, pop, peek
- Implementation using arrays or linked lists
- Applications: function calls, expression evaluation

## Queues
- FIFO (First In First Out) principle
- Operations: enqueue, dequeue
- Implementation using arrays or linked lists
- Applications: scheduling, breadth-first search`,
        topics: ["Data Structures", "Algorithms", "Computer Science"],
        timestamp: new Date().toISOString(),
        questions: [
          "Explain the difference between arrays and linked lists.",
          "What are the time complexities for common operations in stacks?",
          "How would you implement a queue using two stacks?",
          "Describe a real-world application where you would prefer a linked list over an array."
        ]
      };
      
      setGeneratedNote(mockNote);
      setPreviousNotes(prev => [mockNote, ...prev]);
      setIsLoading(false);
    }, 2000);
  };

  const downloadAsPdf = async () => {
    if (!generatedNote) return;
    
    try {
      await generatePdf({
        title: generatedNote.title,
        filename: `${generatedNote.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
        content: generatedNote.content
      });
      
      // Would add toast notification in real implementation
      console.log("PDF downloaded successfully");
    } catch (error) {
      console.error("Failed to generate PDF", error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Would add toast notification in real implementation
    console.log("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <Heading level={1} className="mb-2">YouTube Notes Generator</Heading>
          <p className="text-muted-foreground">
            Extract concise notes and technical questions from any CS-related YouTube video
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate New Notes</CardTitle>
            <CardDescription>
              Paste a YouTube video URL to generate concise notes and practice questions
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
                        Generated on {new Date(generatedNote.timestamp).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(generatedNote.content)}>
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadAsPdf}>
                        <Download className="h-4 w-4 mr-1" /> PDF
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {generatedNote.topics.map((topic, index) => (
                      <Badge key={index} variant="topic">{topic}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-sm font-mono bg-secondary/50 p-4 rounded-lg">
                      {generatedNote.content}
                    </pre>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start">
                  <Heading level={3} className="mb-4">Practice Questions</Heading>
                  <div className="space-y-2 w-full">
                    {generatedNote.questions.map((question, index) => (
                      <div key={index} className="bg-secondary/30 p-3 rounded-lg">
                        <div className="flex items-start gap-2">
                          <div className="bg-highlight/20 text-highlight rounded-full h-6 w-6 flex items-center justify-center shrink-0">
                            {index + 1}
                          </div>
                          <p>{question}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <div className="text-center py-10">
                <BookCheck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No notes generated yet. Enter a YouTube URL above to get started.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="history">
            {previousNotes.length > 0 ? (
              <div className="space-y-4">
                {previousNotes.map((note) => (
                  <Card key={note.id} className="cursor-pointer hover:bg-secondary/10 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{note.title}</CardTitle>
                          <CardDescription>
                            Generated on {new Date(note.timestamp).toLocaleDateString()}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {note.topics.map((topic, index) => (
                          <Badge key={index} variant="topic">{topic}</Badge>
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
