import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import MenuCalendar from '../components/MenuCalendar';
import MenuDetails from '../components/MenuDetails';
import Header from '../components/Header';
import { Download, CheckSquare, Shuffle } from 'lucide-react';
import { baseUrl } from "../constants";

const categories = [
  { id: 'standard', label: 'Standard' },
  { id: 'vege', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gf', label: 'Gluten Free' },
  { id: 'halal', label: 'No Pork & Halal' },
];

// Map frontend category id to backend dietary query label exactly as backend expects
const dietaryMap = {
  standard: 'Standard',
  vege: 'Vegetarian',
  vegan: 'Vegan',
  gf: 'Gluten-free',  // note dash here to match backend
  halal: 'Halal',
};

export default function MenuPage() {
  const { category } = useParams();
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMenuDetails, setSelectedMenuDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Fetch monthly menu data when category changes
  useEffect(() => {
    async function fetchMenu() {
      setLoading(true);
      setError(null);
      try {
        const dietaryQuery = dietaryMap[category] || category;
        const res = await axios.get(baseUrl + `api/monthly-menu/?dietary=${encodeURIComponent(dietaryQuery)}`);

        setMenuData(res.data);
      } catch (err) {
        setError(err.message || 'Error fetching menu');
        setMenuData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, [category]);

  // Fetch detailed menu item by mealId
  const handleMenuItemClick = async (mealId) => {
    setLoadingDetails(true);
    try {
      const res = await axios.get(baseUrl + `api/meals/${mealId}/`);
      setSelectedMenuDetails(res.data);
    } catch (err) {
      console.error(err);
      setSelectedMenuDetails(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Close menu details popup
  const handleCloseDetails = () => {
    setSelectedMenuDetails(null);
  };

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!menuData) return <div>No menu data available.</div>;

  // Extract month and year from first menu item
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
