import React from 'react';
import { View, StyleSheet} from 'react-native';

function DisplayPicture(props) {
    return (
        <View style={styles.displayPicture}/>
    );
}

const styles = StyleSheet.create({
    displayPicture:{
        // margin: -5,
        width: 45,
        height: 45,
        borderRadius: 45/2,
        backgroundColor: '#c4c4c4',
        borderWidth: 4,
        borderColor: 'blue'

    }
})
export default DisplayPicture;