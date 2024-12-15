import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ProductService } from '../../services/product.service';
import { AdminContextType, IGetProduct } from '../../types/types';
import { AdminContext } from '../../context/AdminContext';

export const List: React.FC = () => {

  const { currency, token } = useContext(AdminContext) as AdminContextType;


  const [list, setList] = useState<IGetProduct[]>([]);

  const getList = async () => {
    try {
      const response = await ProductService.getProductsList();
      if (response.success) {
        setList(response.products!);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id: string) => {
    try {
      const response = await ProductService.deleteProductById(id, token);
      if (response.success) {
        toast.success('Product Deleted');
        await getList();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* ------- List Table Title ------- */}

        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ------- Products List ------- */}

        {list.map((item, index) => (
          <div
            className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'
            key={index}
          >
            <img className='w-12' src={item.image[0]} alt="image" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className='text-right md:text-center cursor-pointer text-lg'
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
