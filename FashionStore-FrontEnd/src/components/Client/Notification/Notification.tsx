import React, { useState } from "react";
import {
  Badge,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Divider,
  Box,
  ListItemAvatar,
  Avatar,
  Chip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

import { Container, Row, Col } from "react-bootstrap";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  timestamp: string;
  isRead: boolean;
  priority?: "high" | "medium" | "low";
}

const notificationData: Notification[] = [
  {
    id: 1,
    title: "Đặt hàng thành công",
    message:
      "Đơn hàng #12345 của bạn đã được đặt thành công. Chúng tôi sẽ xử lý đơn hàng trong thời gian sớm nhất.",
    type: "success",
    timestamp: "2025-05-22 10:45",
    isRead: false,
    priority: "high",
  },
  {
    id: 2,
    title: "Đơn hàng đang được xử lý",
    message:
      "Đơn hàng #12345 của bạn đang được chuẩn bị và sẽ được giao trong 2-3 ngày tới.",
    type: "info",
    timestamp: "2025-05-21 15:30",
    isRead: false,
    priority: "medium",
  },
  {
    id: 3,
    title: "Ưu đãi đặc biệt",
    message:
      "Giảm giá 20% cho tất cả sản phẩm handmade trong tuần này. Sử dụng mã UTE20 để nhận ưu đãi.",
    type: "info",
    timestamp: "2025-05-20 09:15",
    isRead: true,
    priority: "high",
  },
  {
    id: 4,
    title: "Lỗi thanh toán",
    message:
      "Có vấn đề với phương thức thanh toán của bạn. Vui lòng kiểm tra lại thông tin thẻ hoặc chọn phương thức khác.",
    type: "error",
    timestamp: "2025-05-19 14:20",
    isRead: true,
    priority: "high",
  },
  {
    id: 5,
    title: "Cảnh báo hết hàng",
    message:
      "Sản phẩm 'Vòng tay handmade' yêu thích của bạn chỉ còn 2 sản phẩm trong kho. Hãy nhanh tay đặt hàng!",
    type: "warning",
    timestamp: "2025-05-18 11:45",
    isRead: true,
    priority: "medium",
  },
  {
    id: 6,
    title: "Đơn hàng đã được giao",
    message:
      "Đơn hàng #12340 đã được giao thành công. Cảm ơn bạn đã tin tưởng và ủng hộ UTE Store!",
    type: "success",
    timestamp: "2025-05-17 16:30",
    isRead: true,
    priority: "medium",
  },
  {
    id: 7,
    title: "Sự kiện sắp diễn ra",
    message:
      "Triển lãm handmade UTE sẽ diễn ra vào ngày 25/05/2023. Đăng ký tham gia ngay để nhận quà tặng đặc biệt!",
    type: "info",
    timestamp: "2025-05-16 13:10",
    isRead: true,
    priority: "high",
  },
  {
    id: 8,
    title: "Xác nhận đánh giá",
    message:
      "Cảm ơn bạn đã đánh giá sản phẩm gần đây. Đánh giá của bạn rất quan trọng với chúng tôi!",
    type: "success",
    timestamp: "2025-05-15 10:25",
    isRead: true,
    priority: "low",
  },
  {
    id: 9,
    title: "Cập nhật tài khoản",
    message:
      "Thông tin tài khoản của bạn đã được cập nhật thành công. Bạn có thể sử dụng thông tin mới ngay bây giờ.",
    type: "info",
    timestamp: "2025-05-14 09:50",
    isRead: true,
    priority: "low",
  },
  {
    id: 10,
    title: "Phản hồi yêu cầu hỗ trợ",
    message:
      "Chúng tôi đã phản hồi yêu cầu hỗ trợ #57890 của bạn. Vui lòng kiểm tra email để xem chi tiết.",
    type: "success",
    timestamp: "2025-05-13 14:15",
    isRead: true,
    priority: "medium",
  },
];

