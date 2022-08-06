import React from 'react'
import { StyleSheet, View } from 'react-native'

const Card = (props) => {
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
});

export default Card;