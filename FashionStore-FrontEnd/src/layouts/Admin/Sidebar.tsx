import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton, // Thêm ListItemButton
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import {
  Dashboard as DashboardIcon,
  Laptop as LaptopIcon,
  Widgets as WidgetsIcon,
  TableChart as TableChartIcon,
  BarChart as BarChartIcon,
  Description as DescriptionIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <Drawer
      variant="persistent"
      open={isOpen}
      sx={{
        width: isOpen ? 250 : 0,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 250,
          backgroundColor: "#2D3748",
          color: "#ffffff",
          borderRight: "none",
          transition: "width 0.3s",
          overflowX: "hidden",
        },
      }}
    >
      <Box sx={{ padding: "16px" }}>
        {/* Logo và Brand */}
        <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar sx={{ bgcolor: "#EF4444", mr: 1 }}>
              <i className="fa fa-user-edit"></i>
            </Avatar>
            <Typography
              variant="h6"
              sx={{ color: "#EF4444", fontWeight: "bold" }}
            >
              ADMIN
            </Typography>
          </Box>
        </Link>

        <Divider sx={{ bgcolor: "#4B5563", mb: 2 }} />

        {/* Các mục điều hướng */}
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin"
              sx={{
                borderRadius: "50px",
                mb: 1,
                "&:hover": {
                  backgroundColor: "#EF4444",
                  "& .MuiListItemIcon-root": {
                    color: "#ffffff",
                  },
                },
                "&.Mui-selected": {
                  backgroundColor: "#EF4444",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#A0AEC0", minWidth: 40 }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Quản Lý Tổng Quan" />
            </ListItemButton>
          </ListItem>

          {/* Quá trình bán hàng*/}
          <Accordion
            sx={{
              backgroundColor: "transparent",
              color: "#ffffff",
              boxShadow: "none",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#A0AEC0" }} />}
              sx={{
                borderRadius: "50px",
                "&:hover": {
                  backgroundColor: "#EF4444",
                  "& .MuiListItemIcon-root": {
                    color: "#ffffff",
                  },
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    color: "#ffffff",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "#A0AEC0", minWidth: 40 }}>
                <LaptopIcon />
              </ListItemIcon>
              <ListItemText primary="Quá Trình Bán Hàng" />
            </AccordionSummary>
            <AccordionDetails sx={{ pl: 5 }}>
              <List disablePadding>
                <ListItem
                  disablePadding
                  sx={{
                    color: "#A0AEC0",
                    "&:hover": {
                      color: "#EF4444",
                    },
                  }}
                >
                  <ListItemButton component={Link} to="/admin/orders">
                    <ListItemText primary="Đơn Hàng" />
                  </ListItemButton>
                </ListItem>

                <ListItem
                  disablePadding
                  sx={{
                    color: "#A0AEC0",
                    "&:hover": {
                      color: "#EF4444",
                    },
                  }}
                >
                  <ListItemButton component={Link} to="/admin/products">
                    <ListItemText primary="Danh sách sản phẩm" />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Tiện ích */}
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/vouchers"
              sx={{
                borderRadius: "50px",
                mb: 1,
                "&:hover": {
                  backgroundColor: "#EF4444",
                  "& .MuiListItemIcon-root": {
                    color: "#ffffff",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "#A0AEC0", minWidth: 40 }}>
                <WidgetsIcon />
              </ListItemIcon>
              <ListItemText primary="Voucher" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/user"
              sx={{
                borderRadius: "50px",
                mb: 1,
                "&:hover": {
                  backgroundColor: "#EF4444",
                  "& .MuiListItemIcon-root": {
                    color: "#ffffff",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "#A0AEC0", minWidth: 40 }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Thanh toán tiền hoa hồng" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/user"
              sx={{
                borderRadius: "50px",
                mb: 1,
                "&:hover": {
                  backgroundColor: "#EF4444",
                  "& .MuiListItemIcon-root": {
                    color: "#ffffff",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "#A0AEC0", minWidth: 40 }}>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="Người Dùng" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/admin/charts"
              sx={{
                borderRadius: "50px",
                mb: 1,
                "&:hover": {
                  backgroundColor: "#EF4444",
                  "& .MuiListItemIcon-root": {
                    color: "#ffffff",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "#A0AEC0", minWidth: 40 }}>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Biểu đồ thống kê" />
            </ListItemButton>
          </ListItem>

          {/* Pages
           */}
          <Accordion
            sx={{
              backgroundColor: "transparent",
              color: "#ffffff",
              boxShadow: "none",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#A0AEC0" }} />}
              sx={{
                borderRadius: "50px",
                "&:hover": {
                  backgroundColor: "#EF4444",
                  "& .MuiListItemIcon-root": {
                    color: "#ffffff",
                  },
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    color: "#ffffff",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "#A0AEC0", minWidth: 40 }}>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Pages" />
            </AccordionSummary>
            <AccordionDetails sx={{ pl: 5 }}>
              <List disablePadding>
                <ListItem
                  disablePadding
                  sx={{
                    color: "#A0AEC0",
                    "&:hover": {
                      color: "#EF4444",
                    },
                  }}
                >
                  <ListItemButton component={Link} to="/register">
                    <ListItemText primary="Đăng Kí" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{
                    color: "#A0AEC0",
                    "&:hover": {
                      color: "#EF4444",
                    },
                  }}
                >
                  <ListItemButton component={Link} to="/login">
                    <ListItemText primary="Đăng nhập tài khoản khác" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{
                    color: "#A0AEC0",
                    "&:hover": {
                      color: "#EF4444",
                    },
                  }}
                >
                  <ListItemButton component={Link} to="/admin/404">
                    <ListItemText primary="404 Error" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{
                    color: "#A0AEC0",
                    "&:hover": {
                      color: "#EF4444",
                    },
                  }}
                >
                  <ListItemButton component={Link} to="/admin/blank">
                    <ListItemText primary="Blank Page" />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
