import axios from 'axios';

const happyService = axios.create({
    baseURL: 'http://localhost:3333'
})

export default happyService;