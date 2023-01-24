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
  const [
    isLoading, 
    userInfo, 
    splashLoading, 
    message, 
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
  ] = useContext(AuthContext)


  useEffect(() => {
    console.log('Recommendation triggered....')
  });

  return (
    <View style={styles.container}>
        <Spinner visible={isLoading} />
        <>
          <Text style={styles.listTitle}>Trail Recommendation</Text>
          <Text style={{ marginVertical: 12 }}>
            Here are the recommended trails according to your preferences.
          </Text>
          <FlatList 
              style={styles.list}
              data={recommendations} 
              renderItem={({item}) => (
                <View style={{marginVertical: 10}}>
                  <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
                    <Card>
                        <Image style={styles.thumbnail} source={{uri: BASE_URL + '/' + (item.thumbnail ? item.thumbnail : 'thumbnails/600x400.png')}} />
                        <Text style={{fontWeight: 'bold'}}>{ item.title }</Text>
                        <Text>{ shorten(item.description, 80) }...</Text>
                    </Card>
                  </TouchableOpacity>
                </View>
              )}
          />
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
    fontWeight: 'bold'
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