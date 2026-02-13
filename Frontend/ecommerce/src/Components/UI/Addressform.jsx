import React from 'react'
import Input from "../../Components/Inputs/Admininput";
import { LiaStarOfLifeSolid } from 'react-icons/lia';
const Addressform = ({register,isrequired=true,errors}) => {
  return (
    <div className="flex flex-col gap-2">
              
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
                  name="firstname"
                  rules={{ required: isrequired }}
                />
              </div>
              {errors.firstname && (
  <p className="text-red-500 text-xs">{errors.firstname.message}</p>
)}

              <div className="">
                <label className="text-slate-400 relative p-1">
                  Last Name
                  <LiaStarOfLifeSolid
                    size={10}
                    className="text-red-400 absolute top-1 -right-1"
                  />
                </label>
                <Input
                  type="text"
                  className="checkout-box"
                  register={register}
                  name="lastname"
                  rules={{ required: isrequired }}
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
                  rules={{ required: isrequired }}
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
                  name="street"
                  rules={{ required: isrequired }}
                />
              </div>
{errors.street && (
  <p className="text-red-500 text-xs">{errors.street.message}</p>
)}

              <div className="">
                <label className="text-slate-400 relative p-1">
                  Apartment,floor,etc.(optional)
                </label>
                <Input
                  type="text"
                  className="checkout-box"
                  register={register}
                  name="apartment"
                  rules={{ required: isrequired }}
                />
              </div>
              <div className="">
                <label className="text-slate-400 relative p-1">Town/City</label>
                <Input
                  type="text"
                  className="checkout-box"
                  register={register}
                  name="city"
                  rules={{ required: isrequired }}
                />
              </div>
              {errors.city && (
  <p className="text-red-500 text-xs">{errors.city.message}</p>
)}

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
                  name="phone"
                  rules={{ required: isrequired }}
                />
              </div>
              {errors.phone && (
  <p className="text-red-500 text-xs">{errors.phone.message}</p>
)}

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
                  rules={{ required: isrequired }}
                />
              </div>
              {errors.email && (
  <p className="text-red-500 text-xs">{errors.email.message}</p>
)}

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
