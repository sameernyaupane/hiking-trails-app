import React from 'react'
import {MaterialIcons} from '@expo/vector-icons'
import { StyleSheet, View, Text} from 'react-native'

const Header = (navigation) => {

    const openMenu = () => {
        console.log('vola')
        navigation.openDrawer()
    }

    return(
        <View style={styles.header}>
            <MaterialIcons name='menu' size={28} onPress={() => { openMenu() }} style={styles.icon} />
            <View>
                <Text style={styles.headerText}>Hiking Trails</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
},
headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
},
icon: {
    position: 'absolute',
    left: 16
}
})

export default Header