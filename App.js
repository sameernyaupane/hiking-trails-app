import 'react-native-gesture-handler'
import React from "react"
import {AuthProvider} from './context/AuthContext'
import Drawer from './routes/Drawer'
import {StatusBar, Text, View} from 'react-native'

const App = () => {
    return (
        <AuthProvider>
            <StatusBar backgroundColor="#06bcee" />
            <Drawer />
        </AuthProvider>
    )
}

export default App