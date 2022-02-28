import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";
import MovieOne from "components/MovieOne";

function Movie() {
  const router = useRouter();
  const { id } = router.query;
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const last = window.location.href.split("/").pop();
    const fetchItems = async () => {
      const result = await axios(
        `https://api.themoviedb.org/3/movie/${last}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setItems(result.data);
      setIsLoading(false);
    };
    fetchItems();
  }, []);

  return isLoading ? (
    <>
      <div>wait</div>
    </>
  ) : (
    <>
      <MovieOne items={items} />
    </>
  );
}

export default Movie;
