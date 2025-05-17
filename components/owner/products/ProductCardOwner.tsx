import React from "react";
import { Package2, Edit, Trash2 } from "lucide-react";

interface SalonOwnerProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  id: string;
  inventory: number;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

function SalonOwnerProductCard({ 
  name, 
  price, 
  imageUrl, 
  id, 
  inventory, 
  description,
  onEdit,
  onDelete
}: SalonOwnerProductCardProps) {
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };
  
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all flex flex-col ">
      <div className="w-full h-40 ">
        <img
          src={imageUrl || "/api/placeholder/400/320"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex justify-between items-start flex-1">
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-800 mb-1">{name}</h3>
          <p className="text-amber-600 font-semibold text-sm mb-2">${typeof price === 'number' ? price.toFixed(2) : 'N/A'}kr.</p>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
        </div>

        <div className="flex flex-col items-end gap-2 ml-4">
          <div className="flex items-center text-gray-600 mb-3">
            <Package2 className="w-4 h-4 mr-1" />
            <span className={`text-sm font-medium ${inventory <= 5 ? 'text-red-500' : 'text-green-600'}`}>
              {inventory} in stock
            </span>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleEditClick}
              className="p-1 text-gray-500 hover:text-[#dba052] focus:outline-none cursor-pointer"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDeleteClick}
              className="p-1 text-gray-500 hover:text-red-500 focus:outline-none cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalonOwnerProductCard;