import { format } from "date-fns";



export function formatDate(dateString) {
  if (!dateString) return "";
  return format(new Date(dateString), "MMM d, yyyy"); 
}
export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const Shipping = (items, subtotalAfterDiscount) => {
 
  if (items.every(i => i.product?.delivery?.freedelivery)) {
    return 0;
  }

 
  if (items.some(i => i.product?.delivery?.cashdelivery)) {
    return 50;
  }

  
  if (subtotalAfterDiscount > 1000) {
    return 0;
  }

 
  return 30;
};
export const isOfferActive = (offer) => {
  if (!offer || !offer.enabled) return false;

  const now = new Date();
  const start = new Date(offer.startdate);
  const end = new Date(offer.enddate);

  return now >= start && now <= end;
};

export const getFinalPrice = (product) => {
  const price = product.amount;

  if (!isOfferActive(product.offer)) {
    return { finalPrice: price, discount: 0 };
  }
  const discount = Math.ceil((price * product.offer.Percentage) / 100);
  const finalPrice =price - discount;

  return { finalPrice, discount };
};
export const SplitName=(fullname)=>{
 const Parts=fullname.trim().split(" ")
 const firstname=Parts[0]
 const lastname=Parts.slice(1).join('')
 return {firstname,lastname}
}