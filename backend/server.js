const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Schemas
const bioSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
});

const skillSchema = new mongoose.Schema({
  name: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  github: String,
});

// Models
const Bio = mongoose.model("Bio", bioSchema, "bio");
const Skill = mongoose.model("Skill", skillSchema, "skills");
const Project = mongoose.model("Project", projectSchema, "projects");

// Routes

// ----- BIO -----
app.get("/api/bio", async (req, res) => {
  const bio = await Bio.find();
  res.json(bio);
});

app.post("/api/bio", async (req, res) => {
  const newBio = new Bio(req.body);
  await newBio.save();
  res.json(newBio);
});

app.put("/api/bio/:id", async (req, res) => {
  const updated = await Bio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

app.delete("/api/bio/:id", async (req, res) => {
  await Bio.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ----- SKILLS -----
app.get("/api/skills", async (req, res) => {
  const skills = await Skill.find();
  res.json(skills);
});

app.post("/api/skills", async (req, res) => {
  const newSkill = new Skill(req.body);
  await newSkill.save();
  res.json(newSkill);
});

app.put("/api/skills/:id", async (req, res) => {
  const updated = await Skill.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

app.delete("/api/skills/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// ----- PROJECTS -----
app.get("/api/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post("/api/projects", async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.json(newProject);
});

app.put("/api/projects/:id", async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

app.delete("/api/projects/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
