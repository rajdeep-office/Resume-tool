import React, { useState, useEffect } from "react";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [animatedText, setAnimatedText] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: "Failed to upload or analyze resume." });
    }
    setLoading(false);
  };

  const buttonStyle = {
    padding: "12px 24px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: isHovered ? "#3E5879" : "#D9EAFD",
    color: isHovered ? "#ffffff" : "#333333",
    boxShadow: isHovered
      ? "0 4px 12px rgba(0, 0, 0, 0.2)"
      : "0 2px 6px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    marginTop: "20px",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#fff",
          marginBottom: "20px",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
        }}
      >
        
      </h2>
(Only PDF files are allowed)
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "0px",
            backgroundColor: "none",
            fontSize: "16px",
            marginBottom: "30px",
            width: "300px",
            color:"black",
          }}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {loading ? "Analyzing..." : "Upload & Score"}
        </button>
      </form>

      {result && (
        <div
          style={{
            marginTop: 30,
            textAlign: "left",
            maxWidth: "600px",
            margin: "30px auto",
            backgroundColor: "#F8FAFC",
            padding: "20px",
            borderRadius: "10px",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          {result.error ? (
            <div
              style={{
                color: "#fff",
                backgroundColor: "#F8FAFC",
                padding: "10px",
                borderRadius: "6px",
              }}
            >
              {result.error}
            </div>
          ) : (
            <>
              <h3 style={{ color: "#393E46" }}>Overview</h3>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  backgroundColor: "#F8FAFC",
                  padding: "10px",
                  borderRadius: "6px",
                  color: "#393E46",
                }}
              >
                {result.overview}
              </pre>
              <h3 style={{ color: "#393E46" }}>
                ATS Score: {result.atsScore}/100
              </h3>
              <h3 style={{ color: "#393E46" }}>Suggestions</h3>
              <div
                style={{
                  backgroundColor: "#F8FAFC",
                  padding: "10px",
                  borderRadius: "6px",
                  color: "#393E46",
                }}
              >
                {result.suggestions}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadResume;
