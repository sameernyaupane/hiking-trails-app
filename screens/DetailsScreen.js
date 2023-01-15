import Card from '../shared/Card'
import React, {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {Button, StyleSheet, Text, View, FlatList, Image} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

const DetailsScreen = ({route, navigation}) => {
  const [isLoading, userInfo, splashLoading, message, login, register, logout, trails, getTrails, BASE_URL] = useContext(AuthContext)

  const {title, description, thumbnail} = route.params

  return (
    <View style={styles.container}>
      <Card>
      <Image style={styles.thumbnail} source={{uri: BASE_URL + '/' + (thumbnail ? thumbnail : 'thumbnails/600x400.png')}} />
        <Text style={styles.titleText}>
          {title}
        </Text>
        <Text>{description}</Text>
      </Card>
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
    marginVertical: 20
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

export default DetailsScreen