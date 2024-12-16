import { useContext, useState } from 'react';
import { assets } from '../../assets/admin_assets/assets';
import { AdminContextType, IImages } from '../../types/types';
import { ProductService } from '../../services/product.service';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';

export const Add: React.FC = () => {

  const { token } = useContext(AdminContext) as AdminContextType;

  const [images, setImages] = useState<IImages>({
    image1: '',
    image2: '',
    image3: '',
    image4: '',
  });

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>('Men');
  const [subCategory, setSubCategory] = useState<string>('Topwear');
  const [bestseller, setBestseller] = useState<boolean>(false);
  const [sizes, setSizes] = useState<string[]>([]);

  const resetForm = () => {
    setName('');
    setDescription('');
    setImages({
      image1: '',
      image2: '',
      image3: '',
      image4: '',
    });
    setPrice(0);
    setCategory('Men');
    setSubCategory('Topwear');
    setBestseller(false);
    setSizes([]);
  }

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages((prevValues) => ({...prevValues, [e.target.id]: e.target.files![0]}));
  };

  const onSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price.toString());
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller.toString());
      formData.append('sizes', JSON.stringify(sizes));

      images.image1 && formData.append('image1', images.image1);
      images.image2 && formData.append('image2', images.image2);
      images.image3 && formData.append('image3', images.image3);
      images.image4 && formData.append('image4', images.image4);

      const response = await ProductService.addProduct(formData, token);
      if (response.success) {
        toast.success('Product Added');
        resetForm();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);

    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 hover:cursor-pointer"
              src={!images.image1 ? assets.upload_area : URL.createObjectURL(images.image1)}
              alt="upload-area"
            />
            <input
              onChange={onChangeImageHandler}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 hover:cursor-pointer"
              src={!images.image2 ? assets.upload_area : URL.createObjectURL(images.image2)}
              alt="upload-area"
            />
            <input
              onChange={onChangeImageHandler}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 hover:cursor-pointer"
              src={!images.image3 ? assets.upload_area : URL.createObjectURL(images.image3)}
              alt="upload-area"
            />
            <input
              onChange={onChangeImageHandler}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 hover:cursor-pointer"
              src={!images.image4 ? assets.upload_area : URL.createObjectURL(images.image4)}
              alt="upload-area"
            />
            <input
              onChange={onChangeImageHandler}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          placeholder="Write content here"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div onClick={() => setSizes((prev) => prev.includes('S') ? prev.filter((item) => item !== 'S') : [...prev, 'S'])}>
            <p
              className={`${sizes.includes('S') ? 'bg-pink-100' : 'bg-slate-200'} hover:bg-slate-300 px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes('M') ? prev.filter((item) => item !== 'M') : [...prev, 'M'])}>
            <p
              className={`${sizes.includes('M') ? 'bg-pink-100' : 'bg-slate-200'} hover:bg-slate-300 px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes('L') ? prev.filter((item) => item !== 'L') : [...prev, 'L'])}>
            <p
              className={`${sizes.includes('L') ? 'bg-pink-100' : 'bg-slate-200'} hover:bg-slate-300 px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes('XL') ? prev.filter((item) => item !== 'XL') : [...prev, 'XL'])}>
            <p
              className={`${sizes.includes('XL') ? 'bg-pink-100' : 'bg-slate-200'} hover:bg-slate-300 px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes('XXL') ? prev.filter((item) => item !== 'XXL') : [...prev, 'XXL'])}>
            <p
              className={`${sizes.includes('XXL') ? 'bg-pink-100' : 'bg-slate-200'} hover:bg-slate-300 px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black hover:bg-slate-900 text-white"
      >
        ADD
      </button>
    </form>
  );
};
