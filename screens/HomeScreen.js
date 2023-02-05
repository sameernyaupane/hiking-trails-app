import Card from '../shared/Card'
import React, {useContext, useEffect} from 'react'
import {AuthContext} from '../context/AuthContext'
import {Button, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Image, ViewComponent} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import SelectDropdown from 'react-native-select-dropdown';

function shorten(str, maxLen, separator = ' ') {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
}

const HomeScreen = ({navigation}) => {
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
  ] = useContext(AuthContext)

  const stars = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
  ];

  return (
    <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Text style={styles.welcome}>Welcome {userInfo.name}</Text>
        <Button title="Logout" color="black" onPress={logout} />

        <>
        <Text style={styles.listTitle}>Hiking Trails</Text>
        <Button title="Create Trail" color="green" onPress={() => navigation.navigate('CreateTrail')} />

        <FlatList 
            style={styles.list}
            data={trails} 
            renderItem={({item}) => (
              <View style={{marginVertical: 10}}>
                <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
                  <Card>
                      <Image style={styles.thumbnail} source={{uri: BASE_URL + '/' + (item.thumbnail ? item.thumbnail : 'thumbnails/600x400.png')}} />
                      <Text style={{fontWeight: 'bold'}}>{ item.title }</Text>
                      <Text>{ shorten(item.description, 80) }...</Text>
                  </Card>
                </TouchableOpacity>
                <SelectDropdown
                  data={stars}
                  defaultValueByIndex={(item.starRating.length > 0 ? (item.starRating[0] - 1) : false)} // use default value by index or default value
                  // defaultValue={'Canada'} // use default value by index or default value
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    rateTrail({ rating: index + 1}, item.id)
                    
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item;
                  }}
                />
                {
                  userInfo.roles.includes('Admin') || userInfo.userId == item.user_id ?
                  <>
                    <Button title="Edit" color="blue" onPress={() => navigation.navigate('EditTrail', item)} />
                    <Button title="Delete" color="red" onPress={ () => deleteTrail(item.id) } />
                  </>
                  :
                  <></>
                }
              </View>
            )}
        />
        </>
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
    width: 260,
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