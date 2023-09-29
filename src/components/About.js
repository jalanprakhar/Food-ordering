import { useEffect } from "react";

function About() {
  useEffect(() => {
    console.log("hi");
  }, []);
  console.log("rendered");
  return (
    <div>
      <h1>About Us</h1>
      <h2>This is a test project</h2>
    </div>
  );
}

export default About;
