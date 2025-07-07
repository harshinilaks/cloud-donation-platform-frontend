import DropZoneForm from "./DropZoneForm";
import DonationUpload from "./DonationUpload";
import DropZoneList from "./DropZoneList";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        width: "100%",
        background: "#e9d5ff",
        padding: "40px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <header
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "3em",
            color: "#7c3aed",
          }}
        >
          ReliefDrop Dashboard
        </h1>
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* LEFT COLUMN */}
        <div
          style={{
            flex: "0 0 420px", // ✅ fixed width for the left column
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <DropZoneForm />
          <DonationUpload />
        </div>

        {/* RIGHT COLUMN */}
        <div
          style={{
            flex: "1 1 auto",
            minWidth: "300px",
            maxWidth: "600px",
          }}
        >
          <DropZoneList />
        </div>
      </div>
    </div>
  );
}
