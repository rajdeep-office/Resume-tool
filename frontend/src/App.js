import React from "react";
import UploadResume from "./components/UploadResume";

function App() {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #FBFBFB, #E8F9FF)",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          color: "#003161",
        }}
      >
        Resume Scoring Agent
      </h1>
      <p
        style={{
          fontSize: "20px",
          marginBottom: "30px",
          color: "#57564F",
        }}
      >
        Get instant feedback on your Resume with AI-Powered analysis. <br />
        Improve your formatting, keywords, grammar, readability to land more
        interviews.
      </p>

      {/* Cards Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "20px",
            width: "300px",
            textAlign: "left",
          }}
        >
          <h3 style={{ color: "#003161" }}>Keyword Optimization</h3>
          <p style={{ color: "#57564F" }}>
            Ensure your resume includes the right keywords to pass ATS filters
            and match job descriptions.
          </p>
        </div>

        {/* Card 2 */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "20px",
            width: "300px",
            textAlign: "left",
          }}
        >
          <h3 style={{ color: "#003161" }}>Grammar & Readability</h3>
          <p style={{ color: "#57564F" }}>
            Improve sentence structure, clarity, and grammar to make your resume
            more professional and readable.
          </p>
        </div>

        {/* Card 3 */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            padding: "20px",
            width: "300px",
            textAlign: "left",
          }}
        >
          <h3 style={{ color: "#003161" }}>ATS Score Analysis</h3>
          <p style={{ color: "#57564F" }}>
            Get a detailed ATS score breakdown to understand how your resume
            performs against automated screening systems.
          </p>
        </div>
      </div>

      <UploadResume />
    </div>
  );
}

export default App;
