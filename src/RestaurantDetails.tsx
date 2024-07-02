import React from 'react';
import { useParams } from 'react-router-dom';
import { Restaurant } from './CafeInfo'; // Import Restaurant interface from CafeInfo.tsx

interface RestaurantDetailsProps {
  restaurants: Restaurant[];
}

const RestaurantDetails: React.FC<RestaurantDetailsProps> = ({ restaurants }) => {
  const { id } = useParams<{ id: string }>();
  const restaurant = restaurants.find(r => r.id === parseInt(id || '0', 10)); // Provide a default value for parseInt

  if (!restaurant) {
    return <div>Restaurant not found!</div>;
  }

  return (
    <div className="restaurant-details">
      <h2 className="restaurant-name">{restaurant.name}</h2>
      <ul className="operation-list">
        {restaurant.operation_time?.map((time, index) => (
          <li key={index} className="operation-time">
            {time.day}: {time.time_open} - {time.time_close}
          </li>
        ))}
      </ul>

      <h3 className="operation-times">Operation Times</h3>
      <div className="image-gallery">
        {restaurant.images?.map((image, index) => (
          <img key={index} className="gallery-image" src={image} alt={`${restaurant.name} ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;
