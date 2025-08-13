import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const upload = multer({ dest: path.join(__dirname, "uploads/") });
app.use(cors());

// Serve frontend build files
app.use(express.static(path.join(__dirname, "../frontend/build")));

const KEYWORDS = [
  "JavaScript", "Python", "Node.js", "React", "API", "SQL", "AWS", "Git", "Agile", "Communication", "Teamwork", "Salesforce", "Oracle Apex", "Oracle EBS", "HTML", "CSS", "Angular", "PL/SQL", "Leadership"
];

function simpleATSScore(text) {
  let score = 0;
  let found = [];
  KEYWORDS.forEach(word => {
    if (text.toLowerCase().includes(word.toLowerCase())) {
      score += 10;
      found.push(word);
    }
  });
  return {
    score: Math.min(score, 100),
    found
  };
}

function suggestImprovements(foundKeywords) {
  const missing = KEYWORDS.filter(k => !foundKeywords.includes(k));
  if (missing.length === 0) {
    return "Great! Your resume contains all major keywords.";
  }
  return `Consider including these key terms/skills if relevant: ${missing.join(', ')}`;
}

app.post("/api/upload", upload.single("resume"), async (req, res) => {
  try {
    const file = req.file;
    const dataBuffer = fs.readFileSync(file.path);
    const data = await pdfParse(dataBuffer);

    const { score, found } = simpleATSScore(data.text);
    const suggestions = suggestImprovements(found);

    fs.unlinkSync(file.path);

    res.json({
      overview: data.text.slice(0, 500) + (data.text.length > 500 ? '...' : ''),
      atsScore: score,
      suggestions
    });
  } catch (e) {
    res.status(500).json({ error: "Failed to parse resume. Please upload a valid PDF file." });
  }
});

// Fallback to frontend for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
