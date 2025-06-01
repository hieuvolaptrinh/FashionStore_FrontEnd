import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon, Send as SendIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface User {
  id: number;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: Date;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
}

const PanelContainer = styled(Paper)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
});

const SearchContainer = styled(Box)({
  padding: "16px",
  borderBottom: "1px solid #e2e8f0",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#f8f9fa",
    "& fieldset": {
      borderColor: "#e2e8f0",
    },
    "&:hover fieldset": {
      borderColor: "#2196F3",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2196F3",
    },
    "& input": {
      color: "#000",
    },
  },
});

const UserList = styled(List)({
  flex: 1,
  overflowY: "auto",
  padding: "8px",
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

const StyledListItem = styled(ListItemButton)<{ selected?: boolean }>(
  ({ selected }) => ({
    borderRadius: "12px",
    marginBottom: "4px",
    backgroundColor: selected ? "#e3f2fd" : "transparent",
    "&:hover": {
      backgroundColor: selected ? "#e3f2fd" : "#f5f5f5",
    },
    transition: "all 0.2s ease",
  })
);

const ChatContainer = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
  background: "linear-gradient(145deg, #6366f1 0%, #4f46e5 100%)",
});

const ChatHeader = styled(Box)({
  padding: "16px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  background: "rgba(255, 255, 255, 0.05)",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  color: "#fff",
});

const ChatMessages = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  background: "rgba(255, 255, 255, 0.02)",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: "rgba(255, 255, 255, 0.05)",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
  },
});

const MessageWrapper = styled(Box)<{ isUser: boolean }>(({ isUser }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: isUser ? "flex-start" : "flex-end",
  width: "100%",
  paddingRight: isUser ? "20%" : "0",
  paddingLeft: isUser ? "0" : "20%",
}));

const MessageBubble = styled(Box)<{ isUser: boolean }>(({ isUser }) => ({
  maxWidth: "100%",
  padding: "10px 14px",
  borderRadius: isUser ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
  background: isUser
    ? "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)"
    : "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
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
      ? "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)"
      : "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
    clipPath: isUser
      ? "polygon(0 0, 100% 0, 0 100%)"
      : "polygon(0 0, 100% 100%, 0 100%)",
    transform: isUser ? "translateX(-100%)" : "translateX(100%)",
  },
}));

const MessageTime = styled(Typography)<{ isUser: boolean }>(({ isUser }) => ({
  fontSize: "0.7rem",
  color: isUser ? "#ec4899" : "#818cf8",
  marginTop: "2px",
  textAlign: isUser ? "left" : "right",
  padding: "0 4px",
  fontWeight: 500,
  textShadow: "0 1px 2px rgba(0,0,0,0.1)",
}));

const ChatInput = styled(Box)({
  padding: "16px",
  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  background: "rgba(255, 255, 255, 0.05)",
  display: "flex",
  gap: "8px",
});

const UserListPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({
    1: [
      {
        id: 1,
        text: "Xin chào, tôi cần hỗ trợ về đơn hàng #12345",
        sender: "user",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: 2,
        text: "Chào bạn, tôi có thể giúp gì cho bạn?",
        sender: "admin",
        timestamp: new Date(Date.now() - 3500000),
      },
      {
        id: 3,
        text: "Tôi muốn hủy đơn hàng này",
        sender: "user",
        timestamp: new Date(Date.now() - 3400000),
      },
    ],
    2: [
      {
        id: 4,
        text: "Cảm ơn bạn đã hỗ trợ tôi hôm qua",
        sender: "user",
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: 5,
        text: "Không có gì ạ, rất vui được giúp đỡ bạn",
        sender: "admin",
        timestamp: new Date(Date.now() - 7100000),
      },
    ],
    3: [
      {
        id: 6,
        text: "Tôi có câu hỏi về đơn hàng",
        sender: "user",
        timestamp: new Date(Date.now() - 1800000),
      },
      {
        id: 7,
        text: "Vâng, bạn cứ hỏi",
        sender: "admin",
        timestamp: new Date(Date.now() - 1700000),
      },
      {
        id: 8,
        text: "Đơn hàng của tôi khi nào được giao?",
        sender: "user",
        timestamp: new Date(Date.now() - 1600000),
      },
      {
        id: 9,
        text: "Đơn hàng của bạn sẽ được giao trong 2-3 ngày tới",
        sender: "admin",
        timestamp: new Date(Date.now() - 1500000),
      },
    ],
  });
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "",
      lastMessage: "Tôi muốn hủy đơn hàng này",
      lastMessageTime: new Date(Date.now() - 3400000),
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "",
      lastMessage: "Không có gì ạ, rất vui được giúp đỡ bạn",
      lastMessageTime: new Date(Date.now() - 7100000),
    },
    {
      id: 3,
      name: "Lê Văn C",
      avatar: "",
      lastMessage: "Đơn hàng của bạn sẽ được giao trong 2-3 ngày tới",
      lastMessageTime: new Date(Date.now() - 1500000),
    },
  ]);

  useEffect(() => {
    const savedMessages = localStorage.getItem("adminChatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adminChatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedUserId]);

  const handleSendMessage = () => {
    if (!selectedUserId || !newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      text: newMessage.trim(),
      sender: "admin",
      timestamp: new Date(),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), message],
    }));

    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUserId
          ? {
              ...user,
              lastMessage: message.text,
              lastMessageTime: message.timestamp,
            }
          : user
      )
    );

    setNewMessage("");

    // Add auto-reply after a short delay
    setTimeout(() => {
      const autoReply: Message = {
        id: Date.now() + 1,
        text: "Dạ em cảm ơn",
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => ({
        ...prev,
        [selectedUserId]: [...(prev[selectedUserId] || []), autoReply],
      }));

      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUserId
            ? {
                ...user,
                lastMessage: autoReply.text,
                lastMessageTime: autoReply.timestamp,
              }
            : user
        )
      );
    }, 1000);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatMessageTime = (date: Date) => {
    return new Date(date).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatLastMessageTime = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <Box sx={{ width: "33.33%" }}>
        <PanelContainer>
          <SearchContainer>
            <StyledTextField
              fullWidth
              variant="outlined"
              placeholder="Tìm kiếm người dùng..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#94a3b8" }} />
                  </InputAdornment>
                ),
              }}
            />
          </SearchContainer>

          <UserList>
            {filteredUsers.map((user) => (
              <StyledListItem
                key={user.id}
                selected={user.id === selectedUserId}
                onClick={() => setSelectedUserId(user.id)}
              >
                <ListItemAvatar>
                  <Avatar src={user.avatar} alt={user.name}>
                    {user.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: user.id === selectedUserId ? 600 : 500,
                        color: "#1e293b",
                      }}
                    >
                      {user.name}
                    </Typography>
                  }
                  secondary={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#64748b",
                          fontSize: "0.8rem",
                          maxWidth: "70%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {user.lastMessage}
                      </Typography>
                      {user.lastMessageTime && (
                        <Typography
                          variant="caption"
                          sx={{ color: "#94a3b8", fontSize: "0.7rem" }}
                        >
                          {formatLastMessageTime(user.lastMessageTime)}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </StyledListItem>
            ))}
          </UserList>
        </PanelContainer>
      </Box>

      <ChatContainer>
        {selectedUserId ? (
          <>
            <ChatHeader>
              <Avatar
                src={users.find((u) => u.id === selectedUserId)?.avatar}
                alt={users.find((u) => u.id === selectedUserId)?.name}
                sx={{ border: "2px solid rgba(255, 255, 255, 0.2)" }}
              >
                {users.find((u) => u.id === selectedUserId)?.name.charAt(0)}
              </Avatar>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "#fff" }}
              >
                {users.find((u) => u.id === selectedUserId)?.name}
              </Typography>
            </ChatHeader>
            <ChatMessages>
              {messages[selectedUserId]?.map((message) => (
                <MessageWrapper
                  key={message.id}
                  isUser={message.sender === "user"}
                >
                  <MessageBubble isUser={message.sender === "user"}>
                    {message.text}
                  </MessageBubble>
                  <MessageTime isUser={message.sender === "user"}>
                    {formatMessageTime(message.timestamp)}
                  </MessageTime>
                </MessageWrapper>
              ))}
              <div ref={messagesEndRef} />
            </ChatMessages>
            <ChatInput>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#00BCD4",
                    },
                    "& input": {
                      color: "#fff",
                      "&::placeholder": {
                        color: "rgba(255, 255, 255, 0.5)",
                      },
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                sx={{
                  background:
                    "linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)",
                  color: "#fff",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0097A7 0%, #00796B 100%)",
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </ChatInput>
          </>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ color: "#fff" }}>
              Chọn một cuộc trò chuyện để bắt đầu
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.5)" }}
            >
              Danh sách người dùng đang chờ hỗ trợ sẽ hiển thị ở đây
            </Typography>
          </Box>
        )}
      </ChatContainer>
    </Box>
  );
};

export default UserListPanel;
