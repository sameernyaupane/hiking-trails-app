import axios from 'axios'
import * as Device from 'expo-device'
import React, {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BASE_URL = 'http://hiking-trails-api.192.168.1.74.nip.io'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({name: '', email: '', token: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [splashLoading, setSplashLoading] = useState(false)
    const [trails, setTrails] = useState([
        { 
            title: 'Shivapuri Bishnudwar Hike', 
            description: "Bishnudwar is the origin of the Bishnumati River, one of Kathmandu's most important rivers. Bishnumati is also religiously significant. Both Hindus and Buddhists regard this river as sacred. Bishnudwar, located on the Shivapuri National Park trail, is one of the most convenient and quick refreshment destinations in the bustling and busy city of Kathmandu. The pleasant trail and eye-catching greenery add to this hiking route.  The hike is around 2 to 3 hrs. Anyone with a basic level of hiking experience can explore this area.",
            thumbnail: require('../assets/bishnudwar.jpg')
        },
        { 
            title: 'Phulchowki Trail Hike', 
            description: "The highest hill situated in the south of Kathmandu valley famous for Vegetation (Botanical Garden) and bird watching. Hike to Phulchowki Kathmandu is one of the most beautiful hiking related to vegetation around Kathmandu valley. To start our hike to Phulchowki Kathmandu, we drive 14 km south of Kathmandu for about 40 minutes by private Car. After we reach Godavari (with Botanical Garden) we start our hiking gradually uphill through dense sub – Tropical forest for four hours.",
            thumbnail: require('../assets/phulchowki.jpeg')
        },
        { 
            title: 'Champadevi Trail Hike', 
            description: "The Champadevi Hike is the best way to get one with nature. First of all, the trip begins from Kathmandu and heads to Bhanjyang on a short drive. The hike slowly rises along the trail through dense forest filled with a variety of plants and flowers. During the Champadevi Hike, the hike features even more mesmerizing Bagmati River, Bungmati, Khokana, and Pharping. You can also come across several Buddhist monasteries on the way to the top. Next, you reach the top of the Champadevi hill.",
            thumbnail: require('../assets/champadevi.jpg')
        },
        { 
            title: 'Lakuri Bhanjyang Hike', 
            description: "Lakuri Bhanjyang is a sweet escape from the busy capital with an opportunity to explore engaging and exciting countryside lifestyle. Initially, you will drive to Lamatar through Gwarko, which should take about an hour. From Lamatar, you can hike uphill either through a motor road or a steep foothill trail. Both of these paths will merge into one after walking up for a while. Lakuri Bhanjyang is about 13 kilometers away from Gwarko, and thus you will be walking for about 3 hours from Lamatar. From the viewpoint, you will get to see the three cities of Kathmandu valley, Kathmandu, Lalitpur, and Bhaktapur, along with with some of the peaks of the Langtang and Gaurishankar range.",
            thumbnail: require('../assets/lakuri-bhanjyang.jpg')
        },
        { 
            title: 'Chisapani Hiking Trail', 
            description: "The literature meaning of the “Chispani” is cold water. Nepali word “Chiso,” meaning cold and “Pani” means water. Chispani trek (2140) is one of the shortest and popular trek viewing spectacular snowcap mountain, green hill terraces, national park jungle with the beautiful Nepali village. This trek allows you to explore two days walking around Shivapuri National and Nagarkot, which is the nearest popular touristic hill station from Kathmandu. This trek is ideally suitable for short time traveler with 2-3 days who wish to explore Nepal within a short time frame. ",
            thumbnail: require('../assets/chisapani.jpeg')
        },
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
        <AuthContext.Provider value={[isLoading, userInfo, splashLoading, message, login, register, logout, trails]}>{children}</AuthContext.Provider>
    )
}