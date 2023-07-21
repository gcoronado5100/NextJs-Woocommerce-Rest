import { isArray, isEmpty } from "lodash";
import Product from "./Product";

const Products = ({ products }) => {
  if (isEmpty(products) || !isArray(products)) {
    return null;
  }

  return (
    <div className='flex flex-wrap -mx-22 overflow-hidden'>
      {products.length
        ? products.map((product) => {
            
            return (
              <Product
                key={product?.id}
                product={product} 
              />
            );
          })
        : null}
    </div>
  );
};

export default Products;
