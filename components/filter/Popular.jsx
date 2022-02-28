import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import MovieCard from "components/MovieCard";

export default Popular;

function Popular() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        "https://api.themoviedb.org/3/movie/popular?api_key=78601f5f290033503e8eea61f5dbf0c7"
      );
      setItems(result.data.results);
    };
    fetchItems();
  }, []);
 
  return (
      <MovieCard items={items} />
  );
}
