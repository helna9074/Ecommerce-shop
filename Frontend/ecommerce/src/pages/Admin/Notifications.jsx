import React, { useEffect, useState } from 'react'
import { API_PATHS } from '../../Utils/Apipaths';
import API from '../../Utils/adminAxios';
import Modal from '../../Components/UI/Modal';
import {useOutletContext} from 'react-router-dom'
import StockUpdateForm from '../../Components/Products/StockUpdateForm';
import { SkeletonCards } from '../../Components/UI/shadcnUI/SkeletonCard';
import useNotifyStore from '../../Store/Notifications';

const Notifications = () => {
     const [notifications, setNotifications] = useState([]);
      const [isopen,setIsOpen]=useState(false)
      const [selectedStock,setSelectedStock]=useState(null)
      const {handleActive}=useOutletContext();
      const[loading,setLoading]=useState(false)
      const { markAllRead } = useNotifyStore();

  useEffect(() => {
    handleActive("Notifications")
    fetchNotifications();
    markAllRead();
  }, []);
   const fetchNotifications = async () => {
    try{
 setLoading(true)
      const { data } = await API.get(
        API_PATHS.Authadmin.Notifications.getAlerts
      );

      setNotifications(data.notifications);
      setSelectedStock(data.notifications[0]?.product)
      const res= await API.put(
          API_PATHS.Authadmin.Notifications.markAllSeen
        );
        console.log(res.data)
    }catch{
      console.log(err)
    }finally{
      setLoading(false)
    }
   
    };
   
  return (
    loading? <SkeletonCards className="h-4 w-24 mb-3 bg-slate-400/30" />:(
 <div className='w-full'>
      
      <h2 className="text-xl font-semibold mb-4">
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            className=" p-5 mb-2  bg-white shadow rounded-2xl "
          >
            {n.message}
            <p className="text-blue-400" onClick={()=>setIsOpen(true)}>add more</p>
          </div>
        ))
      )}
      <Modal modalIsOpen={isopen} onClose={()=>setIsOpen(false)} title="Add Stock" width="w-1/2">
       <StockUpdateForm productId={selectedStock}  setIsOpen={setIsOpen} fetchNotifications={fetchNotifications}/>
      </Modal>
    </div>
    )
   
  )
}

export default Notifications
