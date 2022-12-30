import Card from '../shared/Card'
import React, {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {Button, StyleSheet, Text, View, TouchableOpacity, FlatList, Image} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

const HomeScreen = ({navigation}) => {
  const [isLoading, userInfo, splashLoading, message, login, register, logout, trails] = useContext(AuthContext)

  return (
    <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Text style={styles.welcome}>Welcome {userInfo.name}</Text>
        <Button title="Logout" color="red" onPress={logout} />

        <Text style={styles.listTitle}>Hiking Trails</Text>
        <FlatList style={styles.list}
            data={trails} 
            renderItem={({item}) => ( 
              <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
                <Card>
                    <Image style={styles.thumbnail} source={item.thumbnail} />
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text>{ item.short_description }</Text>
                </Card>
              </TouchableOpacity>
            )}
        />
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
    width: 260
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

export default HomeScreen