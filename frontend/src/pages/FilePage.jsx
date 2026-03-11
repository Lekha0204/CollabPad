import { useParams } from "react-router-dom";

function FilePage() {
  const { code } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      <h2>File Manager: {code}</h2>
      <p>Cloudinary integration for file upload/download will be implemented here later.</p>
    </div>
  );
}

export default FilePage;
