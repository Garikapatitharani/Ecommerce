import Image from '../assets/Image.png';
import './ProductCard.css'

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={Image} alt="image" className="product-img"/>
      <h4>{product.name}</h4>
      <p>₹{product.price}</p>
      <p>Colors: {product.color.join(", ")}</p>
      <p>Sizes: {product.sizes.join(", ")}</p>
    </div>
  );
}
