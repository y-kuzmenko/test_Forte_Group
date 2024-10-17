import React, { useState } from 'react';

const FavoritesDropdown = ({ selectedCities, onSelect }) => {
  const selectedCitiesArray = Object.values(selectedCities).filter(Boolean);

  return (
      <select onChange={e => onSelect(e.target.value)}>
      <option value="">Select a city</option>
      {selectedCitiesArray.map((city, index) => (
          <option key={index} value={city.name}>
              {city.name}
          </option>
      ))}
  </select>
  );
};

export default FavoritesDropdown;