import axios from 'axios';

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const token = null;
  conts setToken = newToken => {
    token = `Bearer ${newToken}`;
  };

  const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
  }

  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }
  
  const update = async (id, newObject) => {
    const response = await axios.put(`${ baseUrl }/${id}`, newObject)
    return response.data
  }
}

export default useResource;