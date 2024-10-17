import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (cityName, { rejectWithValue }) => {
    if (!cityName) {
        return rejectWithValue('No city name provided');
      }
    try {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=8c8dd9b833410fa756520c8e710d5ccd`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.length === 0) {
        return rejectWithValue('City not found');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWeatherByCoords = createAsyncThunk(
    'data/fetchWeatherByCoords',
    async ({ lat, lon }, { rejectWithValue }) => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=8c8dd9b833410fa756520c8e710d5ccd`);
        if (!response.ok) throw new Error('Network response was not ok');
        const weatherData = await response.json();
        return weatherData;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    items: [],
    weatherInfo: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    resetDataState: (state) => {
      state.items = [];
      state.weatherInfo = {};
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchWeatherByCoords.fulfilled, (state, action) => {
        const { lat, lon } = action.meta.arg;
        state.weatherInfo[`${lat},${lon}`] = action.payload;
      });
  },
});

export const { resetDataState } = dataSlice.actions;
export default dataSlice.reducer;