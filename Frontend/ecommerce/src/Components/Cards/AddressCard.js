import React from 'react'

const AddressCard = ({onSelect,selected,address}) => {
  return (
     <div
    className={`border p-3 w-full cursor-pointer ${
      selected ? "border-black" : "border-gray-300"
    }`}
    onClick={() => onSelect(address._id)}
  >
    <div className="flex items-start gap-2">
      <input
        type="radio"
        checked={selected}
        onChange={() => onSelect(address._id)}
      />
      <div className="text-sm">
        <p className="font-medium">{address.address.firstName}</p>
        <p>{address.address.street}</p>
        <p>{address.address.city}</p>
        <p>{address.address.phone}</p>
      </div>
    </div>
  </div>
  )
}

export default AddressCard
