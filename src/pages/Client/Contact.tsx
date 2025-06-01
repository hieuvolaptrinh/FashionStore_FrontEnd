import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Stack,
} from "@mui/material";
import {
  LocationOn,
  Email,
  Phone,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  Send as SendIcon,
} from "@mui/icons-material";

const primaryColor = "#6ec1e4"; // xanh da trời nhạt
const accentColor = "#FFD600"; // vàng tươi
const bgColor = "#23272f"; // nền xám đen nhạt
const textColor = "#fff";
const subTextColor = "#b0b3b8";

const Contact = () => {
  return (
    <Box sx={{ bgcolor: bgColor, minHeight: "100vh", py: { xs: 4, md: 8 } }}>
      <div className="container">
        <Typography
          variant="h4"
          sx={{
            color: primaryColor,
            fontWeight: 700,
            mb: 1,
            textAlign: "center",
            letterSpacing: 1,
          }}
        >
          Liên hệ với UTE STORE
        </Typography>
        <Typography
          sx={{
            color: subTextColor,
            mb: 4,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Chúng tôi luôn sẵn sàng hỗ trợ sinh viên UTE và Đại học Sư phạm Kỹ
          thuật. Hãy liên hệ với chúng tôi nếu bạn có bất kỳ thắc mắc hoặc góp ý
          nào!
        </Typography>
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            p: { xs: 2, md: 4 },
            boxShadow: "0 8px 32px 0 rgba(110,193,228,0.15)",
            background: "#181A20",
            maxWidth: 1000,
            mx: "auto",
          }}
        >
          <div className="row">
            {/* Thông tin liên hệ */}
            <div className="col-12 col-md-5 mb-4 mb-md-0 d-flex align-items-center">
              <Box sx={{ width: "100%" }}>
                <Typography
                  variant="h6"
                  sx={{ color: accentColor, fontWeight: 700, mb: 2 }}
                >
                  Thông tin liên hệ
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <LocationOn sx={{ color: primaryColor }} />
                  <Typography sx={{ color: textColor }}>
                    48 Cao Thắng, Thanh Bình, Hải Châu, Đà Nẵng
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <Email sx={{ color: primaryColor }} />
                  <Typography sx={{ color: textColor }}>
                    utehandmade@ute.edu.vn
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <Phone sx={{ color: primaryColor }} />
                  <Typography sx={{ color: textColor }}>
                    0123 456 789
                  </Typography>
                </Stack>
                <Typography
                  sx={{ color: accentColor, fontWeight: 600, mt: 3, mb: 1 }}
                >
                  Kết nối với chúng tôi
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    href="#"
                    sx={{
                      bgcolor: "#23272f",
                      color: "#1877F3",
                      border: `2px solid ${primaryColor}`,
                      transition: "0.2s",
                      "&:hover": { bgcolor: primaryColor, color: bgColor },
                    }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    href="#"
                    sx={{
                      bgcolor: "#23272f",
                      color: "#E4405F",
                      border: `2px solid ${primaryColor}`,
                      transition: "0.2s",
                      "&:hover": { bgcolor: primaryColor, color: bgColor },
                    }}
                  >
                    <Instagram />
                  </IconButton>
                  <IconButton
                    href="#"
                    sx={{
                      bgcolor: "#23272f",
                      color: "#0A66C2",
                      border: `2px solid ${primaryColor}`,
                      transition: "0.2s",
                      "&:hover": { bgcolor: primaryColor, color: bgColor },
                    }}
                  >
                    <LinkedIn />
                  </IconButton>
                  <IconButton
                    href="#"
                    sx={{
                      bgcolor: "#23272f",
                      color: "#1DA1F2",
                      border: `2px solid ${primaryColor}`,
                      transition: "0.2s",
                      "&:hover": { bgcolor: primaryColor, color: bgColor },
                    }}
                  >
                    <Twitter />
                  </IconButton>
                </Stack>
              </Box>
            </div>
            {/* Form liên hệ */}
            <div className="col-12 col-md-7">
              <Box
                component="form"
                sx={{
                  bgcolor: "#23272f",
                  borderRadius: 3,
                  p: { xs: 2, md: 4 },
                  boxShadow: "0 4px 24px 0 rgba(110,193,228,0.10)",
                }}
                autoComplete="off"
              >
                <Typography
                  variant="h6"
                  sx={{ color: primaryColor, fontWeight: 700, mb: 2 }}
                >
                  Gửi liên hệ cho chúng tôi
                </Typography>
                <div className="row">
                  <div className="col-12 col-lg-6 mb-3">
                    <TextField
                      label="Họ và tên"
                      variant="outlined"
                      fullWidth
                      required
                      sx={{
                        bgcolor: bgColor,
                        borderRadius: 2,
                        input: { color: textColor },
                        label: { color: subTextColor },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: primaryColor },
                          "&:hover fieldset": { borderColor: accentColor },
                        },
                      }}
                    />
                  </div>
                  <div className="col-12 col-lg-6 mb-3">
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      type="email"
                      sx={{
                        bgcolor: bgColor,
                        borderRadius: 2,
                        input: { color: textColor },
                        label: { color: subTextColor },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: primaryColor },
                          "&:hover fieldset": { borderColor: accentColor },
                        },
                      }}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <TextField
                      label="Nội dung"
                      variant="outlined"
                      fullWidth
                      required
                      multiline
                      minRows={4}
                      sx={{
                        bgcolor: bgColor,
                        borderRadius: 2,
                        input: { color: textColor },
                        label: { color: subTextColor },
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderColor: primaryColor },
                          "&:hover fieldset": { borderColor: accentColor },
                        },
                      }}
                    />
                  </div>
                  <div className="col-12 text-end">
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      sx={{
                        bgcolor: primaryColor,
                        color: bgColor,
                        fontWeight: 700,
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        boxShadow: "0 2px 8px 0 rgba(110,193,228,0.15)",
                        textTransform: "none",
                        fontSize: 18,
                        transition: "0.2s",
                        "&:hover": { bgcolor: accentColor, color: bgColor },
                      }}
                    >
                      Gửi liên hệ
                    </Button>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </Paper>
      </div>
    </Box>
  );
};
export default Contact;
