import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  TextField,
  Paper,
  Typography,
  Slide,
} from "@mui/material";
import { Send as SendIcon, Chat as ChatIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface Message {
  id: number;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

const ChatContainer = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "320px",
  height: "450px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
  backgroundColor: "#fff",
  zIndex: 1000,
  [theme.breakpoints.down("sm")]: {
    width: "calc(100% - 32px)",
    height: "calc(100% - 100px)",
    right: "16px",
    bottom: "70px",
  },
}));

const ChatHeader = styled(Box)({
  padding: "12px 16px",
  background: "linear-gradient(135deg, #FF4081 0%, #F50057 100%)",
  color: "#fff",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const MessagesContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  backgroundColor: "#f8f9fa",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#c1c1c1",
    borderRadius: "10px",
  },
});

const MessageWrapper = styled(Box)<{ isUser: boolean }>(({ isUser }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: isUser ? "flex-end" : "flex-start",
  width: "100%",
  paddingRight: isUser ? "0" : "20%",
  paddingLeft: isUser ? "20%" : "0",
}));

const MessageBubble = styled(Box)<{ isUser: boolean }>(({ isUser }) => ({
  maxWidth: "100%",
  padding: "10px 14px",
  borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
  background: isUser
    ? "linear-gradient(135deg, #FF4081 0%, #F50057 100%)"
    : "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
  color: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  fontSize: "0.9rem",
  lineHeight: "1.4",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "0",
    width: "12px",
    height: "12px",
    background: isUser
      ? "linear-gradient(135deg, #FF4081 0%, #F50057 100%)"
      : "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
    clipPath: isUser
      ? "polygon(0 0, 100% 100%, 0 100%)"
      : "polygon(0 0, 100% 0, 0 100%)",
    transform: isUser ? "translateX(100%)" : "translateX(-100%)",
  },
}));

const MessageTime = styled(Typography)<{ isUser: boolean }>(({ isUser }) => ({
  fontSize: "0.7rem",
  color: isUser ? "#F50057" : "#1976D2",
  marginTop: "2px",
  textAlign: isUser ? "right" : "left",
  padding: "0 4px",
  fontWeight: 500,
}));

const InputContainer = styled(Box)({
  padding: "12px",
  borderTop: "1px solid #e2e8f0",
  display: "flex",
  gap: "8px",
  backgroundColor: "#fff",
});

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

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8f9fa",
    "& fieldset": {
      borderColor: "#e2e8f0",
    },
    "&:hover fieldset": {
      borderColor: "#FF4081",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF4081",
    },
  },
});

const UserChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addAutoReply = () => {
    const autoReply: Message = {
      id: Date.now() + 1,
      text: "Chào bạn, hội sinh viên sẽ trả lời trong ít phút. Cảm ơn bạn đã liên hệ!",
      timestamp: new Date(),
      isUser: false,
    };
    setMessages((prev) => [...prev, autoReply]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now(),
        text: newMessage.trim(),
        timestamp: new Date(),
        isUser: true,
      };
      setMessages((prev) => [...prev, message]);
      setNewMessage("");

      // Add auto-reply after a short delay
      setTimeout(addAutoReply, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <FloatingButton onClick={() => setIsOpen(!isOpen)}>
        <ChatIcon />
      </FloatingButton>

      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <ChatContainer>
          <ChatHeader>
            <ChatIcon sx={{ fontSize: "1.2rem" }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Chat với Admin UTE
            </Typography>
          </ChatHeader>

          <MessagesContainer>
            {messages.map((message) => (
              <MessageWrapper key={message.id} isUser={message.isUser}>
                <MessageBubble isUser={message.isUser}>
                  {message.text}
                </MessageBubble>
                <MessageTime isUser={message.isUser}>
                  {formatTimestamp(message.timestamp)}
                </MessageTime>
              </MessageWrapper>
            ))}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <InputContainer>
            <StyledTextField
              fullWidth
              variant="outlined"
              placeholder="Nhập tin nhắn..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              size="small"
            />
            <IconButton
              sx={{
                background: "linear-gradient(135deg, #FF4081 0%, #F50057 100%)",
                color: "#fff",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #F50057 0%, #C51162 100%)",
                },
              }}
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <SendIcon sx={{ fontSize: "1.2rem" }} />
            </IconButton>
          </InputContainer>
        </ChatContainer>
      </Slide>
    </>
  );
};

export default UserChatBox;
