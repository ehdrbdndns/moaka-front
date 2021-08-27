import axios from 'axios';

export const getArchives = async () => {
  const response = await axios.get('http://localhost:4000/archives');
  return response.data;
};

export const getArchivesById = async (id: number) => {
  const response = await axios.get(`http://localhost:4000/posts/${id}`);
  return response.data;
};
