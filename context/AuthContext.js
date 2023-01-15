import axios from 'axios'
import * as Device from 'expo-device'
import React, {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'http://hiking-trails-api.192.168.2.101.nip.io'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({name: '', email: '', token: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [splashLoading, setSplashLoading] = useState(false)
    const [trails, setTrails] = useState([])
    const [groups, setGroups] = useState([])

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

            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            setUserInfo({name, email, token})

            setIsLoading(false)

            setMessage(`User Logged In from  device: ${device_name}`)

            return token
        })
        .then(token => {
            getTrails(token)
            getGroups(token)
        })
        .catch(e => {
            setIsLoading(false)

            console.log('login error ' + e)
        })

        setIsLoading(false)
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

        setIsLoading(false)

        setUserInfo({name: '', email: '', token: ''})

        setMessage(`You are now logged out.`)
    }

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
    }

    const getTrails = (token) => {
        console.log('get trails api called..')
        console.log(token)

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        axios.get(`${BASE_URL}/api/trails`, config).then(res => {
            setTrails(res.data)

            setMessage(`Trails set`)
        })
        .catch(e => {
            console.log('trails error ', e)
        })
    }

    const createTrail = (details) => {
        console.log('create trails api called..')
        console.log(userInfo.token)

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + userInfo.token
            }
        }

        axios.post(`${BASE_URL}/api/trails`, details, config).then(res => {
            setMessage(`Trail created`)

            //Update trails list
            getTrails(userInfo.token)
        })
        .catch(e => {
            console.log('trails error ', e)
        })
    }

    const updateTrail = (details, id) => {
        console.log('update trails api called..')
        console.log(userInfo.token)

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + userInfo.token
            }
        }

        axios.put(`${BASE_URL}/api/trails/` + id, details, config).then(res => {
            setMessage(`Trail updated`)

            //Update trails list
            getTrails(userInfo.token)
        })
        .catch(e => {
            console.log('trails error ', e)
        })
    }

    const deleteTrail = (id) => {
        console.log('delete trail api called..')
        console.log(userInfo.token)

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + userInfo.token
            }
        }

        axios.delete(`${BASE_URL}/api/trails/` + id, config).then(res => {
            setTrails(res.data)

            setMessage(`Trail deleted`)

            //Update trails list
            getTrails(userInfo.token)
        })
        .catch(e => {
            console.log('delete trail error ', e)
        })
    }

    const getGroups = (token) => {
        console.log('get groups api called..')
        console.log(token)

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        axios.get(`${BASE_URL}/api/groups`, config).then(res => {
            console.log('here')
            console.log(res.data)

            //Update groups list
            setGroups(res.data)

            setMessage(`groups set`)
        })
        .catch(e => {
            console.log('groups error ', e)
        })
    }

    const createGroup = (details) => {
        console.log('create group api called..')
        console.log(userInfo.token)

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + userInfo.token
            }
        }

        axios.post(`${BASE_URL}/api/groups`, details, config).then(res => {
            setMessage(`Group created`)

            //Update groups list
            getGroups(userInfo.token)
        })
        .catch(e => {
            console.log('groups error ', e)
        })
    }
    
    useEffect(() => {
        console.log('authcontext triggered....')
        isLoggedIn()
    }, [])
 
    return (
        <AuthContext.Provider value={[isLoading, userInfo, splashLoading, message, login, register, logout, trails, getTrails, BASE_URL, createTrail, updateTrail, deleteTrail, groups, getGroups, createGroup]}>{children}</AuthContext.Provider>
    )
}