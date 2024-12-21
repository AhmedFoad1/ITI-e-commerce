import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState(""); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      const data = await response.json();

      if (data && data.data) {
        setProduct(data.data);
        setMainImage(data.data.imageCover); 
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="https://media.tenor.com/3eHyI_chi_sAAAAM/the-simpsons-homer-simpson.gif"
          alt="Loading"
          width="360"
          height="270"
          className="scale-100"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found.
      </div>
    );
  }


  const handleNext = () => {
    if (currentIndex < product.images.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-10">
      
      <div className="flex flex-col lg:flex-row gap-6">
        
        <div className="flex-1">
          <img
            src={mainImage}
            alt={product.title}
            className="w-full h-auto rounded-lg"
          />
          
          <div className="relative mt-4">
            {product.images && product.images.length > 5 && (
              <>
                <button
                  onClick={handlePrev}
                  className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow bg-transparent ${
                    currentIndex === 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-200"
                  }`}
                  disabled={currentIndex === 0}
                >
                  <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </button>
                <button
                  onClick={handleNext}
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full shadow bg-transparent ${
                    currentIndex >= product.images.length - 5
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-200"
                  }`}
                  disabled={currentIndex >= product.images.length - 5}
                >
                  <FontAwesomeIcon icon={faArrowRight} size="lg" />
                </button>
              </>
            )}
            <div className="flex space-x-4 overflow-x-auto">
              {product.images &&
                product.images
                  .slice(currentIndex, currentIndex + 5)
                  .map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Product Image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer"
                      onClick={() => setMainImage(img)} 
                    />
                  ))}
            </div>
          </div>
        </div>

        
        <div className="flex-1 grid grid-rows-[auto,1fr,auto,auto] gap-4">
         
          <div className="h-30 overflow-hidden">
            <h1 className="text-2xl font-bold">{product.title}</h1>
          </div>

         
          <div className="h-30 overflow-hidden">
            <p className="text-gray-700 overflow-ellipsis">
              {product.description}
            </p>
          </div>

         
          <div className="h-20 overflow-hidden">
            <p className="text-sm text-gray-500">
              Brand: {product.brand?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Category: {product.category?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Subcategory: {product.subcategory?.[0]?.name || "N/A"}
            </p>
          </div>

         
          <div className="h-10">
            <p className="text-xl font-semibold">Price: ${product.price}</p>
          </div>

         
          <div className="self-start">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
