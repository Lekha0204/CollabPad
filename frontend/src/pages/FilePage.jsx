import { useParams, useNavigate } from "react-router-dom";

function FilePage() {
  const { code } = useParams();
  const navigate = useNavigate();

  return (
    <div className="tech-container">
      <div className="top-nav">
        <h2>
          <span style={{ color: "#888" }}>PAD /</span> {code}
          <span style={{ fontSize: "0.8rem", color: "#666", marginLeft: "10px", fontWeight: "normal" }}>[FILES]</span>
        </h2>
        <button className="nav-button" onClick={() => navigate("/")}>EXIT</button>
      </div>

      <div className="editor-workspace" style={{ padding: "20px", color: "#888" }}>
        <p>&gt; Cloudinary integration for file upload/download will be implemented here later.</p>
        <p className="blink-cursor">_</p>
      </div>
    </div>
  );
}

export default FilePage;
