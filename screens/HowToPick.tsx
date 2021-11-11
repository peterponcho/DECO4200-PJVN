import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, View } from 'react-native';

function HowToPick(navigation) {
    return (
        <SafeAreaView style={styles.parent}>
            <View style={styles.wrapper}>
                <Image source={require('../assets/images/HowDoPick.png')} style={styles.img}/>
                <Text style={styles.infoText}>
                {'We\'ve designed our ingredient packs to be as diverse as possible, whilst remaining simple and universal.\nTo pick your ingredient pack, simply tap on your selection,\nsuch as \"Thai\" and confirm.\n\n'}
                {'We take the dietary requirements you should have submitted prior, otherwise you can contact us through the help section of MealShare to sort out special ingredients as per your diet.'}
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
        resizeMode: 'contain',
        width: 300,
        height: 300,
        flex: 1
    },

    infoText:{
        color: '#2D2D2D',
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 30,
        flex: 1
    }

})


export default HowToPick;