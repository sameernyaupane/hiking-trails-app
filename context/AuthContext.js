import axios from 'axios'
import * as Device from 'expo-device'
import React, {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'http://hiking-trails.192.168.2.101.nip.io'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({name: '', email: '', token: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [splashLoading, setSplashLoading] = useState(false)
    const [trails, setTrails] = useState([
        { title: 'Shivapuri Bishnudwar Hike'},
        { title: 'Phulchowki Trail Hike'},
        { title: 'Champadevi Trail Hike'},
    ])

    const register = (name, email, password, passwordConfirm) => {
        setIsLoading(true)

        let password_confirmation = passwordConfirm;

        axios.post(`${BASE_URL}/api/register`, 
        {
            name, email, password, password_confirmation
        }).then(res => {
            let userInfo = {name, email}

            setUserInfo(userInfo)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            setIsLoading(false)

            setMessage('User Registered')
        })
        .catch(e => {
            setIsLoading(false)

            console.log('register error ' + e)
        })

    }

    const login = (email, password) => {
        console.log('login api called..')
        setIsLoading(true)
        
        let device_name = Device.modelName

        axios.post(`${BASE_URL}/api/sanctum/token`, 
        {
            email, password, device_name
        }).then(res => {
            console.log('login response:', res.data)

            let token = res.data.token
            let name = res.data.name

            let userInfo = {name, email, token}

            setUserInfo(userInfo)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            setIsLoading(false)

            setMessage(`User Logged In from  device: ${device_name}`)
        })
        .catch(e => {
            setIsLoading(false)

            console.log('login error ' + e)
        })
    }

    const logout = () => {
        console.log('logout api called..')
        setIsLoading(true)
        
        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + userInfo.token
            }
        }

        axios.get(`${BASE_URL}/api/logout`, config).then(res => {
            console.log('logout response:', res.data)
            setIsLoading(false)
        })
        .catch(e => {
            setIsLoading(false)

            console.log('Logout error ', e)
        })

        setUserInfo({name: '', email: '', token: ''})

        setMessage(`You are now logged out.`)
    };

    const isLoggedIn = async () => {
        console.log('isLoggedIn triggered..')
        try {
            setSplashLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)

            if (userInfo) {
                setUserInfo(userInfo)
            }

            setSplashLoading(false)
        } catch (e) {
            setSplashLoading(false)
            console.log(`is logged in error ${e}`)
        }
    };
    
    useEffect(() => {
        isLoggedIn()
    }, [])
 
    return (
        <AuthContext.Provider value={[isLoading, userInfo, splashLoading, message, login, register, logout]}>{children}</AuthContext.Provider>
    )
}