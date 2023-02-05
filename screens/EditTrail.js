import { Formik } from 'formik'
import React, {useContext, useState} from 'react'
import {AuthContext} from '../context/AuthContext'
import { globalStyles } from '../styles/global.js';
import { TextInput } from 'react-native-gesture-handler'
import Spinner from 'react-native-loading-spinner-overlay'
import {Button, StyleSheet, Text, View, FlatList} from 'react-native'
import { color } from 'react-native-reanimated';

const EditTrail = ({route, navigation}) => {
  const [isLoading, userInfo, splashLoading, messages, login, register, logout, trails, getTrails, BASE_URL, createTrail, updateTrail] = useContext(AuthContext)

  const {id, title, description, thumbnail} = route.params

  const [status, setStatus] = useState('')

  return (
    <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Text style={styles.welcome}>Edit Trail</Text>
        <Formik
          initialValues={{title: title, description: description, thumbnail: thumbnail}}
          onSubmit={(values) => {
            updateTrail(values, id);
          }}
        >
          {(props) => (
            <View>
              <TextInput 
                style={globalStyles.input}
                placeholder="Title"
                onChangeText={props.handleChange('title')}
                value={props.values.title}
              />

              <TextInput
                style={globalStyles.textArea}
                multiline={true}
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
  }
})

export default EditTrail