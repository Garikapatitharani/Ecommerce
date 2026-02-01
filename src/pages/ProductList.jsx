import { useEffect, useState } from "react";
import { getProducts } from "../utils/api";
import { getToken } from "../utils/auth";
import Navbar from "../components/Navbar";
import "./ProductList.css";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ price: "", color: "", size: "" });

  useEffect(() => {
    const load = async () => {
      const res = await getProducts(getToken());
      setProducts(res.data);
    };
    load();
  }, []);

  const filtered = products.filter(p=>
      (!filters.price || p.price <= Number(filters.price)) &&
      (!filters.color || p.color.includes(filters.color)) &&
      (!filters.size || p.sizes.includes(filters.size))
  );

  return (
    <>
      <Navbar />
      <div className="container">

        {/* FILTER */}
        <div className="filters">

          {/* SIZES */}
          <div className="filter-section">
            <h4>Size</h4>
            <div className="size-options">
              {["S", "M", "XL"].map((size) => (
                <button
                  key={size}
                  className={filters.size === size ? "active" : ""}
                  onClick={() => setFilters({ ...filters, size })}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* COLORS */}
          <div className="filter-section">
            <h4>Colors</h4>
            <div className="color-options">
              {["red", "blue", "green"].map((color) => (
                <span
                  key={color}
                  className={`color-dot ${color} ${
                    filters.color === color ? "selected" : ""
                  }`}
                  onClick={() => setFilters({ ...filters, color })}
                ></span>
              ))}
            </div>
          </div>

          {/* PRICE */}
        <div className="filter-section">
          <h4>Prices</h4>
          <select
            className="price-dropdown"
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
          >
            <option value="">All Prices</option>
            <option value="599">Under ₹599</option>
            <option value="999">Under ₹999</option>
          </select>
        </div>

        </div>

        {/* PRODUCTS */}
        <div className="products">
          {filtered.map((p, i) => (
            <ProductCard key={i} product={p} className="card"/>
          ))}
        </div>
      </div>
    </>
  );
}
