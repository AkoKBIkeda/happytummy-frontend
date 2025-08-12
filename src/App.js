// import React, { useState } from 'react';
// import CategoryButton from './components/CategoryButton';
// import MonthlyMenuList from './components/MonthlyMenuList';
// import MenuDetails from './components/MenuDetails';

// const categories = [
//   { label: 'Standard', id: 'standard' },
//   { label: 'Vege', id: 'vege' },
//   { label: 'Vegan', id: 'vegan' },
//   { label: 'GF', id: 'gf' },
//   { label: 'Halal / No pork', id: 'halal' },
// ];

// export default function App() {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [menus, setMenus] = useState(null);
//   const [selectedMenu, setSelectedMenu] = useState(null);

//   const generateMenus = (categoryId) => {
//     // Simulate AI call — replace with your API call
//     const dummyMenus = [
//       { name: `${categoryId} Menu 1`, description: 'Sample menu description 1' },
//       { name: `${categoryId} Menu 2`, description: 'Sample menu description 2' },
//       { name: `${categoryId} Menu 3`, description: 'Sample menu description 3' },
//     ];
//     setMenus(dummyMenus);
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category.id);
//     setSelectedMenu(null);
//     generateMenus(category.id);
//   };

//   return (
//     <div className="flex flex-col items-center p-6 min-h-screen bg-gray-50">
//       <h1 className="text-4xl font-bold mb-8">Generate Menu</h1>
//       <CategoryButton
//         categories={categories}
//         selectedCategory={selectedCategory}
//         onSelect={handleCategorySelect}
//       />
//       <MonthlyMenuList menus={menus} onSelect={setSelectedMenu} />
//       <MenuDetails menu={selectedMenu} onClose={() => setSelectedMenu(null)} />
//     </div>
//   );
// }

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu/:category" element={<MenuPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
