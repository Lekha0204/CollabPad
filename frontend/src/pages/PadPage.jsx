import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPad, updatePad } from "../api/padApi";
import { encrypt, decrypt } from "../utils/encryption";

function PadPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const secretKey = import.meta.env.VITE_ENCRYPTION_SECRET;

  const loadPad = async () => {
    try {
      const res = await getPad(code);
      if (res.data.encryptedText) {
        const decrypted = decrypt(res.data.encryptedText, secretKey);
        setContent(decrypted);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      const encrypted = encrypt(content, secretKey);
      await updatePad(code, { encryptedText: encrypted });
      alert("Saved successfully");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tech-container">
      <div className="top-nav">
        <h2>
          <span style={{ color: "#888" }}>PAD /</span> {code}
          <span style={{ fontSize: "0.8rem", color: "#666", marginLeft: "10px", fontWeight: "normal" }}>[LEGACY PAD]</span>
        </h2>
        <button className="nav-button" onClick={handleSave}>SAVE</button>
        <button className="nav-button" onClick={loadPad}>SYNC</button>
        <button className="nav-button" onClick={() => navigate("/")}>EXIT</button>
      </div>

      <div className="editor-workspace">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck="false"
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            padding: "20px",
            backgroundColor: "transparent",
            color: "#e0e0e0",
            border: "none",
            outline: "none",
            resize: "none",
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
          placeholder="Start typing..."
        />
      </div>
    </div>
  );
}

export default PadPage;
