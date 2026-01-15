import React from 'react'
import Input from "../../Components/Inputs/Admininput";
const Addressform = ({register,isrequired=true}) => {
  return (
   <div className="flex flex-col justify-center  gap-3">
                 <button
                    type="button"
                    className="text-xs flex ms-auto text-blue-400"
                    onClick={() => setShowAddressForm(false)}
                  >
                  go back
                  </button>
              <div className="">
                <label className="text-slate-400 relative p-1">
                  First Name
                  <LiaStarOfLifeSolid
                    size={10}
                    className="text-red-400 absolute top-1 -right-1"
                  />
                </label>
                <Input
                  type="text"
                  className="checkout-box"
                  register={register}
                  name="name"
                  rules={{ required: showAddressForm }}
                />
              </div>

              <div className="">
                <label className="text-slate-400 relative p-1">
                  Company Name
                </label>
                <Input
                  type="text"
                  className="checkout-box"
                  register={register}
                  rules={{ required: showAddressForm }}
                  name="companyname"
                />
              </div>
              <div className="">
                <label className="text-slate-400 relative p-1">
                  Street Address
                  <LiaStarOfLifeSolid
                    size={10}
                    className="text-red-400 absolute top-1 -right-1"
                  />
                </label>
                <Input
                  type="text"
                  className="checkout-box"
                  register={register}
                  name="streetaddress"
                  rules={{ required: showAddressForm }}
                />
              </div>

              <div className="">
                <label className="text-slate-400 relative p-1">
                  Apartment,floor,etc.(optional)
                </label>
                <Input
                  type="text"
                  className="checkout-box"
                  register={register}
                  name="apartment"
                  rules={{ required: showAddressForm }}
                />
              </div>
              <div className="">
                <label className="text-slate-400 relative p-1">Town/City</label>
                <Input
                  type="text"
                  className="checkout-box"
                  register={register}
                  name="city"
                  rules={{ required: showAddressForm }}
                />
              </div>
              <div className="">
                <label className="text-slate-400 relative p-1">
                  Phone Number
                  <LiaStarOfLifeSolid
                    size={10}
                    className="text-red-400 absolute top-1 -right-1"
                  />
                </label>
                <Input
                  type="text"
                  className="checkout-box"
                  register={register}
                  name="phonenumber"
                  rules={{ required: showAddressForm }}
                />
              </div>
              <div className="">
                <label className="text-slate-400 relative p-1">
                  Email Address
                  <LiaStarOfLifeSolid
                    size={10}
                    className="text-red-400 absolute top-1 -right-1"
                  />
                </label>
                <Input
                  type="text"
                  className="checkout-box"
                  register={register}
                  name="email"
                  rules={{ required: showAddressForm }}
                />
              </div>
              <div className="flex gap-2 text-xs">
                <input
                  type="checkbox"
                  className="w-5"
                  {...register("issaveaddress")}
                
                />
                <p>Save this information for faster check-out next Time</p>
              </div>
            </div>
  )
}

export default Addressform
