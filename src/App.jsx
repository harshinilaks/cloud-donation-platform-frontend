import DropZoneForm from "./DropZoneForm";
import DonationUpload from "./DonationUpload";
import DropZoneList from "./DropZoneList";

export default function App() {
  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      minHeight: "100vh",
      width: "100vw",
      background: "#e9d5ff",
      padding: "40px",
      overflowX: "hidden"
    }}>
      <header style={{
        textAlign: "center",
        marginBottom: "40px"
      }}>
        <h1 style={{
          fontSize: "3em",
          color: "#7c3aed"
        }}>
          ReliefDrop Dashboard
        </h1>
      </header>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        gap: "20px",
      }}>
        <div style={{
          flex: 1,
          padding: "20px"
        }}>
          <DropZoneForm />
          <DonationUpload />
        </div>
        <div style={{
          flex: 2,
          maxWidth: "400px",   // ✅ add this
          padding: "20px"
        }}>
          <DropZoneList />
        </div>
      </div>
    </div>
  );
}
