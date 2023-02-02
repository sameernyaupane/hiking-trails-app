import Card from '../shared/Card'
import React, {useContext} from 'react'
import { WebView } from 'react-native-webview'; 
import {AuthContext} from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import {Button, StyleSheet, Text, View, FlatList, Image, ScrollView} from 'react-native'

const GroupDetail = ({route, navigation}) => {
  const [isLoading, userInfo, splashLoading, messages, login, register, logout, trails, getTrails, BASE_URL] = useContext(AuthContext)

  const group = route.params
  const members = group.members

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card>
        <Image style={styles.thumbnail} source={{uri: BASE_URL + '/' + (group.thumbnail ? group.thumbnail : 'thumbnails/600x400.png')}} />
          <Text style={styles.titleText}>
            { group.name }
          </Text>
          <Text style={styles.text}>{ group.description }</Text>

          <Text style={styles.text}>Members:</Text>

          {group.members.map((member, index) => (
              <Text style={styles.text} key={index}>{ member.name }</Text>
          ))}

        </Card>
      </ScrollView>
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
  list: {
    marginVertical: 2
  },
  text: {
    marginVertical: 4
  },
  titleText: {
    marginVertical: 20,
    fontWeight: 'bold'
  },
  thumbnail: {
    width: 360,
    height: 300
  },
})

export default GroupDetail