const Notification: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon color="success" />;
      case "error":
        return <ErrorIcon color="error" />;
      case "warning":
        return <WarningIcon color="warning" />;
      case "info":
      default:
        return <InfoIcon color="info" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "#ff4d4f";
      case "medium":
        return "#faad14";
      case "low":
        return "#52c41a";
      default:
        return "#d9d9d9";
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "notification-popover" : undefined;
  const unreadCount = notificationData.filter(
    (notification) => !notification.isRead
  ).length;

  const primaryColor = "#6366f1";
  const accentColor = "#f59e0b";
  const darkTextColor = "#1f2937";
  const lightTextColor = "#ffffff";
  const gradientEnd = "#4f46e5";

  const notificationBgColor = "#f8fafc";
  const notificationHeaderBg = "#ffffff";
  const notificationBorderColor = "#e2e8f0";
  const notificationHoverColor = "#f1f5f9";
  const notificationUnreadBg = "#eff6ff";
  const notificationTextColor = "#475569";
  const notificationTitleColor = "#0f172a";
  const notificationTimeColor = "#64748b";

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-end">
          <IconButton
            aria-describedby={id}
            onClick={handleClick}
            size="large"
            aria-label="show notifications"
            sx={{
              color: lightTextColor,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              },
            }}
          >
            <Badge
              badgeContent={unreadCount}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: accentColor,
                  color: darkTextColor,
                  fontWeight: "bold",
                  border: `2px solid ${gradientEnd}`,
                  borderRadius: "50%",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                },
              }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                width: { xs: "90vw", sm: "500px" },
                maxHeight: "70vh",
                overflow: "auto",
                borderRadius: "16px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                border: `1px solid ${notificationBorderColor}`,
                backgroundColor: notificationBgColor,
              },
            }}
          >
            <Box
              sx={{
                p: 2,
                backgroundColor: notificationHeaderBg,
                borderBottom: `1px solid ${notificationBorderColor}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "16px 16px 0 0",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                color={notificationTitleColor}
              >
                Thông báo
              </Typography>
              <Chip
                label={`${unreadCount} chưa đọc`}
                size="small"
                sx={{
                  backgroundColor: notificationUnreadBg,
                  color: primaryColor,
                  fontWeight: "medium",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              />
            </Box>

            <List sx={{ p: 0 }}>
              {notificationData.map((notification) => (
                <React.Fragment key={notification.id}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      p: 1.5,
                      bgcolor: notification.isRead
                        ? notificationBgColor
                        : notificationUnreadBg,
                      "&:hover": {
                        bgcolor: notificationHoverColor,
                        transform: "translateX(4px)",
                        transition: "all 0.2s ease",
                      },
                      transition: "all 0.2s ease",
                      borderLeft: `3px solid ${getPriorityColor(
                        notification.priority
                      )}`,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: "transparent",
                          width: 32,
                          height: 32,
                          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                        }}
                      >
                        {getNotificationIcon(notification.type)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 0.5,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight="600"
                            color={notificationTitleColor}
                          >
                            {notification.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            color={notificationTimeColor}
                            sx={{ ml: 1, whiteSpace: "nowrap" }}
                          >
                            {notification.timestamp}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          color={notificationTextColor}
                          sx={{ mt: 0.5 }}
                        >
                          {notification.message}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider
                    variant="inset"
                    component="li"
                    sx={{ borderColor: notificationBorderColor }}
                  />
                </React.Fragment>
              ))}
            </List>

            <Box
              sx={{
                p: 2,
                backgroundColor: notificationHeaderBg,
                borderTop: `1px solid ${notificationBorderColor}`,
                textAlign: "center",
                borderRadius: "0 0 16px 16px",
              }}
            >
              <Button
                variant="contained"
                fullWidth
                sx={{
                  textTransform: "none",
                  background: `linear-gradient(135deg, ${primaryColor} 0%, ${gradientEnd} 100%)`,
                  color: lightTextColor,
                  fontWeight: "600",
                  borderRadius: "12px",
                  py: 1.2,
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)",
                  "&:hover": {
                    background: `linear-gradient(135deg, ${gradientEnd} 0%, ${primaryColor} 100%)`,
                    boxShadow: "0 6px 16px rgba(99, 102, 241, 0.3)",
                  },
                }}
              >
                Xem tất cả thông báo
              </Button>
            </Box>
          </Popover>
        </Col>
      </Row>
    </Container>
  );
};

export default Notification;
