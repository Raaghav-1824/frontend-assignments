import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  children: React.ReactNode;
  style?: React.CSSProperties; // Add this line to accept the style prop
}

export function BackButton({ children, style }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(-1)} // This navigates back in history
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 15px",
        borderRadius: "50px",
        backgroundColor: "#007bff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.2s",
        marginLeft:"1rem",
        ...style, // Apply custom style prop here
      }}
    >
      {children}
    </Button>
  );
}
