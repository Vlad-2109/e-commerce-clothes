import { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import { ShopContextType } from '../../types/types';
import { OrderService } from '../../services/order.service';
import { toast } from 'react-toastify';

export const Verify: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const { token, setCartItems } = useContext(ShopContext) as ShopContextType;

  const verifyPaymant = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await OrderService.verifyStripe(orderId!, success!, token);
      if (response.success) {
        setCartItems({});
        navigate('/orders')
      } else {
        navigate('/cart')
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    verifyPaymant();
  }, [token]);

  return <></>;
};
