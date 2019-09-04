import axios from 'axios';

export const getPlaces = async (query: string) => {
  const key =
    process.env.OPEN_CAGE_DATA_KEY || '8c0892514e884f09af7c09a9b067b02b';
 const url = `https://api.opencagedata.com/geocode/v1/geojson?q=${query}&key=${key}&limit=20&no_annotations=1`;
  return axios.get(url);
};
