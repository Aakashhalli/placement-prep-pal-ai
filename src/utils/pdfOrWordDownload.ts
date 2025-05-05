import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  BulletList,
} from "docx";
import { saveAs } from "file-saver";

// Helper: Create bullet list
const createBulletList = (items: string[]) =>
  items.map((text) => new Paragraph({ text, bullet: { level: 0 } }));

// Helper: Nested bullet list (for points with subpoints)
const createPointsList = (points) => {
  const paragraphs = [];

  points.forEach((point) => {
    paragraphs.push(new Paragraph({ text: point.text, bullet: { level: 0 } }));

    if (point.subpoints) {
      point.subpoints.forEach((sub) => {
        paragraphs.push(new Paragraph({ text: sub, bullet: { level: 1 } }));
      });
    }
  });

  return paragraphs;
};

const downloadAsWord = async () => {
  if (!generatedNote) return;

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: generatedNote.title,
            heading: HeadingLevel.TITLE,
          }),

          ...generatedNote.content.sections.flatMap((section) => [
            new Paragraph({
              text: section.heading,
              heading: HeadingLevel.HEADING_2,
              spacing: { after: 200 },
            }),
            ...createPointsList(section.points),
            ...(section.applications?.length
              ? [
                  new Paragraph({
                    text: "Applications:",
                    bold: true,
                    spacing: { before: 200, after: 100 },
                  }),
                  ...createBulletList(section.applications),
                ]
              : []),
            ...(section.examples?.length
              ? [
                  new Paragraph({
                    text: "Examples:",
                    bold: true,
                    spacing: { before: 200, after: 100 },
                  }),
                  ...createBulletList(section.examples),
                ]
              : []),
            new Paragraph({ text: "", spacing: { before: 300 } }),
          ]),

          new Paragraph({
            text: "Aptitude Questions",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 100 },
          }),
          ...generatedNote.questions.map(
            (q, idx) =>
              new Paragraph({
                text: `${idx + 1}. ${q}`,
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
