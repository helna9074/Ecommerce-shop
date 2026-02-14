import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axiosInstance from "../../Utils/axiosInstance";
import { API_PATHS } from "../../Utils/Apipaths";
import Modal from "../../Components/UI/Modal";



const StarRating = ({
  productId,
  initialRating,
  reviewWritten: initialreviewWritten,
  status,
  readOnly = false
}) => {

  if (!readOnly && status !== "DELIVERED") {
    return null;
  }

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState("");
  const [reviewWritten, setReviewWritten] = useState(false);

  useEffect(() => {
    setRating(Number(initialRating )|| 0);
    setReviewWritten(initialreviewWritten || false);
  }, [initialRating, initialreviewWritten]);

  const handleRate = async (value) => {
    try {
      const { data } = await axiosInstance.post(API_PATHS.Rating.Addrate, {
        productId,
        rating: value
      });
      setRating(data.rating);
      setReviewWritten(data.reviewWritten);
    } catch (err) {
      console.log(err);
    }
  };

  const submitReview = async () => {
    try {
      await axiosInstance.post(API_PATHS.Rating.Addrate, {
        productId,
        review
      });
      setReviewWritten(true);
      setIsOpen(false);
      setReview("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col gap-2">

      {/* ⭐ STARS */}
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => {
          const value = index + 1;

          /* =========================
             READ ONLY (Product card)
          ========================== */
          if (readOnly) {
            let fillPercentage = 0;

            if (rating >= value) {
              fillPercentage = 100;
            } else if (rating >= value - 0.5) {
              fillPercentage = 50;
            }

            return (
              <div
                key={value}
                className="relative"
                style={{ width: 20, height: 20 }}
              >
                {/* empty star */}
                <FaStar size={20} color="#e4e5e9" />

               
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillPercentage}%` }}
                >
                  <FaStar size={20} color="#ffc107" />
                </div>
              </div>
            );
          }

          /* =========================
             INTERACTIVE (User rating)
          ========================== */
          return (
            <FaStar
              key={value}
              size={20}
              color={value <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onClick={() => handleRate(value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
            />
          );
        })}
      </div>

      {/* TEXT ACTIONS */}
      {!readOnly && rating === 0 && (
        <p className="text-xs text-blue-600 cursor-pointer">
          Rate this Product
        </p>
      )}

      {!readOnly && rating > 0 && !reviewWritten && (
        <p
          className="text-xs text-blue-600 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Write a Review
        </p>
      )}

      {/* REVIEW MODAL */}
      {!readOnly && rating > 0 && !reviewWritten && (
        <Modal
          modalIsOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Write a Review"
          width="w-1/3"
        >
          <label>Write Your Review</label>

          <textarea
            className="w-full h-32 border p-2 outline-none"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <button
            className="btn-secondary mt-4 ms-auto block"
            onClick={submitReview}
          >
            Submit
          </button>
        </Modal>
      )}

    </div>
  );
};

export default StarRating;

// const StarRating = ({ productId, initialRating,reviewWritten:initialreviewWritten,status,readOnly=false }) => {
//   const stars=[]
//   for(let i=1;i<=5;i++){
//     let filledPercentagee=0;
  
//   if(initialRating>=i){
//     filledPercentagee=100
//   }else if(initialRating>=i-0.5){
//     filledPercentagee=50
//   }
// }
//   if(!readOnly&&status!=="DELIVERED"){
//       return null
//     }
  
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const[isOpen,setIsOpen]=useState(false)
//   const[review,setReview]=useState("")
//   const [reviewWritten, setReviewWritten] = useState(false);

//   useEffect(() => {
//     setRating(initialRating || 0);
//     setReviewWritten(initialreviewWritten || false);
//   }, [initialRating, initialreviewWritten]);

//   const handleRate = async (value) => {
//     try {
//       setRating(value);
//       const { data } = await axiosInstance.post(API_PATHS.Rating.Addrate,{
//         productId,
//         rating: value,
//       });
//       setRating(data.rating)
//       setReviewWritten(data.reviewWritten);
//       console.log(data)
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   const SubmitReview=async()=>{
//     try{
//       const {data}=await axiosInstance.post(API_PATHS.Rating.Addrate,{
//         productId,
//         review
//       })
//       setReviewWritten(true)
//       setIsOpen(false)
//       setReview("")
//       console.log(data)
//       console.log(data)
//     }catch(err){
//       console.log(err)
//     }
//   }
//   return (
    
//     <div className="flex flex-col gap-2">
//       <div className="flex gap-1">
//         {[...Array(5)].map((_, index) => {
//           const value = index + 1;
//           return (
//             <FaStar
//               key={value}
//               size={20}
//               color={value <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
//               onClick={!readOnly?()=> handleRate(value):undefined}
//               onMouseEnter={!readOnly?() => setHover(value):undefined}
//               onMouseLeave={!readOnly?() => setHover(0):undefined}
//             />
//           );
//         })}
//       </div>
//       {!readOnly&&rating===0&&(
//          <p className="text-xs text-blue-600 cursor-pointer">Rate this Product</p>
         
//       )}
//       {!readOnly&&rating>0&&!reviewWritten&&(
//         <p className="text-xs text-blue-600 cursor-pointer" onClick={()=>setIsOpen(true)}>Write a Review</p>
//       )}
//       {!readOnly&&rating>0&&!reviewWritten&&(
//  <Modal modalIsOpen={isOpen} onClose={()=>setIsOpen(false)} title="Write a Review" width="w-1/3">
//       <label>Write Your Review</label>
//       <div className="w-full border border-gray-300 rounded-md p-2 h-32"  onKeyDown={(e)=>e.key==="Enter"&&SubmitReview()}> 
// <textarea className="border-0 outline-0 w-full h-full" onChange={(e)=>setReview(e.target.value)} value={review}></textarea>

//       </div>
//       <button type="submit" className="btn-secondary flex ms-auto mt-5" onClick={SubmitReview}>Submit</button>
//      </Modal>
//       )}
//      {readOnly && reviewWritten && (
//       <div className="flex flex-col gap-3">
//         <h5 className="font-bold">Review</h5>
//   <p className="text-sm text-gray-600 italic">
//     “{reviewWritten}”
//   </p>
//   </div>
// )}

       
//     </div>
//   );
// };

// export default StarRating;
