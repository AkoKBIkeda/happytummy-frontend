import React from 'react';
import { CircleAlert, CheckSquare, Shuffle } from 'lucide-react';

export default function MenuDetails({ menu, onClose }) {
  if (!menu) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
        <div className="rounded-lg shadow-lg max-w-md w-full relative">
            {/* Top area with close button */}
            <div className="bg-[#90a9eb] p-3 rounded-t-lg flex justify-end">
                <button
                    className="text-gray-600 hover:text-gray-900 text-lg font-bold"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
        
        <div className="bg-white p-5 rounded-b-lg">
            {/* Menu Name */}
            <h3 className="text-xl font-bold mb-4">{menu.name}</h3>

            {/* Ingredients */}
            {menu.ingredients && menu.ingredients.length > 0 && (
            <div className="mb-4">
                <h4 className="font-semibold mb-1">Ingredients</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                {menu.ingredients.join(', ')}
                </p>
            </div>
            )}

            {/* Nutrition Breakdown */}
            {menu.nutrition && (
                <div className="mb-4">
                    <h4 className="font-semibold mb-1">Nutrition Breakdown</h4>
                    <div className="text-sm text-gray-700">
                        {Object.entries(menu.nutrition).map(([key, value], idx) => (
                            <div
                                key={idx}
                                className="flex py-1"
                            >
                            <span className="w-1/2 text-left capitalize">{key}</span>
                            <span className="w-1/2 text-left">~{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
        )}


        {menu.allergens && menu.allergens.length > 0 && !menu.allergens.includes('None') && (
            <div className="mb-4 text-red-600">
                <div className="flex items-center mb-1">
                <CircleAlert size={16} className="mr-2" />
                <h4 className="font-bold text-red-600">Allergens</h4>
                </div>
                <p className="text-sm">May contain {menu.allergens.join(', ')}</p>
            </div>
            )}

        <div className="flex justify-center items-center gap-4 mt-10 mb-5">
            <button
                type="button"
                className="flex items-center justify-center px-4 py-2 bg-[#e1e9fd] font-semibold text-black rounded-2xl border-2 border-transparent hover:bg-white hover:border-[#e1e9fd] transition cursor-pointer w-40"
                onClick={() => {
                    // handle approve action here
                    // nothing for the MVP
                }}
            >
                Approve <CheckSquare size={18} className="ml-3" />
            </button>
            <button
                type="button"
                className="flex items-center justify-center px-4 py-2 bg-[#e1e9fd] font-semibold text-black rounded-2xl border-2 border-transparent hover:bg-white hover:border-[#e1e9fd] transition cursor-pointer w-40"
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
    </div>
  );
}
