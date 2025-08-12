import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Pizza, Salad, EggFried, Apple, Bean } from 'lucide-react';
const iconMap = {
  standard: Pizza,
  vegan: Salad,
  vege: EggFried,
  halal: Apple,
  gf: Bean,
};
export default function CategoryButtons({ categories, selectedCategory, onSelect }) {
  return (
    <div className="flex gap-4 flex-wrap justify-center max-w-full">
      {categories.map(cat => {
        const Icon = iconMap[cat.id] || null;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat)}
            className={`w-56 p-5 rounded-lg font-semibold text-black transition ${
              selectedCategory === cat.id
                ? 'bg-[#7A96D7] text-lg'
                : 'bg-[#90A9EB] text-lg hover:bg-[#BAC6F9]'
            } flex items-center justify-center`}
          >
            {Icon && <Icon className="mr-2" size={20} />}
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}