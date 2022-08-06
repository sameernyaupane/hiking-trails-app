import Header from '../shared/Header'
import React, {useState, useContext} from "react"
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import {Button, Text, TextInput, View, StyleSheet} from "react-native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
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
            <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{headerShown: false}}
            />
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