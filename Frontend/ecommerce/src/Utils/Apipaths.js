import { get } from "react-hook-form"




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
             Category:{
              getAll:'/allCategories'
             },
             Orders:{
              AllOrders:'/orders',
              updateOrder:(id)=>`/order/${id}`,
              refundOrder:(id)=>`/refund/${id}`,
             },
             Users:{
              getUsers:'/users',
              blockUser:(id)=>`/blockuser/${id}`,
             },
             Expense:{
              addExpense:'/expense',
              getExpense:'/expense',
              deleteExpense:(id)=>`/expense/${id}`,
              updateExpense:(id)=>`/expense/${id}`,
             },
             Notifications:{
              getAlerts:'/notifications',
              markAllSeen:'/notifications',
             },
            Products:{
              getStock:(id)=>`/stock/${id}`,
              updateStock:(id)=>`/stock/${id}`,
            },
            Reports:{
              getReports:'/reports'
            },
            Dashboard:{
             getquickView:'/dashboard/quickview',
             getOrdersView:'/dashboard/ordersview',
             getRecentOrders:'/dashboard/recentorders',
             getSalesAnalytics:'/dashboard/sales',
             getTopCustomers:'/dashboard/topcustomers',
             getBestSellingProducts:'/dashboard/bestsellings',
             getTopCategories:'/dashboard/category',
             getTopRatings:'/dashboard/topratings',
             getRecentexpense:'/dashboard/expenses',
            },
            Report:{
              downloadReport:'/report/download'
            }
           
        },
        

        Authuser:{
            Login:'/login',
            Signup:'/register',
        //  Details:'/getdetails',
         getBanner:'/banner',
         getUser:'/user',
         updateUser:'/user',
         CheckUser:'/auth/check',
        
            getOneProduct:(id)=>`/OneProduct/${id}`,
          getrelatedProducts:(id)=>`/RelatedProducts/${id}`,
          // getExploreProducts:'/Explore-products',
          suggetedProducts:'/suggested-products'

        },
        Search:{
          getsuggestions:'/search/suggestions',
          getSearchProducts:'/search',
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
          onlineOrder:'/razorpay-order',
           getOrders:'/Orders',
           getProduct:(id)=>`/orderproduct/${id}`,
           cancelOrder:(id)=>`/cancelorder/${id}`,
           
        },
        Address:{
          getAddress:'/address',
          editAddress:(id)=>`/address/${id}`,
          deleteAddress:(id)=>`/address/${id}`,
          addAddress:'/address'
        },
        Products:{
          // FlashProducts:'All-flashProducts'
           getProducts:'/products',
           getAllData:'/homeproducts',
           getbanners:'/banners',
           getBestSellings:'/bestsellings'
        },
        Rating:{
         
          Addrate:'/rate'
        },
         Invoice:{
              generateInvoice:(orderId)=>`/invoice/${orderId}`
            }
         
    
}