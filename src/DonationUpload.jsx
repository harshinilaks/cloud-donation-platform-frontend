import { useEffect, useState } from "react";

export default function DonationUpload() {
  const [dropzones, setDropzones] = useState([]);
  const [dropzoneId, setDropzoneId] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorNote, setDonorNote] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function fetchDropZones() {
      try {
        const apiBase = import.meta.env.VITE_API_URL;
        const res = await fetch(`${apiBase}/dropzones`);
        if (!res.ok) throw new Error("Failed to fetch drop zones");
        const data = await res.json();
        setDropzones(data.dropzones || []);
      } catch (err) {
        console.error("Error fetching drop zones:", err);
      }
    }

    fetchDropZones();
  }, []);

  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dropzoneId) {
      alert("Please select a drop zone!");
      return;
    }

    if (!file) {
      alert("Please select a file!");
      return;
    }

    const fileBytes = await file.arrayBuffer();
    const base64 = arrayBufferToBase64(fileBytes);

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

    // Optionally reset form
    setDropzoneId("");
    setDonorName("");
    setDonorNote("");
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Donation</h2>

      <label>
        Select Drop Zone:
        <select
          value={dropzoneId}
          onChange={e => setDropzoneId(e.target.value)}
        >
          <option value="">-- Select Drop Zone --</option>
          {dropzones.map(dz => (
            <option key={dz.dropzoneId} value={dz.dropzoneId}>
              {dz.name}
            </option>
          ))}
        </select>
      </label>
      <br />

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
