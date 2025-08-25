import React, { useEffect, useState } from "react";
import axios from "axios";
import OIP from "./assets/OIP.webp";
import "./Hero.css";

const Hero = () => {
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bio")
      .then((res) => {
        if (res.data.length > 0) setBio(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section className="hero">Loading...</section>;
  }

  return (
    <section id="home" className="hero">
      <div className="hero-image">
        <img src={OIP} alt="Profile" />
      </div>
      <div className="content">
        <h1>
          Hello, I'm <span>{bio?.name}</span>
        </h1>
        <h2>{bio?.title}</h2>
        <p>{bio?.description}</p>

        <a href="/resume.pdf" download className="download">
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default Hero;
