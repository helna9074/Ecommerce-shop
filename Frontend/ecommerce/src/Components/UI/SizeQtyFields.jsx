import { CiCircleMinus } from "react-icons/ci";

const SizeQtyFields = ({
  fields,
  register,
  errors,
  remove,
  allowEditSize = true,
  allowRemove = true,
}) => {
  return (
    <div className="flex flex-col gap-3">
      {fields.map((item, index) => (
        <div key={item.id} className="flex gap-3 items-center">
          
          {/* SIZE */}
          <div className="flex flex-col">
            <label className="text-sm">Size</label>
            <input
              type="text"
              disabled={!allowEditSize}
              className="rounded-md border px-3 py-2"
              {...register(`sizes.${index}.value`)}
            />
            <p className="text-red-500 text-xs">
              {errors.sizes?.[index]?.value?.message}
            </p>
          </div>

          {/* QTY */}
          <div className="flex flex-col">
            <label className="text-sm">Qty</label>
            <input
              type="number"
              min={0}
              className="rounded-md border px-3 py-2 w-20"
              {...register(`sizes.${index}.qty`)}
            />
            <p className="text-red-500 text-xs">
              {errors.sizes?.[index]?.qty?.message}
            </p>
          </div>

          {/* REMOVE */}
          {allowRemove && (
            <CiCircleMinus
              size={26}
              className="cursor-pointer text-red-500"
              onClick={() => remove(index)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SizeQtyFields;
