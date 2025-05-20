import React, { useState } from "react";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    img: "/images/carousel-1.jpg",
    title: "UTE STORE",
    desc: "Nền tảng mua sắm trực tuyến dành riêng cho sinh viên UTE, nơi bạn tìm thấy những sản phẩm handmade độc đáo và sáng tạo.",
    alt: "UTE Store",
  },
  {
    img: "/images/carousel-2.jpg",
    title: "Sản phẩm Handmade",
    desc: "Khám phá bộ sưu tập các sản phẩm thủ công tinh tế, do chính các bạn sinh viên UTE tạo ra với tâm huyết và sáng tạo.",
    alt: "Handmade products",
  },
  {
    img: "/images/carousel-3.jpg",
    title: "Hỗ trợ Sinh viên",
    desc: "Ưu đãi và chương trình đặc biệt dành riêng cho sinh viên trường UTE, giúp bạn mua sắm dễ dàng và tiết kiệm hơn.",
    alt: "UTE student support",
  },
];

const Carousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (i: number) => setIndex(i);

  return (
    <div className="container-fluid mb-3">
      <div className="row px-xl-5">
        {/* Carousel */}
        <div className="col-lg-8">
          <Box
            sx={{
              position: "relative",
              height: 430,
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={slides[index].img}
                src={slides[index].img}
                alt={slides[index].alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                }}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7 }}
              />
            </AnimatePresence>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(0,0,0,0.45)",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                style={{ width: "100%", maxWidth: 700, textAlign: "center" }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    mb: 2,
                    textShadow: "0 4px 24px #000",
                  }}
                >
                  {slides[index].title}
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    mb: 3,
                    px: 5,
                    textShadow: "0 2px 8px #000",
                  }}
                >
                  {slides[index].desc}
                </Typography>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#fff",
                      borderColor: "#fff",
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      fontSize: 18,
                      "&:hover": {
                        bgcolor: "#fff",
                        color: "#222",
                        borderColor: "#fff",
                      },
                    }}
                  >
                    Xem Ngay
                  </Button>
                </motion.div>
              </motion.div>
            </Box>
            {/* Indicators */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                position: "absolute",
                bottom: 24,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 3,
              }}
            >
              {slides.map((_, i) => (
                <Box
                  key={i}
                  onClick={() => handleSelect(i)}
                  sx={{
                    width: 24,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: i === index ? "#fff" : "rgba(255,255,255,0.4)",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </Stack>
          </Box>
        </div>
        {/* Offers */}
        <div className="col-lg-4">
          {[1, 2].map((offer, idx) => (
            <Paper
              key={idx}
              elevation={6}
              sx={{
                position: "relative",
                height: 200,
                mb: 3,
                overflow: "hidden",
                borderRadius: 3,
              }}
            >
              <img
                src={`/images/offer-${offer}.jpg`}
                alt={`Offer ${offer}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.7)",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    fontWeight: 700,
                  }}
                >
                  Giảm giá 20%
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#fff",
                    mb: 2,
                    fontWeight: 700,
                  }}
                >
                  Ưu Đãi Đặc Biệt
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#FFD600",
                    color: "#222",
                    fontWeight: 700,
                    px: 4,
                    "&:hover": { bgcolor: "#fff176" },
                  }}
                >
                  Xem Ngay
                </Button>
              </Box>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
