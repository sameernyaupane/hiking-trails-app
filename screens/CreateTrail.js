import { Formik } from 'formik'
import React, {useContext, useState} from 'react'
import {AuthContext} from '../context/AuthContext'
import { globalStyles } from '../styles/global.js';
import { TextInput } from 'react-native-gesture-handler'
import Spinner from 'react-native-loading-spinner-overlay'
import {Button, StyleSheet, Text, View, FlatList} from 'react-native'

const CreateTrail = () => {
  const [isLoading, userInfo, splashLoading, message, login, register, logout, trails, getTrails, BASE_URL, createTrail] = useContext(AuthContext)

  const [status, setStatus] = useState('')

  return (
    <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Text style={styles.welcome}>Create Trail</Text>
        <Formik
          initialValues={{title: '', description: '', thumbnail: ''}}
          onSubmit={(values) => {
            createTrail(values);
            setStatus('Trail created.')
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

              <Text style={{color: 'green'}}>{ status }</Text>

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

export default CreateTrail