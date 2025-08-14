import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryButtons from '../components/CategoryButtons';
import Header from '../components/Header';
import axios from "axios";
import { baseUrl } from "../constants";

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

  const handleSelect = (cat) => {
    setSelectedCategory(cat.id);
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: baseUrl + "api/monthly-menu/?dietary="+cat.label,
        headers: {},
      };
  
      axios
        .request(config)
        .then((response) => {        
          navigate(`/menu/${cat.id}`, { state: { menuData: response.data } });
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <div className="p-10 space-y-4 max-w-full justify-center">
      <Header/>
      <h1 className="text-3xl font-bold mb-10 pl-5 pb-20 text-center">Generate Menu</h1>
      <CategoryButtons
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleSelect}
      />
    </div>
  );
}
