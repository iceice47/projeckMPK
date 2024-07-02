import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RestaurantDetails from './RestaurantDetails'; // Import RestaurantDetails component
import { Restaurant } from './CafeInfo'; // Import Restaurant interface

interface NewPageProps {
  restaurants: Restaurant[];
}

const NewPage: React.FC<NewPageProps> = ({ restaurants }) => {
  return (
    <Routes>
      <Route path="/restaurant/:id/*" element={<RestaurantDetails restaurants={restaurants} />} />
    </Routes>
  );
};

export default NewPage;
