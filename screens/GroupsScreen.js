import Card from '../shared/Card'
import React, {useContext, useEffect} from 'react'
import {AuthContext} from '../context/AuthContext'
import {Button, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Image, ViewComponent} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

function shorten(str, maxLen, separator = ' ') {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}

const GroupsScreen = ({navigation}) => {
  const [isLoading, userInfo, splashLoading, message, login, register, logout, trails, getTrails, BASE_URL, createTrail, updateTrail, deleteTrail, groups, getGroup] = useContext(AuthContext)

  useEffect(() => {
    console.log('GroupsScreen triggered....')
    console.log(BASE_URL)
    
  });

  return (
    <View style={styles.container}>
        <Spinner visible={isLoading} />
        <>
        <Text style={styles.listTitle}>Groups</Text>
        <Button title="Create Group" color="green" onPress={() => navigation.navigate('CreateGroup')} />
        <FlatList 
            style={styles.list}
            data={groups} 
            renderItem={({item}) => (
              <View style={{marginVertical: 10}}>
                <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
                  <Card>
                      <Image style={styles.thumbnail} source={{uri: BASE_URL + '/' + (item.thumbnail ? item.thumbnail : 'thumbnails/600x400.png')}} />
                      <Text style={{fontWeight: 'bold'}}>{ item.name }</Text>
                      <Text>{ shorten(item.description, 80) }...</Text>
                  </Card>
                </TouchableOpacity>
                <Button title="Edit" color="blue" onPress={() => {}} />
                <Button title="Delete" color="orange" onPress={() => {}} />
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

export default GroupsScreen