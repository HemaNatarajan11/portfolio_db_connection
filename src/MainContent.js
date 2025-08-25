import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MainContent.css";

const MainContent = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    github: "",
  });
  const [newSkill, setNewSkill] = useState("");

  // Fetch projects from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Fetch skills from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/skills")
      .then((res) => setSkills(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Add new project
  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description)
      return alert("Fill all fields");
    const res = await axios.post(
      "http://localhost:5000/api/projects",
      newProject
    );
    setProjects([...projects, res.data]);
    setNewProject({ title: "", description: "", github: "" });
  };

  // Edit project
  const handleEditProject = async (project) => {
    const newTitle = prompt("Enter new title", project.title);
    const newDesc = prompt("Enter new description", project.description);
    const newGit = prompt("Enter new GitHub URL", project.github);
    if (newTitle && newDesc) {
      const res = await axios.put(
        `http://localhost:5000/api/projects/${project._id}`,
        {
          title: newTitle,
          description: newDesc,
          github: newGit,
        }
      );
      setProjects(projects.map((p) => (p._id === project._id ? res.data : p)));
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    await axios.delete(`http://localhost:5000/api/projects/${id}`);
    setProjects(projects.filter((p) => p._id !== id));
  };

  // Add new skill
  const handleAddSkill = async () => {
    if (!newSkill) return alert("Enter skill name");
    const res = await axios.post("http://localhost:5000/api/skills", {
      name: newSkill,
    });
    setSkills([...skills, res.data]);
    setNewSkill("");
  };

  // Edit skill
  const handleEditSkill = async (skill) => {
    const newName = prompt("Enter new skill name", skill.name);
    if (newName) {
      const res = await axios.put(
        `http://localhost:5000/api/skills/${skill._id}`,
        { name: newName }
      );
      setSkills(skills.map((s) => (s._id === skill._id ? res.data : s)));
    }
  };

  // Delete skill
  const handleDeleteSkill = async (id) => {
    await axios.delete(`http://localhost:5000/api/skills/${id}`);
    setSkills(skills.filter((s) => s._id !== id));
  };

  return (
    <main>
      {/* About Section */}
      <section id="about" className="section about">
        <h2>About Me</h2>
        <p>
          Passionate Frontend Developer proficient in HTML, CSS, and JavaScript,
          with a strong focus on building responsive, intuitive, and engaging
          user interfaces. Eager to contribute to a collaborative, fast-paced
          team where design thinking and user experience drive real value.
        </p>

        <div className="education">
          <h3>Education</h3>
          <div className="edu-item">
            <h4>B.Tech – Information Technology</h4>
            <p>Government College of Technology, Coimbatore</p>
            <p>Year of Passing: 2026 | Percentage: 84.4%</p>
          </div>
          <div className="edu-item">
            <h4>Higher Secondary</h4>
            <p>Year of Passing: 2022 | Percentage: 94.6%</p>
          </div>
          <div className="edu-item">
            <h4>SSLC</h4>
            <p>Year of Passing: 2020 | Percentage: 98%</p>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="section projects">
        <h2>Projects</h2>

        {/* Add New Project */}
        <div className="add-project">
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="GitHub URL"
            value={newProject.github}
            onChange={(e) =>
              setNewProject({ ...newProject, github: e.target.value })
            }
          />
          <button onClick={handleAddProject}>Add Project</button>
        </div>

        {/* Project List */}
        <div className="project-list">
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <button onClick={() => handleEditProject(project)}>Edit</button>
              <button onClick={() => handleDeleteProject(project._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section skills">
        <h2>Skills</h2>

        {/* Add New Skill */}
        <div className="add-skill">
          <input
            type="text"
            placeholder="New Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button onClick={handleAddSkill}>Add Skill</button>
        </div>

        {/* Skill List */}
        <ul className="skills-list">
          {skills.map((skill) => (
            <li key={skill._id}>
              {skill.name}
              <button onClick={() => handleEditSkill(skill)}>Edit</button>
              <button onClick={() => handleDeleteSkill(skill._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact Section (Existing, Unchanged) */}
      <section id="contact" className="section contact">
        <h2 className="contact-title">Contact Me</h2>
        <div className="contact-container">
          <div className="contact-form">
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="6" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>

          <div className="contact-links">
            <a
              href="https://www.linkedin.com/in/hemanatarajan15/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a
              href="https://github.com/HemaNatarajan11"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i> GitHub
            </a>
            <a href="tel:+1234567890">
              <i className="fas fa-phone-alt"></i> Phone
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
