import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {Button, Text, TextInput, View, StyleSheet} from "react-native"

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
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
                
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;