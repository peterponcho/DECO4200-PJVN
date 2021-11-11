import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, View } from 'react-native';

function WhyThree({navigation}) {
    return (
        <SafeAreaView style={styles.parent}>
            <View style={styles.wrapper}>
                <Image source={require('../assets/images/why3.png')} style={styles.img}/>
                <Text style={styles.infoText}>
                    {'Since MealShare renews every Sunday, we must ensure that you receive your ingredients before Sunday and have time to cook.\n\n'}
                    {'If you’re not at home to collect the ingredient pack, dont worry. We’ll leave it in a safe place.'}
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
export default WhyThree;