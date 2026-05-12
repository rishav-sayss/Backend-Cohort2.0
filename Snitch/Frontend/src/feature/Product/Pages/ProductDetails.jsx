 import React, { useEffect } from 'react'
 
 function ProductDetails() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

   return (
    <div >
      <h1 className='text-2xl font-semibold text-white'>
        product details
      </h1>
    </div>
   )
 }
 
 export default ProductDetails
 
