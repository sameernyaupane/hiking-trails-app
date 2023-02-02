import Card from '../shared/Card'
import React, {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {Button, StyleSheet, Text, View, FlatList} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

const AboutScreen = () => {
  const [isLoading, userInfo, splashLoading, messages, login, register, logout, trails] = useContext(AuthContext)

  return (
    <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Text style={styles.title}>About Hiking Trails App</Text>
        <Text style={styles.welcome}>
          “Hiking Trails Listing And Recommendation App” is a mobile based system. This
          system allows users to view list of trails to take according to their preferences.
          The system allows users to find people interested in trails to go on a hike together.
          It is hard to find directions for trails and paths. 
          Apps like this exist for other countries but there isn’t one for Nepal. There are
          some maps and guides for Everest and other mountain climbing but not for local hills and
          areas around Kathmandu. This app solves the problem by letting people add their own
          directions and details about the trips. There
          is also a feature for budget estimation. The app also has a group finding feature. This
          feature helps to find people or groups interested in similar hike as you.
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    margin: 12,
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
    padding: 12,
    backgroundColor: 'white',
  },
  list: {
    marginVertical: 20
  }
})

export default AboutScreen