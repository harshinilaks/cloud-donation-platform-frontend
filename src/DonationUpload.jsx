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
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        marginBottom: "20px",
        width: "400px", // ✅ fixed width for nice layout
      }}
    >
      <h2
        style={{
          marginBottom: "15px",
          color: "#8e44ad",
        }}
      >
        Upload Donation
      </h2>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "8px" }}>Select Drop Zone</label>
        <select
          value={dropzoneId}
          onChange={(e) => setDropzoneId(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        >
          <option value="">-- Select Drop Zone --</option>
          {dropzones.map((dz) => (
            <option key={dz.dropzoneId} value={dz.dropzoneId}>
              {dz.name}
            </option>
          ))}
        </select>

        <label style={{ marginBottom: "8px" }}>Donor Name</label>
        <input
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          placeholder="Donor name"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px", // ✅ bigger text
          }}
        />

        <label style={{ marginBottom: "8px" }}>Donor Note</label>
        <input
          value={donorNote}
          onChange={(e) => setDonorNote(e.target.value)}
          placeholder="Short note"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <label
          htmlFor="fileUpload"
          style={{
            display: "inline-block",
            background: "#9b59b6",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "16px",
            transition: "background 0.3s ease", // ✅ hover effect
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#a569bd";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#9b59b6";
          }}
        >
          Choose File
        </label>
        <input
          id="fileUpload"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{
            display: "none",
          }}
        />
        {file && (
          <p
            style={{
              color: "#333",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            Selected file: {file.name}
          </p>
        )}

        <button
          type="submit"
          style={{
            background: "#9b59b6",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background 0.3s ease",
            alignSelf: "flex-start", // ✅ aligns button nicely under inputs
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#a569bd";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#9b59b6";
          }}
        >
          Upload Donation
        </button>
      </div>
    </form>
  );
}
