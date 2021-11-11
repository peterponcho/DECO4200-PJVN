import React from 'react';
import { View, StyleSheet, Image, Text} from 'react-native';

function DisplayPicture(props) {
    const member1 = require('../assets/images/me.png');
    const member2 = require('../assets/images/john.png');
    const member3 = require('../assets/images/daniel.png');
    const member4 = require('../assets/images/mary.png');

    const names = ['Me', 'John', 'Daniel', 'Mary'];
    const allImage = [member1, member2, member3, member4];

    return (
        // <View style={styles.displayPicture}/>
        <View style = {styles.parent}>
            <Image source = {allImage[props?.id]} style={styles.image}/>
            
            {props?.displayName &&
                <Text style = {styles.text}>
                    {names[props?.id]}
                </Text>
            }
        </View>



    );
}

const styles = StyleSheet.create({
    parent:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image:{
        resizeMode: 'contain',
        height: 60,
        width: 60,
    },
    text:{
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center',
        paddingTop: '1%',
    }
})
export default DisplayPicture;