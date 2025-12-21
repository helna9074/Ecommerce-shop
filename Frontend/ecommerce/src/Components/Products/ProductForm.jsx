
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { FaPlus } from "react-icons/fa";
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

const ProductForm = ({ categories, isedit, selectedProduct, Submit }) => {
  

  const schema = Yup.object({
    name: Yup.string().required("Name is required"),
   
    img: Yup.mixed().test(
      "required",
      "Please upload an image",
      function () {
    return previewImages.length > 0;
  }
    ),
    
    categories: Yup.string().required("Category required"),
    amount: Yup.string().required(),
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

    percentage: Yup.string().when("offer", {
      is: true,
      then: (schema) => schema.required("Percentage is required"),
    }),
    sizes: Yup.array()
      .of(
        Yup.object({
          value: Yup.string().required("Size required"),
          qty: Yup.number().required("Quantity required").min(1, "Minimum 1"),
        })
      )
      .min(1, "At least one size required"),
  }).test("atLeastOneDelivery", null, function (values) {
    if (values.freedelivery || values.cashdelivery || values.availreturn) {
      return true;
    }
    return this.createError({
      path: "deliveryError",
      message: "Select at least one delivery option",
    });
  });
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
      sizes: [{ value: "", qty: 1 }],
      isFlashSale: false,
      colors:""
    },
  });
 
  const [previewImages, setPreviewImages] = useState([]);

  const [showOffer, setShowOffer] = useState(false);
 
 
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  useEffect(() => {
    const formatData = (d) => (d ? d.split("T")[0] : "");
    
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

        description: selectedProduct.description,
        offer: selectedProduct.offer?.enabled ?? false,
        startdate: formatData(selectedProduct.offer?.startdate),
        sizes: selectedProduct.sizes?.length
          ? selectedProduct.sizes
          : [{ value: "", qty: 1 }],
        enddate: formatData(selectedProduct.offer?.enddate),
        percentage: selectedProduct.offer?.Percentage ?? "",
        freedelivery: selectedProduct.delivery?.freedelivery ?? "",
        cashdelivery: selectedProduct.delivery?.cashdelivery ?? "",
        availreturn: selectedProduct.delivery?.availreturn ?? "",
        isFlashSale: selectedProduct.isFlashSale === true,
      });

    if(selectedProduct){
      setPreviewImages(
      selectedProduct.img.map((img)=>({
        preview:img.url,
        url:img.url,
        file:null,
        public_id:img.public_id,
        isExisting:true,
      }))
    )
    }
    console.log(selectedProduct.colors)
      if (selectedProduct.colors?.length) {
        setValue('colors',selectedProduct.colors.join(', '))
      }
    }
  }, [isedit, selectedProduct, reset]);

  
  const Handlemodal = async (data) => {
const totalImages = previewImages.length;
if (totalImages > 5) {
  alert("You can upload maximum 5 images");
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
        key !== "availreturn"&&
        key!=='sizes'&&
        key!=='isFlashSale'&&
        key!=='colors'
      ) {
        formData.append(key, data[key]);
      }
    }
    console.log('colors',data.colors)
    console.log("Sizes",data.sizes)
    console.log("Flash Sales" ,data.isFlashSale)
    const colorsArray = (data.colors || "")
  .split(",")
  .map(color => color.trim())
  .filter(Boolean);


formData.append("colors", JSON.stringify(colorsArray));
console.log("the colors",colorsArray)
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
    const existingImages=previewImages.filter(img=>img.isExisting).map(img=>({url:img.url,public_id:img.public_id}))
    formData.append('existingImages',JSON.stringify(existingImages));
    previewImages.filter(img=>!img.isExisting&&img.file).forEach(img=>{
      formData.append("img",img.file)
    })
    }
    

    formData.append("delivery", JSON.stringify(deliveryInfo));
    formData.append("offer", JSON.stringify(offerInfo));
    if (!isedit) {
  previewImages.forEach(img => {
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
        Submit();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(Handlemodal)}
        className="flex flex-col gap-5"
      >
        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 items-center">
          <Input
            name="categories"
            select
            options={categories.map((item, index) => ({
              name: item.name,
              value: item._id,
            }))}
            error={errors.categories?.message}
            className=" w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none shadow-sm transition "
            register={register}
            label="category"
          />

          <Input
            type="text"
            name="name"
            placeholder="Product Name"
            className="w-full"
            register={register}
            label="Name"
            error={errors.name?.message}
          />
        </div>

        <div className="flex  gap-3 ">
          <div className="w-1/3">
            <Input
              type="text"
              placeholder="Amount"
              name="amount"
              register={register}
              label="Amount"
              error={errors.amount?.message}
            />
          </div>
         

          <div className="flex flex-1 flex-col ">
            {fields.map((item, index) => (
              <div key={item.id} className="flex gap-3 items-center">
                <div className="flex flex-col">
                  <label className="text-gray-500 text-sm">Size</label>
                  <input
                  className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none   shadow-sm transition"
                    type="text"
                    placeholder="(M,XL,153cm)"
                    name="size"
                    {...register(`sizes.${index}.value`)}
                    label="Size"
                    
                  />
                  <p className="text-red-500 text-xs">{errors.sizes?.[index]?.value?.message}</p>
                </div>
                

                <div className=" flex items-center gap-2 ">
                  <div className="flex flex-col">
                     <label className="text-gray-500 text-sm">quantity</label>
                  <input
                  className="rounded-md border border-gray-300 px-3 py-2 text-gray-700 outline-none   shadow-sm transition"
                    type="number"
                    placeholder="1"
                    min={1}
                    max={10}
                    name="qty"
                    label="Qunatity"
                    {...register(`sizes.${index}.qty`)}
                   
                  />
                  <p className="text-red-500 text-xs">{errors.sizes?.[index]?.qty?.message}</p>
                  </div>
                  <CiCircleMinus
                    size={30}
                    className={`cursor-pointer ${ fields.length === 1
                        ? "text-gray-300 pointer-events-none"
                        : "text-red-500"
                    }`}
                    onClick={() => remove(index)}
                  />
                </div>
              </div>
            ))}

            <div className="mx-auto">
              <button
                className="text-blue-600 text-sm"
                type="button"
                onClick={() => append({ value: "", qty: 1 })}
              >
                Add Size
              </button>
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
          className="w-28 h-28 mx-1"
          size="50"
          setValue={setValue}
        
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
        <div className="flex gap-3">
          <p>Flash Sales</p>
          <Controller
            name="isFlashSale"
             defaultValue={false}
            control={control}
            render={({ field }) => (
              <Toggleslide checked={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        {/* checkboxes */}
        <div className="space-y-3">
          <div className="flex  gap-2 items-center">
            <p className="">Offer:</p>
            <input
              {...register("offer")}
              className="text-center w-5 h-5"
              type="checkbox"
              checked={showOffer}
              onChange={(e) => {
                setShowOffer(!showOffer);
                setValue("offer", e.target.checked);
              }}
            />
              <div>
                <Input type="text"
                 name='colors'
                 placeholder="red,white,blue"
                 register={register}
                 label="Colors"
                 />
              </div>
           
          </div>
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
            <p className="text-red-500 text-sm">
              {errors.deliveryError.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="self-end min-w-[120px] bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md text-white shadow"
        >
          {isedit ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm