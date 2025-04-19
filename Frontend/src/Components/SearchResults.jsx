import React from "react";
import { useLocation } from "react-router-dom";

const dummyProducts = [
    {
      title: "Summer Dress",
      price: "$80",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27", // ✅ Real image
    },
    {
      title: "Running Shoes",
      price: "$100",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", // ✅ Real image
    },
    {
      title: "Men's Watch",
      price: "$150",
      image: require("../Components/assets/watch.jpg"), // ✅ Local image (use require)
    },
  ];
  

const SearchResults = () => {
  const query = new URLSearchParams(useLocation().search).get("q")?.toLowerCase();

  const results = dummyProducts.filter((item) =>
    item.title.toLowerCase().includes(query)
  );

  return (
    <div className="container mt-5">
      <h3>Search Results for: "{query}"</h3>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row">
          {results.map((item, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card p-2">
                <img src={item.image} className="card-img-top" alt={item.title} />
                <div className="card-body">
                  <h5>{item.title}</h5>
                  <p>{item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
