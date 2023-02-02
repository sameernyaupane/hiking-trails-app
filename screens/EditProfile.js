import { Formik } from 'formik'
import React, {useContext, useState} from 'react'
import {AuthContext} from '../context/AuthContext'
import { globalStyles } from '../styles/global.js';
import { TextInput } from 'react-native-gesture-handler'
import Spinner from 'react-native-loading-spinner-overlay'
import {Button, StyleSheet, Text, View, FlatList} from 'react-native'
import reactDom from 'react-dom';

const EditProfile = ({route, navigation}) => {
  const [
    isLoading, 
    userInfo, 
    splashLoading, 
    messages, 
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
    rateTrail,
    joinGroup,
    leaveGroup,
    userProfile,
    getProfile,
    updateProfile,
  ] = useContext(AuthContext)


  const [status, setStatus] = useState('')

  console.log('here')
  console.log(userProfile.difficulty)

  return (
    <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Text style={styles.welcome}>Edit Profile</Text>
        <Formik
          initialValues={{difficulty: userProfile.difficulty, distance_rating: userProfile.distance_rating, elevation_rating: userProfile.elevation_rating}}
          onSubmit={(values) => {
            updateProfile(values);
          }}
        >
          {(props) => (
            <View>
              <Text>Difficulty:</Text>
              <TextInput 
                style={globalStyles.input}
                placeholder="Difficulty"
                onChangeText={props.handleChange('difficulty')}
                value={props.values.difficulty}
              />

              <Text>Elevation Rating:</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Elevation Rating"
                onChangeText={props.handleChange('elevation_rating')}
                value={props.values.elevation_rating}
              />

              <Text>Distance Rating:</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Distance Rating"
                onChangeText={props.handleChange('distance_rating')}
                value={props.values.distance_rating}
              />

              <Button title='submit' color="blue" onPress={props.handleSubmit} />

              <View style={globalStyles.messageBox}>
                {messages.map((message, index) => (
                Array.isArray(message) ?
                    (<Text style={globalStyles.error} key={index}>{ message[1] }</Text>)
                  :
                  (<Text style={globalStyles.message} key={index}>{ message }</Text>)
                ))}
              </View>

            </View>
          )}
        </Formik>
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
})

export default EditProfile