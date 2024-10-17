import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherByCoords } from '../../redux/dataSlice';
import FavoritesDropdown from '../Dropdown/favoritesDropdown';
import { fetchData, resetDataState } from '../../redux/dataSlice';

const CitiesTable = () => {
    const dispatch = useDispatch();
    const { items, weatherInfo, status, error } = useSelector(state => state.data);
    const [selectedCities, setSelectedCities] = useState(() => {
        const storedCities = localStorage.getItem('selectedCities');
        return storedCities ? JSON.parse(storedCities) : {};
    });
    const [selectedCityKey, setSelectedCityKey] = useState("");

    useEffect(() => {
        localStorage.setItem('selectedCities', JSON.stringify(selectedCities));
    }, [selectedCities]);

    const handleCheckboxChange = (cityName, lat, lon) => {
        const key = `${lat},${lon}`;
        setSelectedCities(prev => ({
            ...prev,
            [key]: !prev[key] ? { name: cityName, lat, lon } : undefined
        }));
    };

    const handleCitySelect = (cityName) => {
        dispatch(resetDataState());
        dispatch(fetchData(cityName));
    };

    useEffect(() => {
        if (status === 'succeeded') {
          items.forEach(item => {
            dispatch(fetchWeatherByCoords({ lat: item.lat, lon: item.lon }));
          });
        }
      }, [dispatch, items, status]);

    if (status === 'loading') return <p>Loading...</p>;
    if (error) return (
        <div>
        Choose your favorite city: <FavoritesDropdown selectedCities={selectedCities} onSelect={handleCitySelect} />
        <p>Error: {error}</p>
        </div>);

    return (
        <div>
            Choose your favorite city: <FavoritesDropdown selectedCities={selectedCities} onSelect={handleCitySelect} /> 
            {items.filter(item => {
                const key = `${item.lat},${item.lon}`;
                return selectedCityKey === "" || key === selectedCityKey;
            }).map((item, index) => {
                const weather = weatherInfo[`${item.lat},${item.lon}`];
                const key = `${item.lat},${item.lon}`;
                return (
                    <div key={index}>
                        <h3>{item.name}, {item.country}, Geo coords [{item.lat}, {item.lon}]</h3>
                        {weather ? (
                            <div>
                                <p>Temperature: {weather.main.temp} °C; Humidity: {weather.main.humidity} %; Wind: {weather.wind.speed} m/s</p>
                            </div>
                        ) : (
                            <p>Loading weather data...</p>
                        )}
                        <input
                            type="checkbox"
                            checked={!!selectedCities[key]}
                            onChange={() => handleCheckboxChange(item.name, item.lat, item.lon)}
                        />
                        Favorite City
                        <hr></hr>
                    </div>
                );
            })}
        </div>
    );
};

export default CitiesTable;