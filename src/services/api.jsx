import axios from "axios";

export default axios.create({
    baseURL: 'https://testedeploybackm5-8b207db3eb59.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

