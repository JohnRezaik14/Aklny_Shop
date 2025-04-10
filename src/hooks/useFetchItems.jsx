import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useFetchItems({
  handleSelectedCategory,
  setIsLoading,
}) {
  //   let dataServerState = false;
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/menu");
        const catsResponse = await axios.get(
          "http://localhost:3000/categories"
        );
        // dataServerState = true;
        setItems(response.data);
        setCategories(catsResponse.data);
        setIsLoading(false);
        handleSelectedCategory(0);
        // console.log(response);
      } catch (error) {
        // console.log(dataServerState);
        console.log(error);
        // console.log(navigator);
        // console.log(navigator.connection);
      } finally {
        // console.log(dataServerState);
      }
    };
    setTimeout(getData, 2000);
  }, []);
  return {
    items,
    setItems,
    categories,
    selectedCategory,
    setSelectedCategory,
  };
}
