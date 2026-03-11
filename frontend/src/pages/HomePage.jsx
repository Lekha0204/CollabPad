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
        <h1>Pad Code: {activePad}</h1>
        <h3>What would you like to open?</h3>
        
        <button 
          onClick={() => navigate(`/pad/${activePad}/text`)}
          style={{ padding: "10px 20px", width: "250px" }}
        >
          📝 Text Editor
        </button>
        <button 
          onClick={() => navigate(`/pad/${activePad}/code`)}
          style={{ padding: "10px 20px", width: "250px" }}
        >
          💻 Code Editor
        </button>
        <button 
          onClick={() => navigate(`/pad/${activePad}/file`)}
          style={{ padding: "10px 20px", width: "250px" }}
        >
          📁 File Upload/Download
        </button>
        
        <button 
          onClick={() => setActivePad(null)}
          style={{ padding: "5px 10px", marginTop: "20px", backgroundColor: "#666", color: "white" }}
        >
          ⬅️ Back
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
      <h1>CollabPad</h1>

      <input
        type="text"
        placeholder="Enter pad code..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <br />
      {/* <div>
        <button onClick={() => setMode("text")}>Text Editor</button>
        <button onClick={() => setMode("code")}>Code Editor</button>
      </div> */}
      <button
        onClick={handleJoin}
        style={{ padding: "10px 20px", marginTop: "15px" }}
      >
        Open Pad
      </button>

      <button
        onClick={newPad}
        style={{ padding: "10px 20px", marginTop: "15px" }}
      >
        New Pad
      </button>
    </div>
  );
}

export default HomePage;
