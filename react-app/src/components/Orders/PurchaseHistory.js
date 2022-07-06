const PurchaseHistory = ({ product, status }) => {
  console.log(product);
  return (
    <div className="orders-purchases__singlecontainer">
      <div className="orders-purchases__img" style={{ backgroundImage: `url('${product.images[0]}')`}}></div>
      <span>{product.title}</span>
        <span>Price:{" "}{new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}{" "}</span>

        <span></span>Shipping: {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
        }).format(product.shipping_price)}{" "}{" "}
        <span>Total:{" "}
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
        }).format(product.price + product.shipping_price)}{" "}</span>
        <span>Status: {status}</span>
    </div>
  );
};

export default PurchaseHistory;
