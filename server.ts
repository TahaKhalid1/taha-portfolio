import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COUNT_FILE = path.join(__dirname, "visitor_count.json");

function getCount() {
  try {
    if (fs.existsSync(COUNT_FILE)) {
      const data = fs.readFileSync(COUNT_FILE, "utf-8");
      return JSON.parse(data).count || 0;
    }
  } catch (e) {
    console.error("Error reading count file", e);
  }
  return 0;
}

function saveCount(count: number) {
  try {
    fs.writeFileSync(COUNT_FILE, JSON.stringify({ count }), "utf-8");
  } catch (e) {
    console.error("Error saving count file", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Visitor count API
  app.get("/api/visitor-count", (req, res) => {
    const count = getCount();
    res.json({ count });
  });

  app.post("/api/visitor-count/increment", (req, res) => {
    let count = getCount();
    count += 1;
    saveCount(count);
    res.json({ count });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
