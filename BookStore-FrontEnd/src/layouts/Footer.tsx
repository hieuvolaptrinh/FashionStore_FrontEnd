import React from "react";

function Footer() {
  return (
    <>
      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div className="row px-xl-5 pt-5">
          <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
            <h5 className="text-secondary text-uppercase mb-4">Liên hệ ngay</h5>
            <p className="mb-4">
              Hiếu Store là cửa hàng chuyên cung cấp các sản phẩm thời trang
              nam, nữ, trẻ em, giày dép, phụ kiện, mỹ phẩm, đồ gia dụng, đồ điện
              tử, đồ chơi, sách vở, thực phẩm, đồ uống,.....
            </p>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-primary mr-3"></i>48 Cao
              Thắng, Thanh Bình, Hải Châu, Đà Nẵng 550000
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope text-primary mr-3"></i>
              Võ Nguyễn Đại Hiếu
            </p>
            <p className="mb-0">
              <i className="fa fa-phone-alt text-primary mr-3"></i>+012 345
              67890
            </p>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="row">
              <div className="col-md-6 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">
                  My Account
                </h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-secondary mb-2" href="#">
                    <i className="fa fa-angle-right mr-2"></i>Trang Chủ
                  </a>

                  <a className="text-secondary mb-2" href="#">
                    <i className="fa fa-angle-right mr-2"></i>Chi Tiết Sản Phẩm
                  </a>
                  <a className="text-secondary mb-2" href="#">
                    <i className="fa fa-angle-right mr-2"></i>Giỏ Hàng
                  </a>
                  <a className="text-secondary mb-2" href="#">
                    <i className="fa fa-angle-right mr-2"></i>Thanh Toán
                  </a>
                  <a className="text-secondary" href="#">
                    <i className="fa fa-angle-right mr-2"></i>Liên Hệ
                  </a>
                </div>
              </div>
              <div className="col-md-6 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">
                  Newsletter
                </h5>
                <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                <form action="">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Email Address"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-primary">Sign Up</button>
                    </div>
                  </div>
                </form>
                <h6 className="text-secondary text-uppercase mt-4 mb-3">
                  Follow Us
                </h6>
                <div className="d-flex">
                  <a className="btn btn-primary btn-square mr-2" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-primary btn-square mr-2" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-primary btn-square mr-2" href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a className="btn btn-primary btn-square" href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row border-top mx-xl-5 py-4"
          style={{ borderColor: "rgba(256, 256, 256, 0.1) !important" }}
        >
          <div className="col-md-6 px-xl-0 text-center text-md-right">
            <img className="img-fluid" src="img/payments.png" alt="" />
          </div>
        </div>
      </div>

      <a href="#" className="btn btn-primary back-to-top">
        <i className="fa fa-angle-double-up"></i>
      </a>
    </>
  );
}

export default Footer;
