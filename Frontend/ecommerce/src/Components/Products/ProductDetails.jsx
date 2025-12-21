import React, { useEffect } from "react";
import Img1 from "../../../Assets/Img1.jpg";
import { formatDate } from "../../Utils/helper";
import { FaRegCalendarAlt } from "react-icons/fa";
import Toggleslide from "../Inputs/Toggleslide";

const ProductDetails = ({ filteredProduct }) => {
  console.log(filteredProduct)
  return (
    <>
      {filteredProduct.map((item, index) => (
        
        <div key={index} className="flex w-full flex-col gap-5">
          <h1 className="lg:text-2xl text-xl font-bold">Product Details</h1>
          <div className="flex gap-5 lg:flex-row flex-col">
            <div className="flex  flex-col gap-2 lg:w-[55%] w-full p-5 product-list space-y-2">
              <h2 className="text-xl font-semibold text-black">
                General information
              </h2>
              <div>
                <p className="ms-1 text-gray-400 font-light text-sm">
                  product Name
                </p>
                <div className="product-list p-1.5 bg-slate-50 text-sm">
                  {item.name? item.name:""}
                </div>
              </div>
              <div>
                <p className="ms-1 text-gray-400 font-light text-sm">
                  Description
                </p>
                <textarea className="product-list p-1.5 h-32 bg-slate-50 text-sm flex flex-wrap w-full resize-none">
                  
                  {item.description}
                </textarea>
              </div>
            </div>

            <div className="flex lg:w-[40%] w-full product-list">
              <div className="p-3 flex flex-col gap-3 space-y-5">
                <h1>Product Media</h1>

                <div className="w-full h-full flex flex-col  ">
                  <h2 className="ms-1 text-gray-400 font-light text-sm">
                    Product Images
                  </h2>

                  <div className="flex gap-3 bg-gray-50 border border-dashed border-gray-300 p-3 overflow-x-auto hide-scrollbar scroll-smooth ">
                    {item.img.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        className="w-32 h-32 object-contain rounded"
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5 lg:flex-row flex-col">
            <div className="flex  flex-col gap-2 lg:w-[55%] w-full p-5 product-list space-y-2">
              <h2 className="text-xl font-semibold text-black">Pricing</h2>
              <div>
                <p className="ms-1 text-gray-400 font-light text-sm">
                  Base Price
                </p>
                <div className="product-list p-1.5 bg-slate-50 text-sm">
                  $ {item.amount}
                </div>
              </div>
              <div className="flex gap-2 w-full">
                <div className="w-full">
                  <p className="ms-1 text-gray-400 font-light text-sm">
                    Category
                  </p>
                  <div className="product-list p-1.5 bg-slate-50 text-sm w-full">
                    {item.category?.name? item.category.name :""}
                  </div>
                </div>
                 <div className="w-1/2">
                  <p className="ms-1 text-gray-400 font-light text-sm">
                    Available Colors
                  </p>
                  <div className="product-list p-1.5 bg-slate-50 text-sm flex gap-2">
                    {item.colors.map((c, index) => (
                      <div
                        className="w-5 h-5 rounded-full border cursor-pointer"
                        style={{ background: c || "#dddddd" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p className="ms-1 text-gray-400 font-light text-sm">
                  Discount %
                </p>
                <div className="product-list p-1.5 bg-slate-50 text-sm">
                  {item.offer?.Percentage ? item.offer.Percentage : ""} %
                </div>
              </div>
              <div className="flex gap-2 w-full">
                <div className="w-full flex gap-1 items-center">
                  <p className="ms-1 text-gray-400 font-light text-sm whitespace-nowrap">
                    Start date :
                  </p>
                  <div className="product-list p-1.5 bg-slate-50 text-sm w-full flex items-center gap-1  whitespace-nowrap">
                    <FaRegCalendarAlt className="text-sm" />
                    <p>
                      {item.offer?.startdate
                        ? formatDate(item.offer.startdate)
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="w-full flex items-center gap-2">
                  <p className="ms-1 text-gray-400 font-light text-sm whitespace-nowrap">
                    End date :
                  </p>
                  <div className="product-list p-1.5 bg-slate-50 text-sm w-full flex items-center gap-1  whitespace-nowrap">
                    <FaRegCalendarAlt className="text-sm" />
                    <p>
                      {item.offer?.enddate
                        ? formatDate(item.offer.enddate)
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
               <div className="flex items-center  gap-3">
                    <p>Flash Sale</p>
                  <Toggleslide checked={item.isFlashSale} disabled/>
                  </div>
              {item.sizes&&(
                item.sizes.map((it,index)=>(
                 <div className="w-full flex gap-2">
               <div className="w-full">
                  <p className="ms-1 text-gray-400 font-light text-sm">
                    Available size
                  </p>
                  
                  <div className="product-list p-1.5 bg-slate-50 text-sm w-full">
                    {it.value}
                  </div>
                </div>
                <div className="w-1/2">
                  <p className="ms-1 text-gray-400 font-light text-sm">
                    Qunatity Available
                  </p>
                  <div className="product-list p-1.5 bg-slate-50 text-sm flex gap-2">
                    {it.qty}
                  </div>
                </div>
              </div>
                ))

              )}
             
            </div>
            <div className="flex lg:w-[40%] w-full  h-1/2 product-list">
              <div className="p-3 flex flex-col gap-3 space-y-5">
                <h1 className="text-xl font-semibold text-black">Delivery</h1>

                <div className="w-full  flex flex-col gap-5 ">
                  <div className="flex items-center justify-between gap-3">
                    <p>Available Return</p>
                  <Toggleslide checked={item.delivery.availreturn} disabled/>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p>Cash on Delivery</p>
                  <Toggleslide checked={item.delivery.cashdelivery} disabled/>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p>Free Delivery</p>
                  <Toggleslide checked={item.delivery.freedelivery} disabled/>
                  </div>
                  
               

                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
