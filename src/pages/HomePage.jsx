import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryButtons from '../components/CategoryButtons';
import Header from '../components/Header';

const categories = [
  { id: 'standard', label: 'Standard' },
  { id: 'vege', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gf', label: 'Gluten Free' },
  { id: 'halal', label: 'No Pork & Halal' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

// Just navigate based on the category(dietary) --> MenuPage will fetch data based on the param we pass
  const handleSelect = (cat) => {
    setSelectedCategory(cat.id);
    navigate(`/menu/${cat.id}`);
  };

  return (
    <div className="p-10 space-y-4 max-w-full justify-center">
      <Header />
      <h1 className="text-3xl font-bold mb-10 pl-5 pb-20 text-center">Generate Menu</h1>
      <CategoryButtons
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleSelect}
      />
    </div>
  );
}
