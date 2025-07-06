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
      <h2>Drop Zones</h2>
      {dropzones.map(dz => (
        <div key={dz.dropzoneId} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h4>{dz.name}</h4>
          <p>{dz.description}</p>
          <p>
            Needed: {dz.neededItems?.join(", ")}
          </p>

          <h5>Donations:</h5>
          {donations[dz.dropzoneId]?.length > 0 ? (
            <ul>
              {donations[dz.dropzoneId].map(donation => (
                <li key={donation.donationId}>
                  <a href={donation.downloadUrl} target="_blank" rel="noreferrer">
                    {donation.donorName || "Unnamed Donation"}
                  </a>{" "}
                  - {donation.donorNote}
                </li>
              ))}
            </ul>
          ) : (
            <p>No donations yet.</p>
          )}
        </div>
      ))}
    </div>
  );
}
