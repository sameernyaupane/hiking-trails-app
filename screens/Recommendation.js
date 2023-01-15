import Card from '../shared/Card'
import React, {useContext, useEffect} from 'react'
import {AuthContext} from '../context/AuthContext'
import {Button, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Image, ViewComponent} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

function shorten(str, maxLen, separator = ' ') {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}

const Recommendation = ({navigation}) => {
  const [isLoading, userInfo, splashLoading, message, login, register, logout, trails, getTrails, BASE_URL, editTrail, deleteTrail] = useContext(AuthContext)

  useEffect(() => {
    console.log('Recommendation triggered....')
    console.log(BASE_URL)
    
  });

  return (
    <View style={styles.container}>
        <Spinner visible={isLoading} />
        <>
        <Text style={styles.listTitle}>Trail Recommendation</Text>
        
        </>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
  listTitle: {
    marginTop: 10,
    textAlign: 'left',
  },
  list: {
    marginVertical: 20,
    width: 260,
  },
  titleText: {
    marginVertical: 20,
    fontWeight: 'bold'
  },
  thumbnail: {
    width: 100,
    height: 100
  },
})

export default Recommendation