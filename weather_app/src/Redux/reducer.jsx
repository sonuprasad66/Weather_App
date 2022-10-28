import { accessData, saveData } from "../cookies/cookies";
import * as types from "./actionTypes";
const initState = {
  weatherData: {},
  currentLocation: accessData("city") || "",
  map: "",
  latitude: "",
  langitude: "",
  error: "",
  forecast: [],
  isLoading: true,
};

export const reducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.REQUEST_OF_DATA: {
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    }
    case types.GET_CURRENT_LOCATION: {
      return {
        ...state,
        currentLocation: payload,
        isLoading: false,
        error: false,
      };
    }
    case types.GET_CURRENT_WEATHER: {
      return {
        ...state,
        error: false,
        weatherData: payload,
        isLoading: false,
      };
    }
    case types.GET_WEATHER_BY_LOCATION: {
      const { data, city } = payload;

      saveData("city", city);
      return {
        ...state,
        error: false,
        weatherData: data,
        currentLocation: city,
        isLoading: false,
      };
    }
    case types.GET_WEATHER_FORECAST: {
      return {
        ...state,
        forecast: payload,
        error: false,
        isLoading: false,
      };
    }
    case types.GET_LANGITUDE_OR_LATITUDE: {
      const { langitude, latitude } = payload;
      return {
        ...state,
        isLoading: false,
        error: false,
        langitude: langitude,
        latitude: latitude,
      };
    }
    case types.GET_ERROR: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }
    case types.GET_MAP: {
      return {
        ...state,
        map: payload,
        error: false,
      };
    }
    default:
      return state;
  }
};
