import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  IconButton,
  Stack,
  InputAdornment,
} from "@mui/material";
import {
  LocationOn,
  Email,
  Phone,
  Twitter,
  Facebook,
  LinkedIn,
  Instagram,
  ArrowUpward,
  ChevronRight,
} from "@mui/icons-material";

const accentColor = "#FFD600";

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#181A20",
        color: "#b0b3b8",
        pt: 6,
        mt: 2,
        fontSize: 16,
      }}
      component="footer"
    >
      <Container maxWidth="xl">
        <div className="row">
          {/* Liên hệ */}
          <div className="col-12 col-md-4 mb-4">
            <Typography
              variant="h6"
              sx={{ color: accentColor, mb: 2, textTransform: "uppercase" }}
            >
              Liên hệ ngay
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Hiếu Store là cửa hàng chuyên cung cấp các sản phẩm thời trang
              nam, nữ, trẻ em, giày dép, phụ kiện, mỹ phẩm, đồ gia dụng, đồ điện
              tử, đồ chơi, sách vở, thực phẩm, đồ uống, ...
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 1 }}
            >
              <LocationOn sx={{ color: accentColor }} />
              <Typography>
                48 Cao Thắng, Thanh Bình, Hải Châu, Đà Nẵng 550000
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 1 }}
            >
              <Email sx={{ color: accentColor }} />
              <Typography>Võ Nguyễn Đại Hiếu</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Phone sx={{ color: accentColor }} />
              <Typography>+012 345 67890</Typography>
            </Stack>
          </div>

          {/* My Account */}
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <Typography
              variant="h6"
              sx={{ color: accentColor, mb: 2, textTransform: "uppercase" }}
            >
              My Account
            </Typography>
            <Stack spacing={1}>
              {[
                { label: "Trang Chủ", href: "#" },
                { label: "Chi Tiết Sản Phẩm", href: "#" },
                { label: "Giỏ Hàng", href: "#" },
                { label: "Thanh Toán", href: "#" },
                { label: "Liên Hệ", href: "#" },
              ].map((item) => (
                <Button
                  key={item.label}
                  href={item.href}
                  startIcon={<ChevronRight />}
                  sx={{
                    color: "#b0b3b8",
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { color: accentColor, bgcolor: "transparent" },
                  }}
                  variant="text"
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </div>

          {/* Newsletter & Social */}
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <Typography
              variant="h6"
              sx={{ color: accentColor, mb: 2, textTransform: "uppercase" }}
            >
              Newsletter
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Đăng ký nhận thông tin ưu đãi và sản phẩm mới nhất từ chúng tôi!
            </Typography>
            <Box component="form" sx={{ mb: 2 }}>
              <TextField
                variant="outlined"
                placeholder="Your Email Address"
                size="small"
                fullWidth
                sx={{
                  bgcolor: "#23272f",
                  borderRadius: 1,
                  input: { color: "#fff" },
                  mb: 1,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          bgcolor: accentColor,
                          color: "#222",
                          fontWeight: 700,
                          borderRadius: 1,
                          px: 2,
                          "&:hover": { bgcolor: "#fff176" },
                        }}
                      >
                        Đăng ký
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Typography
              variant="subtitle2"
              sx={{ color: accentColor, mb: 1, textTransform: "uppercase" }}
            >
              Follow Us
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton
                href="#"
                sx={{
                  bgcolor: "#23272f",
                  color: "#1DA1F2",
                  "&:hover": { bgcolor: accentColor, color: "#222" },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  bgcolor: "#23272f",
                  color: "#1877F3",
                  "&:hover": { bgcolor: accentColor, color: "#222" },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  bgcolor: "#23272f",
                  color: "#0A66C2",
                  "&:hover": { bgcolor: accentColor, color: "#222" },
                }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                href="#"
                sx={{
                  bgcolor: "#23272f",
                  color: "#E4405F",
                  "&:hover": { bgcolor: accentColor, color: "#222" },
                }}
              >
                <Instagram />
              </IconButton>
            </Stack>
          </div>
        </div>

        {/* Payment & Copyright */}
        <div
          className="row border-top mt-5 pt-3"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="col-12 col-md-6 text-center text-md-left mb-2 mb-md-0">
            <Typography variant="body2" sx={{ color: "#888" }}>
              © {new Date().getFullYear()} Hiếu Store. All rights reserved.
            </Typography>
          </div>
          <div className="col-12 col-md-6 text-center text-md-right">
            <Box
              component="img"
              src="/img/payments.png"
              alt="Payments"
              sx={{ height: 32, mt: { xs: 2, md: 0 } }}
            />
          </div>
        </div>
      </Container>

      {/* Back to top button */}
      <IconButton
        href="#"
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          bgcolor: accentColor,
          color: "#222",
          boxShadow: 3,
          "&:hover": { bgcolor: "#fff176" },
        }}
        size="large"
      >
        <ArrowUpward />
      </IconButton>
    </Box>
  );
}

export default Footer;
