import Header from '../shared/Header'
import EditTrail from '../screens/EditTrail'
import EditGroup from '../screens/EditGroup'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import CreateTrail from '../screens/CreateTrail'
import CreateGroup from '../screens/CreateGroup'
import {AuthContext} from '../context/AuthContext'
import SplashScreen from '../screens/SplashScreen'
import DetailsScreen from '../screens/DetailsScreen'
import GroupDetail from '../screens/GroupDetail'
import RegisterScreen from '../screens/RegisterScreen'
import React, {useState, useContext, useEffect} from "react"
import { NavigationContainer } from '@react-navigation/native'
import {Button, Text, TextInput, View, StyleSheet} from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export const HomeStack = (Drawer) => {
    const [isLoading, userInfo, splashLoading] = useContext(AuthContext)
    
    return (
        <Stack.Navigator>
        {splashLoading ? (
            <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
            />
        ) : userInfo.token ? (
            <>
            <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{headerShown: true}}
            />
            <Stack.Screen 
                name="Details" 
                component={DetailsScreen} 
                options={{headerShown: true}}
            />
            <Stack.Screen 
                name="CreateTrail" 
                component={CreateTrail} 
                options={{headerShown: true}}
            />
            <Stack.Screen 
                name="EditTrail" 
                component={EditTrail} 
                options={{headerShown: true}}
            />
            <Stack.Screen 
                name="CreateGroup" 
                component={CreateGroup} 
                options={{headerShown: true}}
            />
            <Stack.Screen 
                name="EditGroup" 
                component={EditGroup} 
                options={{headerShown: true}}
            />
            <Stack.Screen 
                name="GroupDetail" 
                component={GroupDetail} 
                options={{headerShown: true}}
            />
            </>
        ) : (
            <>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{headerShown: false}}
            />
            </>
        )}
        </Stack.Navigator>
    );
};

export default HomeStack