import { useState } from "react";

export default function DonationUpload() {
  const [dropzoneId, setDropzoneId] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorNote, setDonorNote] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileBytes = await file.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(fileBytes)));

    const payload = {
      dropzoneId,
      donorName,
      donorNote,
      fileName: file.name,
      fileContentBase64: base64,
    };
    const apiBase = import.meta.env.VITE_API_URL;
    const res = await fetch(`${apiBase}/donations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Donation response:", data);
    alert(`Donation created!\nDownload link: ${data.donation.downloadUrl}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Donation</h2>
      <input
        value={dropzoneId}
        onChange={e => setDropzoneId(e.target.value)}
        placeholder="Dropzone ID"
      /><br />
      <input
        value={donorName}
        onChange={e => setDonorName(e.target.value)}
        placeholder="Donor Name"
      /><br />
      <input
        value={donorNote}
        onChange={e => setDonorNote(e.target.value)}
        placeholder="Donor Note"
      /><br />
      <input
        type="file"
        onChange={e => setFile(e.target.files[0])}
      /><br />
      <button type="submit">Upload Donation</button>
    </form>
  );
}
