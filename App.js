import React from "react"
import {AuthProvider} from './context/AuthContext'
import {Navigation} from './components/Navigation'
import {StatusBar, Text, View} from 'react-native'

const App = () => {
    return (
        <AuthProvider>
            <StatusBar backgroundColor="#06bcee" />
            <Navigation />
        </AuthProvider>
    )
}

export default App