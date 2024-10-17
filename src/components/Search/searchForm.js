import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData, resetDataState } from '../../redux/dataSlice';
import SearchInput from './searchInput';

const SearchForm = () => {
    const [cityName, setCityName] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setCityName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetDataState());
        dispatch(fetchData(cityName));
        setCityName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <SearchInput
                value={cityName}
                placeholder="Enter city name"
                onChange={handleInputChange}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;