import { useEffect } from "react";

const Trademark: React.FC = () => {
  useEffect(() => {
    const track = document.querySelector(".carousel-track") as HTMLElement;

    let scrollAmount = 0;
    const speed = 1; // Tốc độ trượt

    const autoSlide = setInterval(() => {
      scrollAmount -= speed;
      track.style.transform = `translateX(${scrollAmount}px)`;

      // Khi trượt hết hình thì reset lại
      if (Math.abs(scrollAmount) >= track.scrollWidth / 2) {
        scrollAmount = 0;
        track.style.transform = `translateX(0)`;
      }
    }, 20); // Càng nhỏ thì trượt càng mượt

    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        padding: "20px 0",
        backgroundColor: "#f8f9fa",
      }}
    >
      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <div
          className="carousel-track"
          style={{
            display: "flex",
            width: "max-content",
            whiteSpace: "nowrap",
            transition: "transform 0.1s linear",
          }}
        >
          {/* Lặp lại hình ảnh 2 lần để tạo hiệu ứng trượt vô tận */}
          {[
            "/images/vendor-1.jpg",
            "/images/vendor-2.jpg",
            "/images/vendor-3.jpg",
            "/images/vendor-4.jpg",
            "/images/vendor-5.jpg",
            "/images/vendor-6.jpg",
            "/images/vendor-7.jpg",
            "/images/vendor-8.jpg",
          ].map((src, index) => (
            <div
              key={index}
              className="carousel-slide"
              style={{
                flex: "0 0 auto",
                marginRight: "10px",
              }}
            >
              <img
                src={src}
                alt={`Vendor ${index + 1}`}
                style={{
                  width: "150px", // Kích thước ảnh
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}
          {/* Nhân đôi danh sách ảnh để trượt vô tận */}
          {[
            "/images/vendor-1.jpg",
            "/images/vendor-2.jpg",
            "/images/vendor-3.jpg",
            "/images/vendor-4.jpg",
            "/images/vendor-5.jpg",
            "/images/vendor-6.jpg",
            "/images/vendor-7.jpg",
            "/images/vendor-8.jpg",
          ].map((src, index) => (
            <div
              key={index + 8}
              className="carousel-slide"
              style={{
                flex: "0 0 auto",
                marginRight: "10px",
              }}
            >
              <img
                src={src}
                alt={`Vendor ${index + 1}`}
                style={{
                  width: "150px", // Kích thước ảnh
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trademark;
