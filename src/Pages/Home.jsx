import { useState, useEffect } from "react";
import ProductList from "./components/ProductList";

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 10; 
  const [isLoading , setIsLoading]=useState([false])
  
  const fetchProducts = async () => {
      try {
        setIsLoading(true)
          const response = await fetch('https://ecommerce.routemisr.com/api/v1/products');
          const data = await response.json();

          if (data && data.data) {
              setProducts(data.data); 
              setTotalPages(Math.ceil(data.data.length / productsPerPage)); 
              console.log(data.data)
          } else {
              console.error('Unexpected data format:', data);
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
      finally {
        setIsLoading(false); }
  };

  
  useEffect(() => {
      fetchProducts();
  }, []);

 
  const currentItems = products.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
  );

  
  const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
      }
  };

  return (
    <>
    
      <div className="w-full h-[400px] mx-auto my-5 flex items-center justify-center">
        <img
          src="https://cdn.printnetwork.com/production/assets/5966561450122033bd4456f8/imageLocker/blog-description/blog/sales_banners.jpg"
          alt="Sales Banner"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      <div className="font-bold text-6xl underline pl-10">
        <h1>Shop Now</h1>
      </div>


      {isLoading ? (
    <div className="flex justify-center items-center my-10 ">
    <img
        src="https://media.tenor.com/3eHyI_chi_sAAAAM/the-simpsons-homer-simpson.gif" 
        frameBorder="0"
        width="360px" 
        height="270px" 
        style={{ 
            WebkitBackfaceVisibility: 'hidden', 
            WebkitTransform: 'scale(1)' 
        }}
        alt="Homer Simpson GIF"
    />
</div>
) : null}

      <ProductList
        currentItems={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
}

export default Home;
