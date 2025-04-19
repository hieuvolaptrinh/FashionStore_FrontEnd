interface QuantityInputProps {
  quantity?: number;
  increaseQuantity?: () => void;
  decreaseQuantity?: () => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  quantity = 1,
  increaseQuantity,
  decreaseQuantity,
}) => {
  return (
    <div className="input-group quantity mr-3" style={{ width: "200px" }}>
      <div className="input-group-btn">
        <button
          className="btn btn-primary btn-minus"
          onClick={decreaseQuantity}
        >
          <i className="fa fa-minus"></i>
        </button>
      </div>
      <input
        type="number"
        className="form-control bg-secondary border-0 text-center"
        value={quantity}
        readOnly
      />
      <div className="input-group-btn">
        <button className="btn btn-primary btn-plus" onClick={increaseQuantity}>
          <i className="fa fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
