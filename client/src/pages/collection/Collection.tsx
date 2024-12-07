import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../context/ShopContext';
import { assets } from '../../assets/frontend_assets/assets';
import { Title } from '../../components/Title';
import { ProductItem } from '../../components/ProductItem';
import { IProduct, ShopContextType } from '../../types/types';

export const Collection: React.FC = () => {

  const { products } = useContext(ShopContext) as ShopContextType;
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterProducts, setFilterProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (categories.includes(e.target.value)) {
      setCategories(prevValues => prevValues.filter(item => item !== e.target.value));
    } else {
      setCategories(prevValues => [...prevValues, e.target.value]);
    }
  };

  const toggleSubcategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (subCategories.includes(e.target.value)) {
      setSubCategories(prevValues => prevValues.filter(item => item !== e.target.value));
    } else {
      setSubCategories(prevValues => [...prevValues, e.target.value]);
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if (categories.length > 0) {
      productsCopy = productsCopy.filter(product => categories.includes(product.category))
    }

    if (subCategories.length > 0) {
      productsCopy = productsCopy.filter(product => subCategories.includes(product.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [categories, subCategories])

  const onClickHandler = () => {
    setShowFilter((prevValue) => !prevValue);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options*/}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={onClickHandler}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="dropdown-icon"
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
          />
        </p>
        {/* Category Filter*/}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Men'} onChange={toggleCategory}/> Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Women'} onChange={toggleCategory}/> Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Kids'} onChange={toggleCategory}/> Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Topwear'} onChange={toggleSubcategory}/>
              Topwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Bottomwear'} onChange={toggleSubcategory}/>
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className="w-3" value={'Winterwear'} onChange={toggleSubcategory}/>
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          {/* Product Sort */}
          <select className="border-2 border-gray-300 text-sm px-2">
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
