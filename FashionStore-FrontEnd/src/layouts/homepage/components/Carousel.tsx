import React from "react";

const Carousel: React.FC = () => {
  return (
    <div className="container-fluid mb-3">
      <div className="row px-xl-5">
        {/* Carousel */}
        <div className="col-lg-8">
          <div
            id="header-carousel"
            className="carousel slide carousel-fade mb-30 mb-lg-0"
            data-bs-ride="carousel"
          >
            {/* Indicators */}
            <ol className="carousel-indicators">
              <li
                data-bs-target="#header-carousel"
                data-bs-slide-to="0"
                className="active"
              ></li>
              <li data-bs-target="#header-carousel" data-bs-slide-to="1"></li>
              <li data-bs-target="#header-carousel" data-bs-slide-to="2"></li>
            </ol>

            {/* Carousel Items */}
            <div className="carousel-inner">
              {/* Slide 1 */}
              <div
                className="carousel-item position-relative active"
                style={{ height: 430 }}
              >
                <img
                  className="position-absolute w-100 h-100"
                  src="./images/carousel-1.jpg"
                  style={{ objectFit: "cover" }}
                  alt="Men Fashion"
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: 700 }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                      Men Fashion
                    </h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                      Lorem rebum magna amet lorem magna erat diam stet. Sadips
                      duo stet amet amet ndiam elitr ipsum diam.
                    </p>
                    <a
                      className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                      href="#"
                    >
                      Xem Ngay
                    </a>
                  </div>
                </div>
              </div>

              {/* Slide 2 */}
              <div
                className="carousel-item position-relative"
                style={{ height: 430 }}
              >
                <img
                  className="position-absolute w-100 h-100"
                  src="./images/carousel-2.jpg"
                  style={{ objectFit: "cover" }}
                  alt="Women Fashion"
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: 700 }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                      Women Fashion
                    </h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                      Lorem rebum magna amet lorem magna erat diam stet. Sadips
                      duo stet amet amet ndiam elitr ipsum diam.
                    </p>
                    <a
                      className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                      href="#"
                    >
                      Xem Ngay
                    </a>
                  </div>
                </div>
              </div>

              {/* Slide 3 */}
              <div
                className="carousel-item position-relative"
                style={{ height: 430 }}
              >
                <img
                  className="position-absolute w-100 h-100"
                  src="./images/carousel-3.jpg"
                  style={{ objectFit: "cover" }}
                  alt="Kids Fashion"
                />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: 700 }}>
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                      Kids Fashion
                    </h1>
                    <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                      Lorem rebum magna amet lorem magna erat diam stet. Sadips
                      duo stet amet amet ndiam elitr ipsum diam.
                    </p>
                    <a
                      className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                      href="#"
                    >
                      Xem Ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offers */}
        <div className="col-lg-4">
          <div className="product-offer mb-30" style={{ height: 200 }}>
            <img
              className="img-fluid"
              src="./images/offer-1.jpg"
              alt="Offer 1"
            />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Giảm giá 20%</h6>
              <h3 className="text-white mb-3">Ưu Đãi Đặc Biệt</h3>
              <a href="#" className="btn btn-primary">
                Xem Ngay
              </a>
            </div>
          </div>
          <div className="product-offer mb-30" style={{ height: 200 }}>
            <img
              className="img-fluid"
              src="./images/offer-2.jpg"
              alt="Offer 2"
            />
            <div className="offer-text">
              <h6 className="text-white text-uppercase">Giảm giá 20%</h6>
              <h3 className="text-white mb-3">Ưu Đãi Đặc Biệt</h3>
              <a href="#" className="btn btn-primary">
                Xem Ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
