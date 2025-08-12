import React from 'react';

export default function MenuDetails({ menu, onClose }) {
  if (!menu) return null;

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

        {/* Ingredients */}
        {menu.ingredients && menu.ingredients.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Ingredients</h4>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {menu.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Nutrition Breakdown */}
        {menu.nutrition && (
          <div className="mb-4">
            <h4 className="font-semibold mb-1">Nutrition Breakdown</h4>
            <ul className="text-sm text-gray-700">
              {Object.entries(menu.nutrition).map(([key, value], idx) => (
                <li key={idx}>
                  <span className="capitalize">{key}</span>: {value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Allergens */}
        {menu.allergens && menu.allergens.length > 0 && (
          <div>
            <h4 className="font-semibold mb-1">Allergens</h4>
            <p className="text-sm text-red-600">{menu.allergens.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
