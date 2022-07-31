import axios from 'axios';
import React, {createContext} from 'react'

export const AuthContext = createContext();

export const BASE_URL = 'http://hiking-trails.192.168.2.101.nip.io';

axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
  })
  
axios.interceptors.response.use(response => {
console.log('Response:', JSON.stringify(response, null, 2))
return response
})

export const AuthProvider = ({children}) => {
    const register = (name, email, password, passwordConfirm) => {
        let password_confirmation = passwordConfirm;

        console.log(name,email, password, password_confirmation);

        axios.post(`${BASE_URL}/api/register`, 
        {
            name, email, password, password_confirmation
        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo);
        })
        .catch(e => {
            console.log('register error ' + e)
        })

    };

    const login = (name, email, password) => {
        axios.post(`${BASE_URL}/api/register`, 
        {

        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo);
        })
        .catch(e => {
            console.log('register error ' + e)
        })

    };

    return (
        <AuthContext.Provider value={[register,login]}>{children}</AuthContext.Provider>
    )
}