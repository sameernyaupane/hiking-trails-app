import Card from '../shared/Card'
import React, {useContext} from 'react'
import { WebView } from 'react-native-webview'; 
import {AuthContext} from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'
import {Button, StyleSheet, Text, View, FlatList, Image, ScrollView} from 'react-native'

const DetailsScreen = ({route, navigation}) => {
  const [isLoading, userInfo, splashLoading, message, login, register, logout, trails, getTrails, BASE_URL] = useContext(AuthContext)

  const trail = route.params

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card>
        <Image style={styles.thumbnail} source={{uri: BASE_URL + '/' + (trail.thumbnail ? trail.thumbnail : 'thumbnails/600x400.png')}} />
          <Text style={styles.titleText}>
            { trail.title }
          </Text>
          <Text style={styles.text}>{ trail.description }</Text>
          <Text style={styles.text}>Difficulty: { trail.details.difficulty }</Text>
          <Text style={styles.text}>Elevation: { trail.details.elevation }</Text>
          <Text style={styles.text}>Elevation Rating: { trail.details.elevation_rating }</Text>
          <Text style={styles.text}>Distance: { trail.details.distance }</Text>
          <Text style={styles.text}>Distance Rating: { trail.details.distance_rating }</Text>
          <Text style={styles.text}>Estimated Time: { trail.details.estimated_time }</Text>
          <Text style={styles.text}>Accomodations:</Text>
          <Text style={styles.text}>{ trail.details.accomodation1 }, Rs.{ trail.details.accomodation1_cost } /night</Text>
          <Text style={styles.text}>{ trail.details.accomodation2 }, Rs.{ trail.details.accomodation2_cost } /night</Text>
          <Text style={styles.text}>{ trail.details.accomodation3 }, Rs.{ trail.details.accomodation3_cost } /night</Text>
          <Text style={styles.text}>Map url: { trail.details.map_url }</Text>
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
    marginVertical: 20
  },
  text: {
    marginVertical: 8
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