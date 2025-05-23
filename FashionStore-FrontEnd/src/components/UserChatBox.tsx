import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Chat as ChatIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import ChatBox, { Message } from "./common/ChatBox";

const FloatingButton = styled(IconButton)({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  background: "linear-gradient(135deg, #FF4081 0%, #F50057 100%)",
  color: "#fff",
  width: "48px",
  height: "48px",
  boxShadow: "0 4px 12px rgba(245, 0, 87, 0.3)",
  "&:hover": {
    background: "linear-gradient(135deg, #F50057 0%, #C51162 100%)",
    boxShadow: "0 6px 16px rgba(245, 0, 87, 0.4)",
  },
  zIndex: 1000,
  transition: "all 0.3s ease",
});

const UserChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const message: Message = {
      id: Date.now(),
      text,
      timestamp: new Date(),
      isUser: true,
    };
    setMessages((prev) => [...prev, message]);

    // Add auto-reply after a short delay
    setTimeout(() => {
      const autoReply: Message = {
        id: Date.now() + 1,
        text: "Chào bạn, hội sinh viên sẽ trả lời trong ít phút. Cảm ơn bạn đã liên hệ!",
        timestamp: new Date(),
        isUser: false,
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1000);
  };

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(!isOpen)}>
        <ChatIcon />
      </FloatingButton>

      <ChatBox
        messages={messages}
        onSendMessage={handleSendMessage}
        headerTitle="Chat với Admin UTE"
        headerIcon={<ChatIcon sx={{ fontSize: "1.2rem" }} />}
        isOpen={isOpen}
        userColor="#FF4081"
        adminColor="#2196F3"
      />
    </>
  );
};

export default UserChatBox;
