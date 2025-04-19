
export interface ResumeTemplate {
  id: string;
  name: string;
  type: 'modern' | 'classic' | 'minimal';
  thumbnailUrl: string;
}

export const mockResumeTemplates: ResumeTemplate[] = [
  {
    id: '1',
    name: 'Modern Professional',
    type: 'modern',
    thumbnailUrl: '/modern-template.png'
  },
  {
    id: '2',
    name: 'Classic Elegance',
    type: 'classic',
    thumbnailUrl: '/classic-template.png'
  },
  {
    id: '3',
    name: 'Minimal Clean',
    type: 'minimal',
    thumbnailUrl: '/minimal-template.png'
  }
];

export interface VideoNote {
  id: string;
  title: string;
  url: string;
  content: string;
  topics: string[];
  timestamp: string;
  questions: string[];
}

export const mockPreviousNotes: VideoNote[] = [
  {
    id: '1',
    title: 'Introduction to Data Structures',
    url: 'https://www.youtube.com/watch?v=abc123',
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
- Efficient insertions and deletions`,
    topics: ['Data Structures', 'Algorithms', 'Computer Science'],
    timestamp: '2023-04-10T14:48:00.000Z',
    questions: [
      'Explain the difference between arrays and linked lists.',
      'What are the advantages of using linked lists over arrays?',
      'How would you implement a stack using an array?'
    ]
  },
  {
    id: '2',
    title: 'Advanced JavaScript Concepts',
    url: 'https://www.youtube.com/watch?v=def456',
    content: `# Advanced JavaScript Concepts

## Closures
- A function that remembers its lexical scope
- Preserves access to variables from the parent scope
- Used for data privacy and encapsulation

## Promises
- Represents a future value
- Can be in pending, fulfilled, or rejected states
- Chained with .then() and .catch()`,
    topics: ['JavaScript', 'Web Development', 'Programming'],
    timestamp: '2023-04-05T10:22:00.000Z',
    questions: [
      'Explain closures in JavaScript and provide an example.',
      'What are the advantages of using Promises over callbacks?',
      'How does async/await simplify working with Promises?'
    ]
  }
];
