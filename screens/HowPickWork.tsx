import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, View } from 'react-native';

function HowPickWork({navigation}) {
    return (
        <SafeAreaView style={styles.parent}>
            <View style={styles.wrapper}>
                <Image source={require('../assets/images/howDoes.png')} style={styles.img}/>
                <Text style={styles.infoText}>
                    Each week you and your friends/family will 
                    take turns to select a pack of ingredients 
                    that your group will cook with for the week. 
                </Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    parent:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: 'white',
    },

    wrapper:{
        margin: '10%',
        justifyContent: 'center',
        alignItems:'center',
    },
    img:{
        marginBottom: '10%'
    },

    infoText:{
        color: '#2D2D2D',
        fontSize: 25,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 40,
    }

})

export default HowPickWork;