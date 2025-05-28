import React, { useState, useEffect, useRef } from "react";
import {
  IconButton,
  Badge,
  Paper,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Slide,
} from "@mui/material";
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Define Message interface
interface Message {
  id: number;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

// Interface for serialized message from localStorage
interface SerializedMessage {
  id: number;
  text: string;
  timestamp: string; // Date is serialized as string in JSON
  isUser: boolean;
}

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

const ChatContainer = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: "80px",
  right: "20px",
  width: "300px",
  height: "400px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "12px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
  [theme.breakpoints.down("sm")]: {
    width: "calc(100% - 32px)",
    height: "60vh",
    right: "16px",
    bottom: "70px",
  },
}));

const ChatHeader = styled(Box)({
  padding: "8px 12px",
  background: "linear-gradient(135deg, #FF4081 0%, #F50057 100%)",
  color: "#fff",
  borderTopLeftRadius: "12px",
  borderTopRightRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
});

const MessagesContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  backgroundColor: "#f8f9fa",
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#c1c1c1",
    borderRadius: "4px",
  },
});

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<{
  isUser: boolean;
}>(({ isUser }) => ({
  maxWidth: "85%",
  padding: "8px 12px",
  borderRadius: isUser ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
  background: isUser ? "#FF4081" : "#2196F3",
  color: "#fff",
  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  fontSize: "0.9rem",
  alignSelf: isUser ? "flex-end" : "flex-start",
  marginBottom: "4px",
  position: "relative",
}));

const TimeStamp = styled(Typography)({
  fontSize: "0.6rem",
  color: "#666",
  marginTop: "-2px",
  marginBottom: "8px",
  alignSelf: "flex-end",
});

const InputContainer = styled(Box)({
  padding: "8px",
  borderTop: "1px solid #eee",
});

// Initial welcome message from admin
const welcomeMessage: Message = {
  id: 1,
  text: "Xin chào! Tôi là trợ lý ảo của UTE. Bạn cần hỗ trợ gì?",
  timestamp: new Date(),
  isUser: false,
};

const UserChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      try {
        // Parse saved messages but convert timestamp strings back to Date objects
        const parsed = JSON.parse(savedMessages) as SerializedMessage[];
        return parsed.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
      } catch (e) {
        console.error("Error parsing saved messages", e);
        return [welcomeMessage];
      }
    }
    return [welcomeMessage];
  });

  // Save messages to localStorage when they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Xử lý focus khi click vào chat box
  const handleChatContainerClick = () => {
    inputRef.current?.focus();
  };

  // Reset unread count when chat is opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      // Focus input field when chat is opened
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: newMessage.trim(),
      timestamp: new Date(),
      isUser: true,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setNewMessage("");

    // Add auto-reply after a short delay
    setTimeout(() => {
      const autoReply: Message = {
        id: Date.now() + 1,
        text: "Cảm ơn bạn đã liên hệ! Admin sẽ trả lời trong ít phút.",
        timestamp: new Date(),
        isUser: false,
      };
      setMessages((prev) => [...prev, autoReply]);

      // Only increment unread count if chat is closed
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    }, 1000);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);

    if (today.toDateString() === messageDate.toDateString()) {
      return "Hôm nay";
    }

    return messageDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  return (
    <>
      <Badge
        color="error"
        badgeContent={unreadCount}
        invisible={unreadCount === 0}
        overlap="circular"
      >
        <FloatingButton onClick={toggleChat}>
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </FloatingButton>
      </Badge>

      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <ChatContainer
          onClick={handleChatContainerClick}
          ref={chatContainerRef}
        >
          <ChatHeader>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ChatIcon sx={{ fontSize: "1.2rem" }} />
              <Typography variant="subtitle2" fontWeight="medium">
                Chat với Admin UTE
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={toggleChat}
              sx={{ color: "white" }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </ChatHeader>

          <MessagesContainer onClick={() => inputRef.current?.focus()}>
            {messages.map((message, index) => {
              const showDate =
                index === 0 ||
                formatDate(messages[index - 1].timestamp) !==
                  formatDate(message.timestamp);

              return (
                <React.Fragment key={message.id}>
                  {showDate && (
                    <Box
                      sx={{
                        textAlign: "center",
                        my: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          bgcolor: "rgba(0,0,0,0.05)",
                          px: 2,
                          py: 0.5,
                          borderRadius: 10,
                          color: "text.secondary",
                        }}
                      >
                        {formatDate(message.timestamp)}
                      </Typography>
                    </Box>
                  )}
                  <MessageBubble isUser={message.isUser}>
                    {message.text}
                  </MessageBubble>
                  <TimeStamp
                    sx={{
                      alignSelf: message.isUser ? "flex-end" : "flex-start",
                    }}
                  >
                    {formatTime(message.timestamp)}
                  </TimeStamp>
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <InputContainer
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.focus();
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Nhập tin nhắn..."
              value={newMessage}
              onChange={(e) => {
                const value = e.target.value;
                console.log("Input value changed:", value);
                setNewMessage(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              onFocus={() => console.log("TextField focused")}
              onBlur={() => console.log("TextField blurred")}
              autoFocus={isOpen}
              size="small"
              inputRef={inputRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      edge="end"
                      size="small"
                    >
                      <SendIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: { borderRadius: "20px", pr: 0.5 },
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px" } }}
            />
          </InputContainer>
        </ChatContainer>
      </Slide>
    </>
  );
};

export default UserChatBox;
