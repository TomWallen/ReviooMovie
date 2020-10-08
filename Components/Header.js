import React from 'react'
import { View, Text, StyleSheet } from'react-native'

class Header extends React.Component {
    render(){
        return (
            <View style={styles.title_container}>
                <Text style={styles.title_text}>Ouiki Movie</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title_container: {
        marginTop: 20, 
        height: 100,
        backgroundColor: 'black',
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        alignItems: 'center'
    }
})

export default Header