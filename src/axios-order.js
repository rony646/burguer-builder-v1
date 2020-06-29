import axios from 'axios'

const instance = axios.create({
   baseURL: 'https://react-burguer-builder-50589.firebaseio.com/'
});

export default instance