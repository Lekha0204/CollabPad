import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { getPad, updatePad } from "../api/padApi";
import { encrypt, decrypt } from "../utils/encryption";

function CodeEditorPage() {
  const { code } = useParams();
  const [content, setContent] = useState("");
  const secretKey = import.meta.env.ENCRYPTION_SECRET;
  const [language, setLanguage] = useState("javascript");

  const loadPad = async () => {
    try {
      const res = await getPad(code);
      if (res.data.encryptedContent) {
        const decrypted = decrypt(res.data.encryptedContent, secretKey);
        setContent(decrypted);
        setLanguage(res.data.language || "javascript");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      const encrypted = encrypt(content, secretKey);
      await updatePad(code, encrypted);
      alert("Saved successfully ✅");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Code Editor: {code}</h2>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleSave}>💾 Save</button>
        <button onClick={loadPad} style={{ marginLeft: "10px" }}>
          🔄 Refresh
        </button>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ marginLeft: "10px" }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      <div style={{ border: "1px solid #ccc", marginTop: "10px" }}>
        <Editor
          height="60vh"
          language={language}
          theme="vs-dark"
          value={content}
          onChange={(value) => setContent(value || "")}
        />
      </div>
    </div>
  );
}

export default CodeEditorPage;
