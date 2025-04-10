//*CSS FILE
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
//*Pages Components
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
//* utilties
import { useState } from "react";
import { Route, Routes } from "react-router";
import { ItemsContext } from "./contexts/items";
import useFetchItems from "./hooks/useFetchItems";
import Admin from "./pages/Admin";
import { ToastContainer } from "react-toastify";
function App() {
  let filteredItems = [];
  const pageSize = 4;
  const [noOfPage, setNoOfPage] = useState(1);
  let pageStart = (noOfPage - 1) * noOfPage;
  const [searchForItem, setSearchForItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // menu handlers

  const handleSelectedCategory = (id) => {
    setSelectedCategory(id);
    setSearchForItem("");
    setNoOfPage(1);
  };
  const handleSelectedPage = (id) => {
    setNoOfPage(id);
  };

  const handleSearchChange = (e) => {
    setSelectedCategory(0);
    setNoOfPage(1);
    setSearchForItem(e.target.value);
  };

  //~fetch items and set required data

  const { items, setItems, categories, selectedCategory, setSelectedCategory } =
    useFetchItems({ handleSelectedCategory, isLoading, setIsLoading });

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
            ? //limit of decrement(count[1-infinty])
              item.count - 1 < 1
              ? 1
              : item.count - 1
            : item.count,
      }))
    );
  };
  const handleDelete = (id) => {
    setItems(
      items.map((item) =>
        item.id == id ? { ...item, isInCart: false, count: 0 } : { ...item }
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
  //admin handlers
  const handleAddingItem = (item) => {
    setItems([...items, item]);
  };
  const handleEditingItems = (Items) => {
    setItems(Items);
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
  pageStart = (noOfPage - 1) * pageSize;
  filteredItems = filteredItems.slice(pageStart, pageStart + pageSize);

  return (
    <>
      <NavBar
        items={items}
        noOfItems={items.reduce((sum, item) => sum + item.count, 0)}
      />
      <ToastContainer position="top-right" autoClose={3000} />
      <ItemsContext.Provider
        value={{
          items,
          isLoading,
          filteredItems,
          categories,
          noOfPage,
          paginationNum,
          handleSelectedPage,
          handleSearchChange,
          handleSelectedCategory,
          selectedCategory,
          handleAddToCart,
          handleIncrement,
          handleDecrement,
          handleDelete,
          resetCount,
          handleAddingItem,
          handleEditingItems,
        }}
      >
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ItemsContext.Provider>
    </>
  );
}

export default App;
