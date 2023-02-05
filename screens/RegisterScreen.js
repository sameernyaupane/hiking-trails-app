import {AuthContext} from '../context/AuthContext';
import { globalStyles } from '../styles/global.js';
import Spinner from "react-native-loading-spinner-overlay";
import React, {useState, useContext, useEffect} from "react"
import {Button, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native"

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);

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
            console.log('register page focused....')

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
                    value={name}
                    placeholder="Enter name" 
                    onChangeText={text => setName(text)}
                />

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

                <TextInput 
                    style={styles.input} 
                    value={passwordConfirm}
                    placeholder="Confirm password" 
                    onChangeText={text => setPasswordConfirm(text)}
                    secureTextEntry
                />

                <Button title="Register" onPress={() => {
                    register(name, email, password, passwordConfirm);
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
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Login</Text>
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


export default RegisterScreen;