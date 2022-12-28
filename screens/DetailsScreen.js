import Card from '../shared/Card'
import React, {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {Button, StyleSheet, Text, View, FlatList, Image} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

const DetailsScreen = ({route, navigation}) => {
  const [isLoading, userInfo, splashLoading, message, login, register, logout, trails] = useContext(AuthContext)

  const {title, description, thumbnail} = route.params

  return (
    <View style={styles.container}>
      <Card>
        <Image source={ thumbnail } />
        <Text style={styles.titleText}>
          { title }
        </Text>
        <Text>{ description }</Text>
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
  }
})

export default DetailsScreen