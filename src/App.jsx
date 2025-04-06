import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";
import "./index.css";
import Cart from "./components/Cart";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  let filteredItems = [];

  const pageSize = 4;
  const [noOfPage, setNoOfPage] = useState(1);
  let pageStart = (noOfPage - 1) * noOfPage;

  const [searchForItem, setSearchForItem] = useState("");
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3000/menu");
      const catsResponse = await axios.get("http://localhost:3000/categories");
      setItems(response.data);
      setCategories(catsResponse.data);
      setLoadingItems(false);
      handleSelectedCategory(0);
    };
    setLoadingItems(true);
    setTimeout(getData, 2000);
  }, []);

  // cart handlers
  const handleIncrement = (id) => {
    setItems(
      items.map((item) => ({
        ...item,
        count: item.id === id ? item.count + 1 : item.count,
      }))
    );
  };
  const handleDecrement = (id) => {
    setItems(
      items.map((item) => ({
        ...item,
        count:
          item.id === id
            ? item.count - 1 < 0
              ? 0
              : item.count - 1
            : item.count,
      }))
    );
  };
  const handleDelete = (id) => {
    setItems(
      items.map((item) =>
        item.id == id ? { ...item, isInCart: false } : { ...item }
      )
    );
  };
  const handleAddToCart = (id) => {
    setItems(
      items.map((item) =>
        item.id == id
          ? { ...item, isInCart: !item.isInCart, count: item.count > 0 ? 0 : 1 }
          : item
      )
    );
  };
  const resetCount = () => {
    setItems(items.map((item) => ({ ...item, count: 0 })));
  };

  // menu handles
  const handleSelectedCategory = (id) => {
    setSelectedCategory(id);
    setSearchForItem("");
    setNoOfPage(1);
  };
  const handleSelectedPage = (id) => {
    setNoOfPage(id);
  };
  pageStart = (noOfPage - 1) * pageSize;

  const handleSearchChange = (e) => {
    setSelectedCategory(0);
    setNoOfPage(1);
    setSearchForItem(e.target.value);
  };
  filteredItems =
    selectedCategory == 0
      ? items
      : items.filter((itm) => itm.category == selectedCategory);
  if (searchForItem.length > 0) {
    filteredItems = filteredItems.filter((itm) =>
      itm.name.toLowerCase().includes(searchForItem.toLowerCase())
    );
  }
  const paginationNum = Math.ceil(filteredItems.length / pageSize);
  filteredItems = filteredItems.slice(pageStart, pageStart + pageSize);

  return (
    <>
      <NavBar
        items={items}
        noOfItems={items.reduce((sum, item) => sum + item.count, 0)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              loadingItems={loadingItems}
              items={filteredItems}
              handleAddToCart={handleAddToCart}
              categories={categories}
              handleSelectedCategory={handleSelectedCategory}
              selectedCategory={selectedCategory}
              handleSelectedPage={handleSelectedPage}
              noOfPage={noOfPage}
              paginationNum={paginationNum}
              handleSearchChange={handleSearchChange}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/cart"
          element={
            <Cart
              items={items}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              handleDelete={handleDelete}
              resetCount={resetCount}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
