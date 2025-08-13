import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuCalendar from '../components/MenuCalendar';
import MenuDetails from '../components/MenuDetails';
import Header from '../components/Header';
import {Download, CheckSquare, Shuffle} from 'lucide-react';

const categories = [
  { id: 'standard', label: 'Standard' },
  { id: 'vege', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gf', label: 'Gluten Free' },
  { id: 'halal', label: 'No Pork & Halal' },
];

const mockMenuData = {
  startDay: 5, // 0=Su, 1=Mo, 2=Tu, 3=We, 4=Th, 5=Fr, 6=Sa
  daysInMonth: 31,
  menuItems: [
    { date: "2025-08-01", mealId: "1", menuName: "Chicken Curry" },
    { date: "2025-08-04", mealId: "2", menuName: "Veggie Pasta" },
    { date: "2025-08-05", mealId: "3", menuName: "Beef Stew" },
    { date: "2025-08-06", mealId: "4", menuName: "Grilled Fish" },
    { date: "2025-08-07", mealId: "5", menuName: "Quinoa Salad" },
  ],
};

// Mock detailed menu data keyed by mealId
const mockMenuDetailsById = {
  1: {
    name: "Chicken Curry",
    description: "A spicy and flavorful chicken curry with coconut milk.",
    ingredients: ["Chicken", "Curry Powder", "Coconut Milk", "Onions", "Garlic"],
    nutrition: { calories: "500 kcal", protein: "35g", fat: "20g", carbs: "40g" },
    allergens: ["None"],
  },
  2: {
    name: "Veggie Pasta",
    description: "A delicious pasta dish loaded with fresh vegetables.",
    ingredients: ["Pasta", "Tomatoes", "Zucchini", "Basil", "Olive Oil"],
    nutrition: { calories: "400 kcal", protein: "15g", fat: "10g", carbs: "60g" },
    allergens: ["Gluten"],
  },
  3: {
    name: "Beef Stew",
    description: "A hearty beef stew with root vegetables and herbs.",
    ingredients: ["Beef", "Carrots", "Potatoes", "Onions", "Herbs"],
    nutrition: { calories: "600 kcal", protein: "40g", fat: "25g", carbs: "50g" },
    allergens: ["None"],
  },
  4: {
    name: "Grilled Fish",
    description: "A light and zesty grilled fish dish with herbs.",
    ingredients: ["Fish", "Lemon", "Garlic", "Herbs"],
    nutrition: { calories: "350 kcal", protein: "30g", fat: "15g", carbs: "10g" },
    allergens: ["Fish"],
  },
  5: {
    name: "Quinoa Salad",
    description: "A refreshing quinoa salad with cucumbers, tomatoes, and feta cheese.",
    ingredients: ["Quinoa", "Cucumber", "Tomatoes", "Feta Cheese", "Olive Oil"],
    nutrition: { calories: "300 kcal", protein: "10g", fat: "15g", carbs: "30g" },
    allergens: ["Dairy"],
  },
};

export default function MenuPage() {
    const { category } = useParams();
    const [menuData, setMenuData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMenuDetails, setSelectedMenuDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);


// while not connected to the backend
  useEffect(() => {
    // Simulate API delay
    setLoading(true);
    setTimeout(() => {
      setMenuData(mockMenuData);
      setLoading(false);
    }, 500);
  }, [category]);

  // Handler called when user clicks on a menu item in the calendar
  const handleMenuItemClick = (mealId) => {
    setLoadingDetails(true);
    // Simulate fetching detailed data by mealId
    setTimeout(() => {
      const details = mockMenuDetailsById[mealId] || null;
      setSelectedMenuDetails(details);
      setLoadingDetails(false);
    }, 400);
  };

   // Close details popup
  const handleCloseDetails = () => {
    setSelectedMenuDetails(null);
  };

  if (loading) return <div>Loading menu...</div>;
  if (!menuData) return <div>No menu data available.</div>;

  function getMonthYearFromMenuItems(menuItems) {
  if (!menuItems || menuItems.length === 0) return { month: '', year: '' };
  const firstDate = new Date(menuItems[0].date);
  const month = firstDate.toLocaleString('default', { month: 'long' });
  const year = firstDate.getFullYear();
  return { month, year };
}

const { month, year } = getMonthYearFromMenuItems(menuData.menuItems);

const categoryObj = categories.find(c => c.id === category);
const categoryLabel = categoryObj ? categoryObj.label : category;

return (
    <div className="p-10 space-y-4 max-w-full justify-center">
      <Header />

      {/* Title + Buttons container */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        {/* Title */}
        <h1 className="text-2xl text-[#5679C7] font-semibold leading-tight pl-10">
          {categoryLabel} Menu
          <span className="block sm:inline text-black sm:ml-2">
            {month} {year}
          </span>
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <button
            className="flex items-center justify-center px-4 py-2 bg-[#e1e9fd] text-black rounded-2xl hover:bg-white hover:border-2 hover:border-[#e1e9fd] transition cursor-pointer w-full sm:w-40"
            type="button"
          >
            Download <Download size={18} className="ml-3" />
          </button>
          <button
            className="flex items-center justify-center px-4 py-2 bg-[#e1e9fd] text-black rounded-2xl hover:bg-white hover:border-2 hover:border-[#e1e9fd] transition cursor-pointer w-full sm:w-40"
            type="button"
          >
            Approve All <CheckSquare size={18} className="ml-3" />
          </button>
          <button
            className="flex items-center justify-center px-4 py-2 bg-[#e1e9fd] text-black rounded-2xl hover:bg-white hover:border-2 hover:border-[#e1e9fd] transition cursor-pointer w-full sm:w-40"
            type="button"
          >
            Change All <Shuffle size={18} className="ml-3" />
          </button>
        </div>
      </div>

      {/* Calendar */}
      <MenuCalendar
        category={category}
        menuItems={menuData.menuItems}
        startDay={menuData.startDay}
        daysInMonth={menuData.daysInMonth}
        onMenuItemClick={handleMenuItemClick}
      />

      {/* Details popup */}
      {selectedMenuDetails && (
        <MenuDetails menu={selectedMenuDetails} onClose={handleCloseDetails} />
      )}

      {loadingDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-4 rounded shadow">Loading details...</div>
        </div>
      )}
    </div>
  );
}