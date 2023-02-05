import {AuthContext} from '../context/AuthContext';
import { globalStyles } from '../styles/global.js';
import Spinner from 'react-native-loading-spinner-overlay'
import React, {useState, useContext, useEffect} from "react"
import {Button, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native"

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('sameernyaupane@gmail.com')
    const [password, setPassword] = useState('test123321')

    const [
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
      ] = useContext(AuthContext)
    
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // The screen is focused
          // Call any action
          console.log('login page focused....')
    
          setParentMessages([])
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading} />
            <View style={styles.wrapper}>
                <TextInput 
                    style={styles.input} 
                    value={email}
                    placeholder="Enter email" 
                    onChangeText={text => setEmail(text)}
                />

                <TextInput 
                    style={styles.input} 
                    value={password}
                    placeholder="Enter password" 
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <Button title="Login" onPress={() => {
                    login(email, password);
                }} />

                <View style={globalStyles.messageBox}>
                    {messages.map((message, index) => (
                    Array.isArray(message) ?
                        (<Text style={globalStyles.error} key={index}>{ message[1] }</Text>)
                    :
                    (<Text style={globalStyles.message} key={index}>{ message }</Text>)
                    ))}
                </View>

                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.link}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: '80%',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    link: {
        color: 'blue'
    }
})


export default LoginScreen;