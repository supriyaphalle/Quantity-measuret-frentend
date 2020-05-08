
import axios from 'axios';


class DataService{

    
getQuantity = () => {
  return axios.get("http://localhost:8080//allunit");
}

getUnit = (quantity) =>
{
    console.log(quantity)
    return axios.get(`http://localhost:8080//unit/${quantity}`);
}

}
export default new DataService()
