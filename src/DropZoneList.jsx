import { useEffect, useState } from "react";


export default function DropZoneList() {
  const [dropzones, setDropzones] = useState([]);
  

  useEffect(() => {
    async function fetchDropZones() {
      const apiBase = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiBase}/dropzones`);
      const data = await res.json();
      setDropzones(data.dropzones);
    }
    fetchDropZones();
  }, []);

  return (
    <div>
      <h2>Drop Zones</h2>
      {dropzones.map(dz => (
        <div key={dz.dropzoneId}>
          <h4>{dz.name}</h4>
          <p>{dz.description}</p>
          <p>Needed: {dz.neededItems?.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
