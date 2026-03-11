import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPad, updatePad } from "../api/padApi";
import { encrypt, decrypt } from "../utils/encryption";

function PadPage() {
  const { code } = useParams();
  const [content, setContent] = useState("");
  const secretKey = import.meta.env.VITE_ENCRYPTION_SECRET || "collabpad-secret";

  const loadPad = async () => {
    try {
      const res = await getPad(code);
      if (res.data.encryptedContent) {
        const decrypted = decrypt(res.data.encryptedContent, secretKey);
        setContent(decrypted);
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
      <h2>Pad: {code}</h2>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleSave}>💾 Save</button>
        <button onClick={loadPad} style={{ marginLeft: "10px" }}>
          🔄 Refresh
        </button>
      </div>

      <textarea
        rows="20"
        cols="100"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}

export default PadPage;
