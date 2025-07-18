import { useState } from "react";

export default function DropZoneForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
//   const [neededItems, setNeededItems] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      description,
    //   neededItems: neededItems.split(",").map(item => item.trim()),
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
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        marginBottom: "20px",
        width: "400px", 
      }}
    >
      <h2
        style={{
          marginBottom: "15px",
          color: "#2980b9",
        }}
      >
        Create Drop Zone
      </h2>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: "8px" }}>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Drop zone name"
          style={{
            width: "100%", // fill the form container
            padding: "8px",
            marginBottom: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px", // bigger text
          }}
        />

        <label style={{ marginBottom: "8px" }}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description - Event, Needed Items, etc."
          style={{
            width: "100%", // fill the form container
            padding: "8px",
            marginBottom: "12px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        {/* <label style={{ marginBottom: "8px" }}>
          Needed Items (comma separated)
        </label>
        <input
          value={neededItems}
          onChange={(e) => setNeededItems(e.target.value)}
          placeholder="e.g. water, blankets"
          style={{
            width: "100%", // fill the form container
            padding: "8px",
            marginBottom: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        /> */}

        <button
          type="submit"
          style={{
            background: "#27ae60",
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background 0.3s ease",
            alignSelf: "flex-start", 
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#2ecc71";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#27ae60";
          }}
        >
          Create
        </button>
      </div>
    </form>
  );
}
