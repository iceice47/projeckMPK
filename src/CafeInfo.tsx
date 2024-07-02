import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import './CafeInfo.css'; // Import CSS file for styling
import NewPage from './NewPage'; 
import RestaurantDetails from './RestaurantDetails'; // Import RestaurantDetails component

interface OperationTime {
  day: string;
  time_open: string;
  time_close: string;
}

interface Restaurant {
  id: number;
  name: string;
  categories: string[];
  profile_image_url: string;
  images: string[];
  operation_time: OperationTime[];
  address: string;
  rating: number;
}

const CafeInfo: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  useEffect(() => {
    fetch('/MPK_example_data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRestaurants(data);
      })
      .catch(error => console.error('Error fetching the data:', error));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target.type === 'text') {
      setSearchTerm(event.target.value);
    } else if (event.target.type === 'select-one') {
      setCategoryFilter(event.target.value);
    }
  };

  // Filter restaurants based on search term and category filter
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === '' || restaurant.categories.includes(categoryFilter))
  );

  if (restaurants.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="restaurant-list">
        <div className="search-container">
          <select
            value={categoryFilter}
            onChange={handleSearch}
            className="category-filter"
          >
            <option value="">Select category...</option>
            {/* Dynamically populate options from unique categories */}
            {restaurants.map((restaurant, index) => (
              restaurant.categories.map((category, idx) => (
                <option key={idx} value={category}>{category}</option>
              ))
            ))}
          </select>
          <input
            type="text"
            placeholder="Search name"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="restaurants-container">
          {filteredRestaurants.map((restaurant) => (
            <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`} className="restaurant-card">
              <img className="restaurant-image" src={restaurant.profile_image_url} alt={`${restaurant.name} profile`} />
              <div className="restaurant-details">
                <h2 className="restaurant-name">{restaurant.name}</h2>
                <ul className="operation-list">
                  {restaurant.operation_time?.map((time, index) => {
                    const currentDate = new Date();
                    const currentDay = currentDate.toLocaleDateString('en-US', { weekday: 'long' });

                    if (time.day === currentDay) {
                      return (
                        <li key={index} className="operation-time">
                          {time.day}: {time.time_open} - {time.time_close}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
                <p className="restaurant-rating">
                  <span className="rating-label">Rating:</span>
                  <span className="rating-value">{restaurant.rating}</span>
                </p>

                <h3 className="operation-times">Operation Times</h3>
                <div className="image-gallery">
                  {restaurant.images?.map((image, index) => (
                    <img key={index} className="gallery-image" src={image} alt={`${restaurant.name} ${index + 1}`} />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Define Routes outside of restaurant-list div */}
      <Routes>
        <Route path="/restaurant/:id" element={<RestaurantDetails restaurants={restaurants} />} />
      </Routes>
    </Router>
  );
};

export default CafeInfo;
