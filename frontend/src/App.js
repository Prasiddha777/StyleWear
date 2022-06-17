import data from "./data";

function App() {
  return (
    <div>
      <header>
        <a href="/">Style&#38;Wear</a>
      </header>
      <main>
        <h1>Products</h1>
        <div className="products">
          {data.products.map((products) => (
            <div className="product" key={products.slug}>
              <a href={`/product/${products.slug}`}>
                <img src={products.image} alt={products.name} />
              </a>
              <a href={`/product/${products.slug}`}>
                <p>{products.name}</p>
              </a>
              <p>
                <strong>Rs.{products.price}</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
