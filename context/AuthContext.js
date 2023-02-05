import axios from 'axios'
import * as Device from 'expo-device'
import React, {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'http://hiking-trails-api.192.168.2.102.nip.io'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({name: '', email: '', token: ''})
    const [userProfile, setUserProfile] = useState({difficulty: '', distance_rating: '', elevation_rating: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [messages, setMessages] = useState([])
    const [splashLoading, setSplashLoading] = useState(false)
    const [trails, setTrails] = useState([])
    const [groups, setGroups] = useState([])
    const [recommendations, setRecommendations] = useState([])

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

            setMessages(['User Registered'])
        })
        .catch(e => {
            setIsLoading(false)

            if(e.response.status == 422) {
                console.log(Object.entries(e.response.data.errors))
                setMessages(Object.entries(e.response.data.errors))
            }
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

            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            setUserInfo(res.data)

            setIsLoading(false)

            setMessages([`User Logged In from  device: ${device_name}`])

            getProfile(token)
            getTrails(token)
            getGroups(token)
            getRecommendations(token)
        })
        .catch(e => {
            setIsLoading(false)

            if(e.response.status == 422) {
                console.log(Object.entries(e.response.data.errors))
                setMessages(Object.entries(e.response.data.errors))
            }
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

        AsyncStorage.removeItem('userInfo')

        setUserInfo({name: '', email: '', token: '', user_id: 0, roles: []})

        setMessages([`You are now logged out.`])
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

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        axios.get(`${BASE_URL}/api/trails`, config).then(res => {
            setTrails(res.data)

            console.log('Trails set')
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
            setMessages([`Trail created`])

            //Update trails list
            getTrails(userInfo.token)
        })
        .catch(e => {
            console.log('trails error ', e)

            if(e.response.status == 422) {
                console.log(Object.entries(e.response.data.errors))
                setMessages(Object.entries(e.response.data.errors))
            }
        })
    }

    const updateTrail = (details, id) => {
        console.log('update trail api called..')
        console.log(userInfo.token)

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + userInfo.token
            }
        }

        axios.put(`${BASE_URL}/api/trails/` + id, details, config).then(res => {
            setMessages([`Trail updated`])

            //Update trails list
            getTrails(userInfo.token)
        })
        .catch(e => {
            console.log('trail error ', e)

            if(e.response.status == 422) {
                console.log(Object.entries(e.response.data.errors))
                setMessages(Object.entries(e.response.data.errors))
            }
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
            setMessages([`Trail deleted`])

            //Update trails list
            getTrails(userInfo.token)
        })
        .catch(e => {
            console.log('delete trail error ', e)
        })
    }

    const getGroups = (token) => {
        console.log('get groups api called..')

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        axios.get(`${BASE_URL}/api/groups`, config).then(res => {
            //Update groups list
            setGroups(res.data)

            console.log(`groups set`)
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
            setMessages([`Group created`])

            //Update groups list
            getGroups(userInfo.token)
        })
        .catch(e => {
            console.log('groups error ', e)
            if(e.response.status == 422) {
                console.log(Object.entries(e.response.data.errors))
                setMessages(Object.entries(e.response.data.errors))
            }
        })
    }

    const updateGroup = (details, id) => {
        console.log('update group api called..')
        console.log(userInfo.token)

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + userInfo.token
            }
        }

        axios.put(`${BASE_URL}/api/groups/` + id, details, config).then(res => {
            setMessages([`Group updated`])

            //Update groups list
            getGroups(userInfo.token)
        })
        .catch(e => {
            console.log('group error ', e)

            if(e.response.status == 422) {
                console.log(Object.entries(e.response.data.errors))
                setMessages(Object.entries(e.response.data.errors))
            }
        })
    }

    const deleteGroup = (id) => {
        console.log('delete group api called..')
        console.log(userInfo.token)

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + userInfo.token
            }
        }

        axios.delete(`${BASE_URL}/api/groups/` + id, config).then(res => {
            setMessages([`Group deleted`])

            //Update groups list
            getGroups(userInfo.token)
        })
        .catch(e => {
            console.log('delete group error ', e)
        })
    }

    const getRecommendations = (token) => {
        console.log('get recommendations api called..')

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        axios.get(`${BASE_URL}/api/recommendations`, config).then(res => {
            setRecommendations(res.data)

            console.log(`Recommendations set`)
        })
        .catch(e => {
            console.log('recommendations error ', e)
        })
    }

    const rateTrail = (details, id) => {
        console.log('rate trail api called..')
        console.log(userInfo.token)

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + userInfo.token
            }
        }

        axios.post(`${BASE_URL}/api/rate-trail/` + id, details, config).then(res => {
            setMessages([`Trail rated`])

            //Update trails list
            getTrails(userInfo.token)
        })
        .catch(e => {
            console.log('trail error ', e)

            if(e.response.status == 422) {
                console.log(Object.entries(e.response.data.errors))
                setMessages(Object.entries(e.response.data.errors))
            }
        })
    }

    const joinGroup = (id) => {
        console.log('join group api called..')
        console.log(userInfo.token)

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + userInfo.token
            }
        }

        axios.post(`${BASE_URL}/api/join-group/` + id, {}, config).then(res => {
            setMessages([`Group joined`])

            //Update groups list
            getGroups(userInfo.token)
        })
        .catch(e => {
            console.log('join group error ', e)

            if(e.response.status == 422) {
                console.log(Object.entries(e.response.data.errors))
                setMessages(Object.entries(e.response.data.errors))
            }
        })
    }

    const leaveGroup = (id) => {
        console.log('update group api called..')
        console.log(userInfo.token)

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + userInfo.token
            }
        }

        axios.post(`${BASE_URL}/api/leave-group/` + id, {}, config).then(res => {
            setMessages([`Group left`])

            //Update groups list
            getGroups(userInfo.token)
        })
        .catch(e => {
            console.log('group leave error ', e)

            if(e.response.status == 422) {
                console.log(Object.entries(e.response.data.errors))
                setMessages(Object.entries(e.response.data.errors))
            }
        })
    }

    const getProfile = (token) => {
        console.log('get profile api called..')

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }

        axios.get(`${BASE_URL}/api/profile`, config).then(res => {
            //Update groups list
            setUserProfile(res.data)

            console.log(`user profile set`)
        })
        .catch(e => {
            console.log('get profile error ', e)
        })
    }

    const updateProfile = (details) => {
        setMessages([])
        console.log('update profile api called..')

        let device_name = Device.modelName

        let config = {
            headers: {
              'Authorization': 'Bearer ' + userInfo.token
            }
        }

        axios.put(`${BASE_URL}/api/profile`, details, config).then(res => {
            setMessages([`Profile updated`])

            //Update profile list
            getProfile(userInfo.token)
            getRecommendations(userInfo.token)
        })
        .catch(e => {
            console.log('profile update error: ', e.response.status)

            setMessages(['profile update error: ', e.response.status])

            if(e.response.status == 422) {
                console.log(Object.entries(e.response.data.errors))
                setMessages(Object.entries(e.response.data.errors))
            }
        })
    }

    const setParentMessages = (messages) => {
        setMessages(messages)
    }
    
    useEffect(() => {
        console.log('authcontext triggered....')
        //isLoggedIn()
    }, [])
 
    return (
        <AuthContext.Provider value={[
            isLoading, 
            userInfo, 
            splashLoading, 
            messages, 
            login, 
            register, 
            logout, 
            trails, 
            getTrails, 
            BASE_URL, 
            createTrail,
            updateTrail, 
            deleteTrail,
            groups,
            getGroups,
            createGroup,
            updateGroup, 
            deleteGroup,
            recommendations,
            getRecommendations,
            rateTrail,
            joinGroup,
            leaveGroup,
            userProfile,
            getProfile,
            updateProfile,
            setParentMessages,
        ]}>{children}</AuthContext.Provider>
    )
}