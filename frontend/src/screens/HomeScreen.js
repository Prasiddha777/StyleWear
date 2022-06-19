import { Link } from "react-router-dom";
import data from "../data";

function HomeScreen() {
  return (
    <div>
      <h1>Products</h1>
      <div className="products">
        {data.products.map((products) => (
          <div className="product" key={products.slug}>
            <Link to={`/product/${products.slug}`}>
              <img src={products.image} alt={products.name} />
            </Link>
            <Link to={`/product/${products.slug}`}>
              <p>{products.name}</p>
            </Link>
            <p>
              <strong>Rs.{products.price}</strong>
            </p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeScreen;
