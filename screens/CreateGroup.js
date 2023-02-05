import { Formik } from 'formik'
import {AuthContext} from '../context/AuthContext'
import { globalStyles } from '../styles/global.js';
import { TextInput } from 'react-native-gesture-handler'
import Spinner from 'react-native-loading-spinner-overlay'
import React, {useContext, useState, useEffect} from 'react'
import {Button, StyleSheet, Text, View, FlatList} from 'react-native'

const CreateGroup = ({route, navigation}) => {
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
    setParentMessages,
  ] = useContext(AuthContext)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      console.log('create group page focused....')

      setParentMessages([])
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Text style={styles.welcome}>Create Group</Text>
        <Formik
          initialValues={{name: '', description: '', thumbnail: ''}}
          onSubmit={(values) => {
            createGroup(values);
          }}
        >
          {(props) => (
            <View>
              <TextInput 
                style={globalStyles.input}
                placeholder="Name"
                onChangeText={props.handleChange('name')}
                value={props.values.title}
              />

              <TextInput
                style={globalStyles.input}
                placeholder="Description"
                onChangeText={props.handleChange('description')}
                value={props.values.description}
              />

              <TextInput
                style={globalStyles.input}
                placeholder="Thumbnail"
                onChangeText={props.handleChange('thumbnail')}
                value={props.values.thumbnail}
              />

              <Button title='submit' color="green" onPress={props.handleSubmit} />

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
  }
})

export default CreateGroup