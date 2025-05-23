import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

interface User {
  id: number;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: Date;
}

interface UserListPanelProps {
  users: User[];
  selectedUserId?: number;
  onSelectUser: (userId: number) => void;
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

const StyledListItem = styled(ListItem)<{ selected?: boolean }>(
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

const UserListPanel: React.FC<UserListPanelProps> = ({
  users,
  selectedUserId,
  onSelectUser,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatLastMessageTime = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
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
            onClick={() => onSelectUser(user.id)}
            button
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
  );
};

export default UserListPanel;
