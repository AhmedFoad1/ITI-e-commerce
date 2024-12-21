
import { Link } from 'react-router-dom';
const ProductList = ({ currentItems, currentPage, totalPages, handlePageChange }) => {
    return (
        <div className="md:p-5">
           
            <div 
                className="grid grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-6 mb-4 mt-10"
            >
                {currentItems.map((prod) => (
                    <div 
                        key={prod._id} 
                        className="h-[600px] border border-gray-400 rounded-lg  overflow-hidden flex flex-col items-center m-10 shadow-md shadow-gray-500  hover:shadow-blue-950 hover:shadow-2xl"
                    >
                        <Link 
                            to={(`/detail/${prod._id}`)}
                            className="w-full h-full flex flex-col items-center no-underline hover:text-[#8B0000]"
                        >
                            <div 
                                className="w-full h-[400px] relative overflow-hidden rounded-lg"
                            >
                                <img 
                                    src={prod.imageCover} 
                                    alt={prod.title} 
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <div 
                                className="text-center p-4 flex flex-col justify-between flex-grow"
                            >
                                <h2 
                                    className="text-xl font-bold mb-2 transition-colors duration-300 hover:text-[#8B0000] hover:underline"
                                >
                                    {prod.title.length > 20 ? `${prod.title.substring(0, 20)}...` : prod.title}
                                </h2>
                                <p className="text-gray-500">
                                    {prod.description.length > 30 ? `${prod.description.substring(0, 30)}...` : prod.description}
                                </p>
                                <div>
                                    <p className="text-lg font-bold">${prod.price}</p>
                                    <p className="text-sm text-green-500">Sold: {prod.sold}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

         
<div className="flex justify-center items-center mt-4 space-x-4">
   
<button
        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`px-6 py-3 border rounded-full border-gray-300 text-white transition-colors duration-300 
                    ${currentPage > 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
    >
        Prev.
    </button>
   
    <span className="text-xl font-semibold">
        Page {currentPage} of {totalPages}
    </span>
    
    
        <button
            onClick={() => currentPage < totalPages &&  handlePageChange(currentPage + 1)} 
            disabled={currentPage===totalPages}
            className={`px-6 py-3 border rounded-full border-gray-300 text-black  transition-colors duration-300
                ${currentPage===totalPages?' bg-gray-400 cursor-not-allowed ':'bg-green-600 hover:bg-green-700'}`}
        >
            Next
        </button>
    
</div>

        </div>
    );
};

export default ProductList;
