import axios from 'axios';

axios.defaults.baseURL = 'https://apilightmv.aoscdn.com';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const themesAPI = params=>{
    return  axios.get('/api/theme/tags/',params).then(res=>res.data ).catch(err=>err);
}
