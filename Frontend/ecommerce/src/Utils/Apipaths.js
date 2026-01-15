

export const BASE_URL="http://localhost:5000"
export const API_PATHS={
    
        Authadmin:{
            Login:'/login',
            AddCategory:'/add-category',
            getCategory:'/getCategory',
            DeleteCategory:(id)=>`/delete/${id}`,
            EditCategory:(id)=>`/update/${id}`,
            AddProducts:'/addproducts',
            getProducts:'/products',
            EditProduct:(id)=>`/updateProduct/${id}`,
            DeleteProduct:(id)=>`/product/${id}`,
             AddBanner:'/banner',
             GetBanners:'/banner',
             UpdateBanner:(id)=>`/banner/${id}`,
             DeleteBanner:(id)=>`/banner/${id}`,
          
        },
        Authuser:{
            Login:'/login',
            Signup:'/register',
        //  Details:'/getdetails',
         getBanner:'/banner',
         getUser:'/user',
         updateUser:'/user',
        
            getOneProduct:(id)=>`/OneProduct/${id}`,
          getrelatedProducts:(id)=>`/RelatedProducts/${id}`,
          // getExploreProducts:'/Explore-products',
          suggetedProducts:'/suggested-products'

        },
        Cart:{
           addItem:'/cartItems',
           getItems:'/cartItems',
           updateItems:'/cartItems',
           removeItem:(id)=>`/cartItem/${id}`,
           checkoutItem:'/checkout'
        },
        WishList:{
          addItem:(id)=>`/wishItems/${id}`,
          getItems:'/wishlistItems',
          removeItem:(id)=>`/wishItem/${id}`
        },
        Order:{
          placeorder:'/order',
          onlineOrder:'/razorpay-order'
        },
        Address:{
          getAddress:'/address',
          editAddress:(id)=>`/address/${id}`
        },
        Products:{
          // FlashProducts:'All-flashProducts'
           getProducts:'/products',
        }
    
}