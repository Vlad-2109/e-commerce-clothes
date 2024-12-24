import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';
import { AdminContextType, IOrder } from '../../types/types';
import { OrderService } from '../../services/order.service';
import { assets } from '../../assets/admin_assets/assets';

export const Orders: React.FC = () => {
  const { token, currency } = useContext(AdminContext) as AdminContextType;

  const [orders, setOrders] = useState<IOrder[]>([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await OrderService.getOrders(token);
      if (response.success) {
        setOrders(response.orders!.reverse());
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (e: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    const status = e.target.value;
    try {
      const response = await OrderService.updateStatus(orderId, status, token);
      if (response.success) {
        await fetchAllOrders();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div className="">{orders.map((order, index) => (
        <div
          className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'
          key={index}>
          <img className='w-12' src={assets.parcel_icon} alt="parcel-icon" />
          <div>
            <div>{order.items.map((item, index) => {
                if (index === order.items.length-1) {
                  return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                } else {
                  return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span> ,</p>
                }
              })}
            </div>
            <p className='mt-3 mb-2 font-semibold'>{order.address.firstName + ' ' + order.address.lastName}</p>
            <div>
              <p>{order.address.street + ', '}</p>
              <p>{order.address.city + ', ' + order.address.state + ', ' + order.address.country + ', ' + order.address.zipcode}</p>
            </div>
            <p>{order.address.phone}</p>
          </div>
          <div>
            <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
            <p className='mt-3'>Payment Method : {order.paymentMethod}</p>
            <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
            <p>Date : {new Date(order.date).toLocaleDateString()}</p>
          </div>
          <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
          <select
            className='p-2 font-semibold'
            value={order.status}
            onChange={(e) => statusHandler(e, order._id)}
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
      </div>
    </div>
  );
};
