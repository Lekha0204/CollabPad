import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPad } from "../api/padApi";

function HomePage() {
  const [code, setCode] = useState("");
  const [activePad, setActivePad] = useState(null);
  const navigate = useNavigate();

  const newPad = async () => {
    try {
      const res = await createPad();
      setActivePad(res.data.padCode);
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoin = () => {
    if (!code.trim()) return;
    setActivePad(code.trim());
  };

  if (activePad) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h1 style={{ marginBottom: "5px" }}>{activePad}</h1>
        <h3 style={{ color: "#888", fontWeight: "400", marginTop: "0", marginBottom: "30px" }}>
          Select Workspace
        </h3>
        
        <button 
          onClick={() => navigate(`/pad/${activePad}/text`)}
          style={{ width: "250px", textAlign: "left", paddingLeft: "30px" }}
        >
          &gt; Text Editor
        </button>
        <button 
          onClick={() => navigate(`/pad/${activePad}/code`)}
          style={{ width: "250px", textAlign: "left", paddingLeft: "30px" }}
        >
          &gt; Code Editor
        </button>
        <button 
          onClick={() => navigate(`/pad/${activePad}/file`)}
          style={{ width: "250px", textAlign: "left", paddingLeft: "30px" }}
        >
          &gt; File Transfer
        </button>
        
        <button 
          onClick={() => setActivePad(null)}
          style={{ width: "250px", marginTop: "20px", background: "transparent", borderStyle: "dashed" }}
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1 style={{ letterSpacing: "2px", fontSize: "3rem" }}>CollabPad</h1>
      <p style={{ color: "#666", marginTop: "-20px", marginBottom: "40px" }}>Secure. Sync. Store.</p>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Access Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ width: "200px" }}
        />
        <button onClick={handleJoin}>Join</button>
      </div>

      <div style={{ margin: "20px 0", color: "#444" }}>— or —</div>

      <button
        onClick={newPad}
        style={{ width: "282px" }}
      >
        Create New Session
      </button>
    </div>
  );
}

export default HomePage;

