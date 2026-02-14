import React, { useEffect, useRef, useState } from "react";

import { CiCircleMinus } from "react-icons/ci";
import Input from "../../Components/Inputs/Admininput";
import { useForm } from "react-hook-form";
import Imageupload from "../Inputs/Imageupload";
import * as Yup from "yup";
import { API_PATHS } from "../../Utils/Apipaths";
import { yupResolver } from "@hookform/resolvers/yup";
import API from "../../Utils/adminAxios";
import Toggleslide from "../Inputs/Toggleslide";
import { useFieldArray, Controller } from "react-hook-form";
import Offerinput from "../Inputs/Offerinput";
import Addbtn from "../UI/Addbtn";
import SizeQtyFields from "../UI/SizeQtyFields";
import Select from "react-select";


const ProductForm = ({ categories=[], isedit, selectedProduct, Submit }) => {
  const schema = Yup.object({
    name: Yup.string().required("Name is required"),

    img: Yup.mixed().test("required", "Please upload an image", function () {
      return previewImages.length > 0;
    }),

    categories: Yup.string().required("Category required"),
    amount: Yup.string()
      .required("This field is required")
      .trim()
      .matches(/^[0-9]+$/, "Please enter numbers only"),
    description: Yup.string().required(),
    offer: Yup.boolean(),
    startdate: Yup.string().when("offer", {
      is: true,
      then: (schema) => schema.required("Start date is required"),
    }),

    enddate: Yup.string().when("offer", {
      is: true,
      then: (schema) => schema.required("End date is required"),
    }),
    sizes: Yup.array().of(
      Yup.object().test(
        "size-qty-pair",
        "Both size and quantity are required",
        function (obj) {
          const { value, qty } = obj;
          if (!value && !qty) return true;
          if (value && qty) return true;
          return false;
        }
      )
    ),

    percentage: Yup.string().when("offer", {
      is: true,
      then: (schema) => schema.required("Percentage is required"),
    }),
    stock: Yup.string()
      .required("This field is required")
      .trim()
      .matches(/^[0-9]+$/, "Please enter numbers only"),
  })
    .test("atLeastOneDelivery", null, function (values) {
      if (values.freedelivery || values.cashdelivery || values.availreturn) {
        return true;
      }

      return this.createError({
        path: "deliveryError",
        message: "Select at least one delivery option",
      });
    })
    .test(
      "variant-stock-check",
      "Total variant quantity exceeds stock",
      function (values) {
        const { sizes, stock } = values;
        if (!sizes || sizes.length === 0) return true;

        const total = sizes.reduce((sum, s) => sum + (Number(s.qty) || 0), 0);

        if (total > Number(stock)) {
          return this.createError({
            path: "variantStockError",
            message: "Total variant quantity exceeds available stock",
          });
        }

        return true;
      }
    );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      sizes: [],
      isFlashSale: false,
      colors: "",
   
      subcategory: "",
    },
  });

  const [previewImages, setPreviewImages] = useState([]);

  const [showOffer, setShowOffer] = useState(false);
  const [loading, setLoading] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  const selectCategoryId = watch("categories");
  const selectedCategory = categories?.find(
    (cat) => cat._id === selectCategoryId
  );
  useEffect(() => {
  if (isedit && selectedProduct && selectedCategory) {
    setValue("subcategory", selectedProduct.subcategory);
  }
}, [isedit, selectedProduct, selectedCategory, setValue]);


  useEffect(() => {
    const formatData = (d) => (d ? d.split("T")[0] : "");
    if(!isedit){
       setValue("subcategory", "");
    }
   

    if (isedit && selectedProduct) {
      if (selectedProduct.offer) {
        setShowOffer(selectedProduct.offer?.enabled);
      }

      reset({
        name: selectedProduct.name,
        categories: selectedProduct.category?._id
          ? selectedProduct.category._id
          : "",
       
        amount: selectedProduct.amount,
        stock: selectedProduct.stock,
        description: selectedProduct.description,
        offer: selectedProduct.offer?.enabled ?? false,
        startdate: formatData(selectedProduct.offer?.startdate),
        sizes: selectedProduct.sizes?.length ? selectedProduct.sizes : [],
        enddate: formatData(selectedProduct.offer?.enddate),
        percentage: selectedProduct.offer?.Percentage ?? "",
        freedelivery: selectedProduct.delivery?.freedelivery ?? "",
        cashdelivery: selectedProduct.delivery?.cashdelivery ?? "",
        availreturn: selectedProduct.delivery?.availreturn ?? "",
        isFlashSale: selectedProduct.isFlashSale === true,
     
      });

      if (selectedProduct) {
        setPreviewImages(
          selectedProduct.img.map((img) => ({
            preview: img.url,
            url: img.url,
            file: null,
            public_id: img.public_id,
            isExisting: true,
          }))
        );
      }
      console.log(selectedProduct.colors);
      if (selectedProduct.colors?.length) {
        setValue("colors", selectedProduct.colors.join(", "));
      }
    }
  }, [isedit, selectedProduct, reset]);

  const Handlemodal = async (data) => {
    if(loading) return
    setLoading(true)
    const totalImages = previewImages.length;
    if (totalImages > 5) {
      alert("You can upload maximum 5 images");
      setLoading(false)
      return;
    }

    const formData = new FormData();
    for (const key in data) {
      if (
        key !== "img" &&
        key !== "offer" &&
        key !== "startdate" &&
        key !== "enddate" &&
        key !== "percentage" &&
        key !== "freedelivery" &&
        key !== "cashdelivery" &&
        key !== "availreturn" &&
        key !== "sizes" &&
        key !== "isFlashSale" &&
        key !== "colors" 
      
      ) {
        formData.append(key, data[key]);
      }
    }
 
    console.log("colors", data.colors);
    console.log("Sizes", data.sizes);
    console.log("Flash Sales", data.isFlashSale);
    const colorsArray = (data.colors || "")
      .split(",")
      .map((color) => color.trim())
      .filter(Boolean);

    formData.append("colors", JSON.stringify(colorsArray));
    console.log("the colors", colorsArray);
    formData.append("sizes", JSON.stringify(data.sizes));
    const cleanPercentage = data.percentage
      ? String(data.percentage).replace("%", "")
      : "";
    const offerInfo = {
      enabled: Boolean(data.offer),
      startdate: data.startdate || "",
      enddate: data.enddate || "",
      Percentage: cleanPercentage ? Number(cleanPercentage) : null,
    };
    formData.append("isFlashSale", data.isFlashSale ? "true" : "false");


    const deliveryInfo = {
      freedelivery: data.freedelivery === true || data.freedelivery === "on",
      cashdelivery: data.cashdelivery === true || data.cashdelivery === "on",
      availreturn: data.availreturn === true || data.availreturn === "on",
    };

    if (isedit && selectedProduct?.img) {
      const existingImages = previewImages
        .filter((img) => img.isExisting)
        .map((img) => ({ url: img.url, public_id: img.public_id }));
      formData.append("existingImages", JSON.stringify(existingImages));
      previewImages
        .filter((img) => !img.isExisting && img.file)
        .forEach((img) => {
          formData.append("img", img.file);
        });
    }

    formData.append("delivery", JSON.stringify(deliveryInfo));
    formData.append("offer", JSON.stringify(offerInfo));
    if (!isedit) {
      previewImages.forEach((img) => {
        if (img.file) {
          formData.append("img", img.file);
        }
      });
    }

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      let res;
      if (isedit) {
        res = await API.put(
          API_PATHS.Authadmin.EditProduct(selectedProduct._id),
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
       
        console.log(res);
      } else {
        res = await API.post(API_PATHS.Authadmin.AddProducts, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(res);
      }
      if (res?.data) {
        setLoading(!loading)
        Submit();
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(Handlemodal)}
        className="flex flex-col gap-5"
      >
        {/* Categories */}

        <div>
          <h1 className="text-sm font-bold ms-1">Basic Info</h1>

          <div className="flex flex-col  gap-3 items-center border border-slate-500 p-3 rounded-2xl ">
            <Controller
  name="categories"
  control={control}
  rules={{ required: "Category required" }}
  render={({ field }) => (
    <Select
      {...field}
      options={categories.map(cat => ({
        label: cat.name,
        value: cat._id
      }))}
      placeholder="Select category"
      isSearchable
      isClearable
      className="w-full"
      onChange={(option) => field.onChange(option?.value)}
      value={categories
        .map(cat => ({ label: cat.name, value: cat._id }))
        .find(opt => opt.value === field.value)
      }
    />
  )}
/>
{errors.categories && (
  <p className="text-red-500 text-sm">{errors.categories.message}</p>
)}

            {/* <Input
              name="categories"
              select
              options={categories.map((item, index) => ({
                name: item.name,
                value: item._id,
              }))}
            
              error={errors.categories?.message}
              className=" w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none shadow-sm transition overflow-y-auto h-1/2 "
              register={register}
              label="category"
            /> */}
            {/* {selectedCategory?.subname?.length > 0 && (
              <Input
                name="subcategory"
                select
                options={selectedCategory.subname.map((sub, index) => ({
                  name: sub,
                  value: sub,
                }))}
             
                error={errors.categories?.message}
                className=" w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none shadow-sm transition "
                register={register}
                label="subcategory"
              />
            )} */}
            {selectedCategory?.subname?.length > 0 && (
  <Controller
    name="subcategory"
    control={control}
    render={({ field }) => (
      <Select
        {...field}
        options={selectedCategory.subname.map(sub => ({
          label: sub,
          value: sub
        }))}
        placeholder="Select subcategory"
        isSearchable
        className="w-full"
        onChange={(option) => field.onChange(option?.value)}
        value={
          selectedCategory.subname
            .map(sub => ({ label: sub, value: sub }))
            .find(opt => opt.value === field.value)
        }
      />
    )}
  />
)}


            <Input
              type="text"
              name="name"
              placeholder="Product Name"
              className="w-full"
              register={register}
              label="Name"
              error={errors.name?.message}
            />

            <Input
              textarea
              label="Description"
              placeholder="Description"
              name="description"
              register={register}
              className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none   shadow-sm transition "
              error={errors.description?.message}
            />
          </div>
        </div>
        <div>
          <h1 className="text-sm font-bold ms-1">Inventory</h1>
          <div className="flex flex-col  gap-3 items-center border border-slate-500 p-3 rounded-2xl ">
            <Input
              type="text"
              placeholder="$Price"
              name="amount"
              register={register}
              label="Price"
              error={errors.amount?.message}
            />

            <Input
              type="text"
              name="colors"
              placeholder="red,white,blue"
              register={register}
              label="Colors"
            />
            <Input
              type="text"
              name="stock"
              placeholder="available stock"
              register={register}
              label="Available stock"
              error={errors.stock?.message}
            />

            <Offerinput
              register={register}
              name="offer"
              setShowOffer={setShowOffer}
              showOffer={showOffer}
              setValue={setValue}
            />

            <div className="flex gap-5 flex-col">
              {showOffer && (
                <div className="flex gap-2 items-center">
                  <Input
                    type="date"
                    name="startdate"
                    register={register}
                    label="Starting date"
                    error={errors.startdate?.message}
                  />

                  <Input
                    type="date"
                    name="enddate"
                    register={register}
                    label="Ending date"
                    error={errors.enddate?.message}
                  />

                  <Input
                    type="text"
                    name="percentage"
                    placeholder="%"
                    register={register}
                    label="Percentage"
                    error={errors.percentage?.message}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-5 w-full">
              <div className="flex gap-3">
                <p className="text-sm text-black">Flash Sales</p>
                <Controller
                  name="isFlashSale"
                  defaultValue={false}
                  control={control}
                  render={({ field }) => (
                    <Toggleslide
                      checked={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
             
            </div>
          </div>
        </div>

        {/* image selector */}
        <Imageupload
          previewImages={previewImages}
          name="img"
          setPreviewImages={setPreviewImages}
          register={register}
          error={errors.img?.message}
          className="w-full h-28 mx-1"
          size="50"
          setValue={setValue}
        />

        <div className=" ">
          <h1 className="text-sm font-semibold ms-2">Variant</h1>
          {errors.variantStockError?.message && (
            <p className="text-red-500 text-sm mb-2">
              {errors.variantStockError.message}
            </p>
          )}
          <div className="flex flex-1 flex-col justify-center border border-slate-500  p-3 rounded-2xl">
            <SizeQtyFields fields={fields} register={register} errors={errors}  allowEditSize={true} allowRemove={true} remove={remove}/>
           
            <div className="">
              <button
                className="text-blue-600 text-sm"
                type="button"
                onClick={() => append({ value: "", qty: "" })}
              >
                Add Size
              </button>
            </div>
          </div>
        </div>
        <p className="font-medium">Mode of Delivery:</p>
        <div className="flex gap-5">
          <label>
            <input type="checkbox" {...register("freedelivery")} /> Free
            Delivery
          </label>
          <label>
            <input type="checkbox" {...register("cashdelivery")} /> Cash
            Delivery
          </label>
          <label>
            <input type="checkbox" {...register("availreturn")} /> Return
          </label>
        </div>
        {errors.deliveryError && (
          <p className="text-red-500 text-sm">{errors.deliveryError.message}</p>
        )}

        {/* checkboxes */}

        <Addbtn isedit={isedit} loading={loading} />
      </form>
    </div>
  );
};

export default ProductForm;
