import { useState } from "react";

export default function DropZoneForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [neededItems, setNeededItems] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      description,
      neededItems: neededItems.split(",").map(item => item.trim()),
    };
    const apiBase = import.meta.env.VITE_API_URL;
    const res = await fetch(`${apiBase}/dropzones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Drop zone created:", data);
    alert("Drop zone created!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Drop Zone</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      /><br />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
      /><br />
      <input
        value={neededItems}
        onChange={e => setNeededItems(e.target.value)}
        placeholder="Needed Items (comma separated)"
      /><br />
      <button type="submit">Create</button>
    </form>
  );
}
