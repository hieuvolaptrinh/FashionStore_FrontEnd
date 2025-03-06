import Product from "../../models/Product";

interface ProductProps {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="col-md-3 mt-2">
      <div className="card shadow-sm border-0 rounded-4">
        {/* Ảnh sản phẩm */}
        <img
          src={product.imageUrl}
          className="card-img-top rounded-top-4"
          alt={product.title}
        />
        {/* Nội dung sản phẩm */}
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{product.title}</h5>
          <p className="card-text text-muted">{product.description}</p>

          {/* Giá sản phẩm */}
          <div className="d-flex justify-content-center align-items-center gap-2">
            <span className="fs-5 fw-bold text-danger">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="fs-6 text-secondary text-decoration-line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Nút mua hàng */}
          <button className="btn btn-primary w-100 mt-3">Mua ngay</button>
        </div>
      </div>
    </div>
    // <div className="col-md-4">
    //   <div className="card">
    //     <img
    //       src={product.imageUrl}
    //       className="card-img-top"
    //       alt={product.title}
    //     />
    //     <div className="card-body">
    //       <h5 className="card-title">{product.title}</h5>
    //       <p className="card-text">{product.description}</p>
    //       <p className="card-text">Giá: {product.price}</p>
    //       <a href="#" className="btn btn-primary">
    //         Mua hàng
    //       </a>
    //     </div>
    //   </div>
    // </div>
  );
};
export default ProductCard;
