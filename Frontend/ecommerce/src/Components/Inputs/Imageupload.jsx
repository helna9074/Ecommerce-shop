import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Imageupload = ({
  previewImages,
  setPreviewImages,
  register,
  setValue,
  name,
  error,
  size = 5,
  className,
}) => {
  const replaceIndexRef = useRef(null);
  const { ref, ...rest } = register(name);
  const InputRef = useRef(null);

  const HandleFiles = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    

    if (replaceIndexRef.current !== null) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      const index = replaceIndexRef.current;
      setPreviewImages((prev) => {
        const updated = [...prev];
        if (updated[index]?.preview?.startsWith("blob:")) {
          URL.revokeObjectURL(updated[index].preview);
        }
        updated[index] = { file, preview,url:null, isExisting: false };
        setValue(
          name,
          updated.map((item) => item.file)
        );
        console.log(updated);
        return updated;
      });

      replaceIndexRef.current = null;
      e.target.value = "";
      return;
    }

    const mappedFiles = files.map((file) => ({
      file,
      url:null,
      preview: URL.createObjectURL(file),
      isExisting:false,
    }));
    const updatedFiles = [...previewImages, ...mappedFiles].slice(0, 5);
    console.log("updatedFiles", updatedFiles);
    setPreviewImages(updatedFiles);
    setValue(
      name,
      updatedFiles.map((item) => item.file)
    );
    e.target.value = "";
  };
  const RemoveImage = (index) => {
    setPreviewImages((prev) => {
      const removed = prev[index];

      // revoke blob URL
      if (removed?.preview?.startsWith("blob:")) {
        URL.revokeObjectURL(removed.preview);
      }

      const updated = prev.filter((_, i) => i !== index);

      setValue(
        name,
        updated.map((item) => item.file)
      );

      return updated;
    });
  };
  return (
    <div className="flex flex-col gap-3 h-full">
      <h1 className="text-sm font-semibold">Upload Image</h1>
      <input
        type="file"
        className="hidden"
        ref={(el) => {
          ref(el);
          InputRef.current = el;
        }}
        {...rest}
        multiple
        accept="image/*"
        onChange={HandleFiles}
      />
      <div
        className={`${className} border border-gray-500 rounded-2xl px-3 flex-col  py-2 text-center flex justify-center items-center text-gray-700 outline-none   shadow-sm transition`}
      >
        <FaImage
          className="text-5xl"
          onClick={() => InputRef.current?.click()}
        />
        <p>Upload products images here</p>
      </div>
      <div className="flex gap-3 ">
        {previewImages.map((img, index) => (
          <div
            onClick={() => {
              replaceIndexRef.current = index;
              InputRef.current?.click();
            }}
            key={index}
            className="w-32 h-32 relative rounded-md border border-gray-300 px-3 py-2 text-center flex justify-center items-center text-gray-700 outline-none   shadow-sm transition"
          >
            <img
              src={img.preview}
              alt=""
              className="w-full h-full object-contain"
            />
            <IoMdClose
              className="absolute -top-2 -right-2 text-2xl rounded-full bg-slate-100  "
              onClick={(e) => {
                e.stopPropagation();
                RemoveImage(index);
              }}
            />
          </div>
        ))}
      </div>
      <p className="text-sm text-red-500">{error}</p>
    </div>
  );
};

export default Imageupload;
