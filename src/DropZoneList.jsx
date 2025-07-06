import { useEffect, useState } from "react";

export default function DropZoneList() {
  const [dropzones, setDropzones] = useState([]);
  const [donations, setDonations] = useState({});

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchDropZones() {
      const res = await fetch(`${apiBase}/dropzones`);
      const data = await res.json();
      setDropzones(data.dropzones || []);

      // For each dropzone, load its donations
      for (const dz of data.dropzones || []) {
        const res = await fetch(`${apiBase}/dropzones/${dz.dropzoneId}/donations`);
        const data = await res.json();
        setDonations(prev => ({
          ...prev,
          [dz.dropzoneId]: data.donations || []
        }));
      }
    }

    fetchDropZones();
  }, [apiBase]);

  return (
    <div>
  <h2 style={{
    fontSize: "1.8em",
    marginBottom: "20px",
    color: "#2c3e50"
  }}>
    Drop Zones
  </h2>

  {dropzones.map(dz => (
    <div key={dz.dropzoneId} style={{
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      padding: "20px",
      marginBottom: "20px"
    }}>
      <h3 style={{ color: "#2980b9" }}>{dz.name}</h3>
      <p style={{ color: "#555" }}>{dz.description}</p>
      <p style={{ marginBottom: "10px" }}>
        <strong>Needed Items:</strong> {dz.neededItems?.join(", ")}
      </p>

      <h4 style={{
        marginTop: "15px",
        marginBottom: "10px",
        color: "#27ae60"
      }}>Donations</h4>

      {donations[dz.dropzoneId]?.length > 0 ? (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {donations[dz.dropzoneId].map(donation => (
            <li key={donation.donationId} style={{
              marginBottom: "6px"
            }}>
              <a
                href={donation.downloadUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "#8e44ad",
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                {donation.donorName || "Unnamed Donation"}
              </a>{" "}
              <span style={{ color: "#555" }}>
                - {donation.donorNote}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "#999" }}>No donations yet.</p>
      )}
    </div>
  ))}
</div>

  );
}
