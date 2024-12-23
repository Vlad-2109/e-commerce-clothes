import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../../context/ShopContext';
import { IOrderItem, ShopContextType } from '../../types/types';
import { Title } from '../../components/Title';
import { OrderService } from '../../services/order.service';

export const Orders: React.FC = () => {
  const { token, currency } = useContext(ShopContext) as ShopContextType;

  const [orderData, setOrderData] = useState<(IOrderItem & {
    status: string;
    payment: boolean;
    paymentMethod: string;
    date: number;
  })[]>([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await OrderService.getUserOrders(token);
      if (response.success) {
        const allOrdersItem: any[] = [];
        response.orders.map((order: any) => {
          order.items.map((item: any) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          })
        })
        setOrderData(allOrdersItem.reverse())
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            key={index}
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} alt="image" className="w-16 sm:w-20" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="mt-1">
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
