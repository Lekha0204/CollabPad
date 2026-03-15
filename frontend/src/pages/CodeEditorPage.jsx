import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { getPad, updatePad } from "../api/padApi";
import { encrypt, decrypt } from "../utils/encryption";

function CodeEditorPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const secretKey = import.meta.env.VITE_ENCRYPTION_SECRET;
  const [language, setLanguage] = useState("javascript");

  const loadPad = async () => {
    try {
      const res = await getPad(code);
      if (res.data.encryptedCode) {
        const decrypted = decrypt(res.data.encryptedCode, secretKey);
        setContent(decrypted);
      }
      if (res.data.language) {
        setLanguage(res.data.language);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      const encrypted = encrypt(content, secretKey);
      await updatePad(code, { encryptedCode: encrypted, language });
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
          <span style={{ fontSize: "0.8rem", color: "#666", marginLeft: "10px", fontWeight: "normal" }}>[CODE]</span>
        </h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            backgroundColor: "#1a1a1a",
            color: "#e0e0e0",
            border: "1px solid #333",
            padding: "5px 10px",
            borderRadius: "4px",
            outline: "none"
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>

        <button className="nav-button" onClick={handleSave}>SAVE</button>
        <button className="nav-button" onClick={loadPad}>SYNC</button>
        <button className="nav-button" onClick={() => navigate("/")}>EXIT</button>
      </div>

      <div className="editor-workspace">
        <Editor
          height="calc(100vh - 55px)"
          width="100%"
          language={language}
          theme="vs-dark"
          value={content}
          onChange={(value) => setContent(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Courier New', Courier, monospace",
            padding: { top: 20 },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPage;
