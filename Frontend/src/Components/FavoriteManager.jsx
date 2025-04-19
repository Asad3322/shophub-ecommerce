import React, { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

// Custom hook for accessing favorites
export const useFavorites = () => useContext(FavoriteContext);

// Context Provider Component
const FavoriteManager = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (product) => {
    const exists = favorites.find((item) => item.name === product.name);
    if (exists) {
      console.log("❌ Removing from favorites:", product.name);
      setFavorites(favorites.filter((item) => item.name !== product.name));
    } else {
      console.log("✅ Adding to favorites:", product.name);
      setFavorites([...favorites, product]);
    }
  };
  

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteManager;
