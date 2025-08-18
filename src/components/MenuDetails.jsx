import React from 'react';
import { CircleAlert, CheckSquare, Shuffle } from 'lucide-react';

export default function MenuDetails({ menu, onClose }) {
  if (!menu) return null;
  console.log("MenuDetails menu:", menu);

  // Helper function for Allergens
  function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Menu Name */}
        <h3 className="text-xl font-bold mb-4">{menu.name}</h3>

        {/* Menu Description */}
         <div className="mb-4">
            <h4 className="font-semibold mb-1">Description</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{menu.description}</p>
        </div>
        
        {/* Ingredients */}
        {menu.ingredient_names && menu.ingredient_names.length > 0 && (
        <div className="mb-4">
            <h4 className="font-semibold mb-1">Ingredients</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
            {menu.ingredient_names.join(', ')}
            </p>
        </div>
        )}

        {/* Nutrition Breakdown */}
        <div className="mb-4">
            <h4 className="font-semibold mb-1">Nutrition Breakdown</h4>
            <div className="text-sm text-gray-700">
                <div className="flex py-1">
                    <span className="w-1/2 text-left">Energy</span>
                    <span className="w-1/2 text-left">~{Math.round(menu.total_energy_kj)} kcal</span>
                </div>
                <div className="flex py-1">
                    <span className="w-1/2 text-left">Protein</span>
                    <span className="w-1/2 text-left">~{menu.total_protein.toFixed(1)} g</span>
                </div>
                <div className="flex py-1">
                    <span className="w-1/2 text-left">Fat</span>
                    <span className="w-1/2 text-left">~{menu.total_fat.toFixed(1)} g</span>
                </div>
                <div className="flex py-1">
                    <span className="w-1/2 text-left">Carbohydrates</span>
                    <span className="w-1/2 text-left">~{menu.total_carbs.toFixed(1)} g</span>
                </div>
                <div className="flex py-1">
                    <span className="w-1/2 text-left">Fibre</span>
                    <span className="w-1/2 text-left">~{menu.total_fiber.toFixed(1)} g</span>
                </div>
            </div>
        </div>
        

        {/* Allergens */}
        {menu.allergens && menu.allergens.length > 0 && (
            <div className="mb-4 text-red-600">
            <div className="flex items-center mb-1">
                <CircleAlert size={16} className="mr-2" />
                <h4 className="font-bold text-red-600">Allergens</h4>
            </div>
            <p className="text-sm">
                May contain {menu.allergens.map(a => capitalizeFirst(a)).join(', ')}
            </p>
            </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-10 mb-5">
            <button
                type="button"
                className="flex items-center justify-center px-4 py-2 bg-[#e1e9fd] text-black rounded-2xl border-2 border-transparent hover:bg-white hover:border-[#e1e9fd] transition cursor-pointer w-40"
                onClick={() => {
                    // handle approve action here
                    // nothing for the MVP
                }}
            >
                Approve <CheckSquare size={18} className="ml-3" />
            </button>
            <button
                type="button"
                className="flex items-center justify-center px-4 py-2 bg-[#e1e9fd] text-black rounded-2xl border-2 border-transparent hover:bg-white hover:border-[#e1e9fd] transition cursor-pointer w-40"
                onClick={() => {
                    // handle approve action here
                    // nothing for the MVP
                }}
            >
                Change <Shuffle size={18} className="ml-3" />
            </button>
        </div>
      </div>
    </div>
  );
}
