import React from "react";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import UserListPanel from "./UserListPanel";

const ChatWindow = styled(Paper)({
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "800px",
  height: "450px",
  margin: "0",
  borderRadius: "20px",
  overflow: "hidden",
  background: "linear-gradient(145deg, #6366f1 0%, #4f46e5 100%)",
  boxShadow:
    "0 10px 30px rgba(99, 102, 241, 0.2), 0 0 20px rgba(79, 70, 229, 0.1)",
  zIndex: 1001,
  border: "1px solid rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  "@media (max-width: 900px)": {
    width: "calc(100% - 32px)",
    height: "400px",
    bottom: "70px",
    right: "16px",
  },
});

const AdminChat: React.FC = () => {
  return (
    <ChatWindow
      sx={{
        "& .MuiPaper-root": {
          background: "transparent",
          boxShadow: "none",
        },
        "& .MuiList-root": {
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(5px)",
        },
        "& .MuiListItemButton-root": {
          color: "rgba(255, 255, 255, 0.9)",
          "&:hover": {
            background: "rgba(255, 255, 255, 0.15)",
          },
          "&.Mui-selected": {
            background: "rgba(255, 255, 255, 0.2)",
          },
        },
        "& .MuiTypography-root": {
          color: "rgba(255, 255, 255, 0.95)",
        },
        "& .MuiInputBase-root": {
          background: "rgba(255, 255, 255, 0.15)",
          color: "rgba(255, 255, 255, 0.95)",
          "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.3)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(255, 255, 255, 0.4)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#818cf8",
          },
        },
        "& .MuiInputBase-input": {
          color: "rgba(255, 255, 255, 0.95)",
          "&::placeholder": {
            color: "rgba(255, 255, 255, 0.6)",
          },
        },
        "& .MuiIconButton-root": {
          background: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
          color: "#fff",
          "&:hover": {
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          },
        },
      }}
    >
      <UserListPanel />
    </ChatWindow>
  );
};

export default AdminChat;
