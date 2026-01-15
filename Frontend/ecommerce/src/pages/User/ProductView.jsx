import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import ProductCart from "../../Components/Cards/ProductCard";
import { HiMiniArrowPath } from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/Apipaths";
import useAuthstore from "../../Store/Authstore";
import useCartStore from "../../Store/Cartstore";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import useWishliststore from "../../Store/Wishliststore";
import { isOfferActive } from "../../Utils/helper";

const ProductView = () => {
  const { id } = useParams();
  const [Product, setProduct] = useState(null);
  const [Quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [stock, setStock] = useState(0);
  const [ActiveImg, setActiveImg] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  const isAuthenticated = useAuthstore((s) => s.isAuthenticated);
  const toggleWishlist = useWishliststore((s) => s.toggleWishlist);
  const wishItems = useWishliststore((s) => s.wishItems);
  

  const isWhishlisted = (id) =>
    wishItems.some((i) => String(i._id) === String(id));

  const navigate = useNavigate();
  useEffect(() => {
    FetchProduct();
    FetchRelatedProducts();
  }, [id]);
  useEffect(() => {
    if (Product?.sizes?.length === 1) {
      setSelectedSize(Product.sizes[0]);
      setQuantity(1);
    } else {
      setSelectedSize(null);
      setQuantity(1);
    }
  }, [Product]);

  const FetchRelatedProducts = async () => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.Authuser.getrelatedProducts(id)
      );

      if (data) {
        console.log(data);
        setRelatedProducts(data.relatedProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const FetchProduct = async () => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.Authuser.getOneProduct(id)
      );

      if (data) {
        console.log("product", data);
        setProduct(data.Product);
        setStock(data.Product.stock);
        setActiveImg(data.Product.img[0]?.url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Increase = () => {
    // Case 1: Product has sizes
    if (Product.sizes?.length > 0) {
      if (!selectedSize) return;

      if (Quantity < selectedSize.qty) {
        setQuantity((prev) => prev + 1);
      }
    }
    // Case 2: Product has NO sizes
    else {
      if (Quantity < stock) {
        setQuantity((prev) => prev + 1);
      }
    }
  };

  const Decrease = () => {
    if (Quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const handleAddToCart = async (Product) => {
    if (!isAuthenticated) {
      navigate("/signup");
      return;
    }
    const hasSizes = Product.sizes?.length > 0;
    console.log("getted here");
    console.log(hasSizes, "the sizes");

    if (hasSizes && !selectedSize) {
      alert("Please select a size");
      return;
    }
    try {
      const payload = {
        productId: Product._id,
        size: hasSizes ? selectedSize.value : null,
        quantity: Quantity,
      };
      console.log("this is the payload", payload);
      const { data } = await axiosInstance.post(
        API_PATHS.Cart.addItem,
        payload
      );
      console.log(data);
      if (data.cartItems) useCartStore.getState().setCart(data.cartItems);
      alert("added to cart successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const HandleCheckout = async (id) => {
    if (!isAuthenticated) {
      navigate("/signup");
      return;
    }
    const hasSizes = Product.sizes?.length > 0;
    console.log("getted here");
    console.log(hasSizes, "the sizes");

    if (hasSizes && !selectedSize) {
      alert("Please select a size");
      return;
    }
    try {
      const payload = {
        productId: Product._id,
        size: hasSizes ? selectedSize.value : null,
        quantity: Quantity,
        mode: "BUY_NOW",
      };
      const { data } = await axiosInstance.post(
        API_PATHS.Cart.addItem,
        payload
      );
      console.log(data);

      navigate("/checkout?source=BUY_NOW");
    } catch (err) {
      console.log(err);
    }
  };

  const showOffer = Product && isOfferActive(Product.offer);

  return (
    <div>
      {Product && (
        <div className="w-full h-full">
          {/* Breadcrumb */}
          <p className="flex text-xs font-light text-slate-300 gap-2 my-10 lg:mx-40 mx-10">
            Account / <span>{Product.category.name}</span>/{" "}
            <span>{Product.subcategory}</span>
            <span className="text-black">
              /{Product.name.split(" ").slice(0, 5).join(" ")}
            </span>
          </p>

          {/* ================= GRID LAYOUT ================= */}
          <div
            className="
          grid
          grid-cols-1
          lg:grid-cols-[120px_1fr_1fr]
          gap-6
          lg:mx-40 mx-5
          min-h-[500px]
        "
          >
            {/* ===== LEFT: Thumbnails (Desktop) ===== */}
            <div className="hidden lg:flex flex-col gap-2.5 max-h-[500px]">
              {Product.img.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt=""
                  className={`w-full h-24 object-contain cursor-pointer ${
                    ActiveImg === img.url
                      ? "border-2 border-black"
                      : "border-transparent"
                  }`}
                  onMouseEnter={() => setActiveImg(img.url)}
                />
              ))}
            </div>

            {/* ===== CENTER: Main Image ===== */}
            <div className="flex items-start h-full">
              <img
                src={ActiveImg}
                alt=""
                className="max-h-[500px] w-full object-contain"
              />
            </div>
            {/* ===== Mobile Thumbnails ===== */}
            <div className="lg:hidden flex gap-4 my-6 mx-5 overflow-x-scroll">
              {Product.img.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  className={`w-20 h-20 object-contain ${
                    ActiveImg === img.url
                      ? "border-2 border-black"
                      : "border-transparent"
                  }`}
                  onMouseEnter={() => setActiveImg(img.url)}
                />
              ))}
            </div>

            {/* ===== RIGHT: Product Details ===== */}
            <div className="flex flex-col justify-between h-full gap-4">
              <div>
                <h2 className="text-xl font-semibold">{Product.name}</h2>

                <div className="flex items-center gap-3 mt-2">
                  <FaRegStar size={12} />
                  <p className="text-xs text-slate-400">(150 Reviews)</p>
                  <p className="text-xs text-green-500">In Stock</p>
                </div>
                <div className="flex gap-5 items-center">
                  <p className="text-2xl font-semibold my-3">
                    ${Product.amount}
                  </p>

                  {showOffer && (
                    <p className="p-3 text-red-500 font-bold animate-pulse">
                      {Product.offer.Percentage}% OFF
                    </p>
                  )}
                </div>
                <p className="text-sm border-b pb-3 text-slate-600">
                  {Product.description}
                </p>

                {/* Colors */}
                <div className="flex items-center gap-2 mt-4">
                  <p className="font-medium">Colours:</p>
                  {Product.colors.map((color, i) => (
                    <span key={i}>{color}</span>
                  ))}
                </div>

                {/* Sizes */}
                <div className="flex items-center gap-3 mt-4">
                  {/* Sizes */}
                  {Product.sizes?.length > 1 && (
                    <div className="flex items-center gap-3 mt-4">
                      <p className="font-medium">Size</p>
                      <div className="flex gap-2 flex-wrap">
                        {Product.sizes.map((size) => (
                          <button
                            key={size._id}
                            onClick={() => {
                              setSelectedSize(size);
                              setQuantity(1);
                            }}
                            className={`px-3 py-1 border text-sm
            ${
              selectedSize?.value === size.value
                ? "bg-black text-white"
                : "bg-white text-black border-slate-400"
            }
          `}
                          >
                            {size.value}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {Product.sizes?.length === 1 && (
                    <div className="flex items-center gap-3 mt-4">
                      <p className="font-medium">Size:</p>
                      <p>{Product.sizes[0]?.value}</p>
                    </div>
                  )}

                  {/* If NO sizes → show nothing */}
                </div>
              </div>

              {/* Quantity + Actions */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-5">
                  <div className="flex justify-between items-center w-32 h-8 border">
                    <button
                      className="w-1/4 h-full border-r"
                      disabled={Quantity === 1}
                      onClick={Decrease}
                    >
                      -
                    </button>

                    <p>{Quantity}</p>

                    <button
                      className="w-1/4 h-full bg-red-500 text-white"
                      disabled={
                        Quantity ===
                        (selectedSize?.qty ??
                          Product.sizes?.[0]?.qty ??
                          Product.stock)
                      }
                      onClick={Increase}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn-secondary rounded-sm px-10"
                    onClick={() => HandleCheckout(Product._id)}
                  >
                    Buy Now
                  </button>
                  <button
                    className=" bg-slate-100 rounded-full w-10 h-10  flex items-center justify-center"
                    onClick={() => toggleWishlist(Product._id)}
                  >
                    {isWhishlisted(Product._id) ? (
                      <IoIosHeart size={20} className="text-black" />
                    ) : (
                      <IoIosHeartEmpty size={20} className="" />
                    )}
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(Product)}
                  className="bg-black text-white px-5 py-2 text-center w-fit"
                >
                  Add To Cart
                </button>

                {/* Delivery */}
                <div className="flex flex-col items-start gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <TbTruckDelivery size={22} />
                    <div>
                      <h3 className="font-semibold">
                        {Product.delivery?.freedelivery
                          ? "Free Delivery"
                          : "Cash Delivery Only"}
                      </h3>
                      <p className="text-xs underline">
                        Free delivery for orders over $140
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    {Product.delivery?.availreturn ? (
                      <div className="flex gap-2 text-sm">
                        {" "}
                        <HiMiniArrowPath size={20} />
                        <p>30days Return </p>
                      </div>
                    ) : (
                      "NO Return"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Items */}
          {relatedProducts ? (
            <div className="my-10">
              <div
                className={`flex items-center gap-3 lg:ms-40 ms-10 ${
                  relatedProducts ? "visible" : "hidden"
                }`}
              >
                <div className="w-4 h-10 bg-[#DB4444] rounded"></div>
                <h4 className="text-[#DB4444] text-xs font-semibold">
                  Related items
                </h4>
              </div>
              <ProductCart Products={relatedProducts} />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default ProductView;
