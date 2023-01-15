import { Formik } from 'formik'
import React, {useContext, useState} from 'react'
import {AuthContext} from '../context/AuthContext'
import { globalStyles } from '../styles/global.js';
import { TextInput } from 'react-native-gesture-handler'
import Spinner from 'react-native-loading-spinner-overlay'
import {Button, StyleSheet, Text, View, FlatList} from 'react-native'

const BudgetCalculation = () => {
  const [isLoading, userInfo, splashLoading, message, login, register, logout, trails, getTrails, BASE_URL, budgetCalculation] = useContext(AuthContext)

  const [status, setStatus] = useState('')

  return (
    <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Text style={styles.welcome}>Calculate your budget</Text>
        <Formik
          initialValues={{days: 1, people: 1, travelCost: 0, foodCost: 0, hotelCost: 0}}
          onSubmit={(values) => {
            const {days, people, travelCost, foodCost, hotelCost} = values

            let perPersonBudget = (+travelCost) + (+foodCost) + (+hotelCost);

            let finalBudget =  perPersonBudget * people * days;

            setStatus(`The total budget is: Rs.${finalBudget}`)
          }}
        >
          {(props) => (
            <View>
              <TextInput 
                style={globalStyles.input}
                placeholder="No. of days"
                onChangeText={props.handleChange('days')}
                value={props.values.title}
              />

              <TextInput
                style={globalStyles.input}
                placeholder="No. of people"
                onChangeText={props.handleChange('people')}
                value={props.values.description}
              />

              <TextInput
                style={globalStyles.input}
                placeholder="Travel cost(per person/ per day)"
                onChangeText={props.handleChange('travelCost')}
                value={props.values.thumbnail}
              />

              <TextInput
                style={globalStyles.input}
                placeholder="Food cost(per person/ per day)"
                onChangeText={props.handleChange('foodCost')}
                value={props.values.thumbnail}
              />

              <TextInput
                style={globalStyles.input}
                placeholder="Hotel cost(per person/ per day)"
                onChangeText={props.handleChange('hotelCost')}
                value={props.values.thumbnail}
              />

              <Button title='calculate' color="green" onPress={props.handleSubmit} />

              <Text style={styles.status}>{ status }</Text>

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
  status: {
    marginVertical: 6,
    fontSize: 20,
    fontWeight: 'bold',
  }
})

export default BudgetCalculation