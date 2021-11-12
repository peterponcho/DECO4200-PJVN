import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, View } from 'react-native';

function TrackDelivery({navigation, route}) {
    const [deliveryDate, setDeliveryDate]= React.useState('Monday');
    React.useEffect(() => {
        navigation.addListener('focus', () => {
          
          // Get data from Bulletin Board
          if(route.params){
                setDeliveryDate(`${route.params.params}`);
            }

    
    
        });
      });
    
    return (
        <SafeAreaView style={styles.parent}>
            <View style={styles.wrapper}>
                <Text style={styles.infoText}>
                    {`Estimated Delivery: ${deliveryDate}`}
                </Text>
                <Image source={require('../assets/images/track.png')} style={styles.img}/>

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
        resizeMode:'contain',
        flex: 1,
        width: 700,
        height: 700
    },

    infoText:{
        color: '#2D2D2D',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',

    }

})

export default TrackDelivery;