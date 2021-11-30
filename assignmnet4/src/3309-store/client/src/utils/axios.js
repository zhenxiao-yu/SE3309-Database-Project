import _axios from 'axios'

const axios = newBaseURL  => {
    const instance = _axios.create({
       //use new baseURL, ( use local host 3001 if no new BaseURL)
        baseUrl: newBaseURL || 'http://localhost:3001',
        timeout: 1000,
    });

    return instance;
}

export { axios }
export default axios();