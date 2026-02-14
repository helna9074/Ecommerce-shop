import { set } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/Apipaths";
import { Fetch } from "socket.io-client";
const SeachBar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);
  useEffect(() => {
  if (!search.trim()) {
    setSuggestions([]);
    setShowDropdown(false);
    return;
  }

  const timer = setTimeout(() => {
    FetchSuggestions();
  }, 400);

  return () => clearTimeout(timer);
}, [search]);

  const FetchSuggestions = async () => {
        const { data } = await axiosInstance.get(
          `${API_PATHS.Search.getsuggestions}?q=${search}`,
        );
        setSuggestions(data);
        setShowDropdown(true);
      };
   
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const goToSearch = (value) => {
    navigate(`/view-All?q=${value}`);
    setSearch("");
    setShowDropdown(false);
  };
  const goToProduct = (id) => {
    navigate(`/product-view/${id}`);
    setSearch("");
    setShowDropdown(false);
  };
  return (
    <div ref={ref} className="relative">
    <div className="flex justify-between items-center lg:px-3 p-1  lg:py-1.5 text-gray-400  font-light bg-[#F5F5F5] w-[150px] md:w-[250px]">
      <input
        className="lg:text-sm text-xs text-black outline-none w-full"
        type="text"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        onKeyDown={(e)=>e.key==="Enter"&&goToSearch(search)}
        id="search"
        name="search"
        placeholder="What are you looking for?"
      />
      <CiSearch className="text-black font-semibold" size={20} onClick={()=>goToSearch(search)}/>
    </div>
    {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-full w-full bg-white shadow z-50">
         {suggestions.map((item) => (
  <div
    key={item._id}
    onClick={() => goToProduct(item._id)}
    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
  >
    <p className="text-sm font-medium truncate">
      {item.name}
    </p>
    <p className="text-xs text-gray-500 truncate">
      {item.category?.name}
    </p>
  </div>
))}

        </div>
      )}
    </div>
  );
};

export default SeachBar;
