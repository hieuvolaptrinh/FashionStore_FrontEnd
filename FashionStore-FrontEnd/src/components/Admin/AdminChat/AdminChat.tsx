import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import UserListPanel from "./UserListPanel";
import ChatBox from "../../common/ChatBox";

interface Message {
  id: number;
  text: string;
  sender: "user" | "admin";
  timestamp: Date;
}

interface User {
  id: number;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: Date;
}

const Container = styled(Paper)({
  height: "calc(100vh - 100px)",
  margin: "20px",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
});

const EmptyState = styled(Box)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f8f9fa",
  color: "#64748b",
});

const AdminChat: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [messages, setMessages] = useState<{ [key: number]: Message[] }>({});
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "",
      lastMessage: "Xin chào, tôi cần hỗ trợ",
      lastMessageTime: new Date(),
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "",
      lastMessage: "Cảm ơn bạn đã hỗ trợ",
      lastMessageTime: new Date(),
    },
    // Add more mock users as needed
  ]);

  useEffect(() => {
    // Load messages from localStorage when component mounts
    const savedMessages = localStorage.getItem("adminChatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    // Save messages to localStorage whenever they change
    localStorage.setItem("adminChatMessages", JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!selectedUserId) return;

    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "admin",
      timestamp: new Date(),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), newMessage],
    }));

    // Update user's last message
    setUsers((prev) =>
      prev.map((user) =>
        user.id === selectedUserId
          ? {
              ...user,
              lastMessage: text,
              lastMessageTime: new Date(),
            }
          : user
      )
    );
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  return (
    <Container>
      <Grid container sx={{ height: "100%" }}>
        <Grid item xs={12} md={4} sx={{ borderRight: "1px solid #e2e8f0" }}>
          <UserListPanel
            users={users}
            selectedUserId={selectedUserId}
            onSelectUser={handleSelectUser}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {selectedUserId ? (
            <ChatBox  
              messages={messages[selectedUserId] || []}
              onSendMessage={handleSendMessage}
              headerTitle={
                users.find((u) => u.id === selectedUserId)?.name || ""
              }
              userMessageColor="#e3f2fd"
              adminMessageColor="#f5f5f5"
            />
          ) : (
            <EmptyState>
              <Typography variant="h6" gutterBottom>
                Chọn một cuộc trò chuyện để bắt đầu
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Danh sách người dùng đang chờ hỗ trợ sẽ hiển thị ở đây
              </Typography>
            </EmptyState>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminChat;
