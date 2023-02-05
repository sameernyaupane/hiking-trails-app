import React, {createContext, useEffect, useState} from 'react'
import {Button, StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Image, ViewComponent} from 'react-native'

const StarRating = (props) => {
    const [defaultRating, setDefaultRating] = useState(props.rating)

    //To set the default Star Selected
    const maxRating = 5

    //Filled Star. You can also give the path from local
    const Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

    //Empty Star. You can also give the path from local
    const Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

    const updateRating = (i) => {
        console.log('rating')
        console.log(i)
        //setDefaultRating(i)
    }

    let React_Native_Rating_Bar = [];

    //Array to hold the filled or empty Stars
    for (var i = 1; i <= maxRating; i++) {
        React_Native_Rating_Bar.push(
        <TouchableOpacity
            activeOpacity={0.7}
            key={i}
            onPress={ () => updateRating(i) }>
            <Image
            style={styles.StarImage}
            source={
                i <= defaultRating
                ? { uri: Star }
                : { uri: Star_With_Border }
            }
            />
        </TouchableOpacity>
        );
    }

    return(
        <View style={styles.childView}>{React_Native_Rating_Bar}</View>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    childView: {
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 30,
    },
    button: {
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 30,
      padding: 15,
      backgroundColor: '#8ad24e',
    },
    StarImage: {
      width: 40,
      height: 40,
      resizeMode: 'cover',
    },
    textStyle: {
      textAlign: 'center',
      fontSize: 23,
      color: '#000',
      marginTop: 15,
    },
    textStyleSmall: {
      textAlign: 'center',
      fontSize: 16,
  
      color: '#000',
      marginTop: 15,
    },
});

export default StarRating;