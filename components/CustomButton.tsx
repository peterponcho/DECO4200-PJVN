import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

function CustomButton({title, textSize, textLineHeight}) {
    return (
        <Pressable style={styles(textSize, textLineHeight).button} onPress= {() => {console.log("IM PRESSED")}}>
            <Text style={styles(textSize, textLineHeight).buttonText}>
                {title}
            </Text>
        </Pressable>
    );
}
const styles = (textSize: any, textLineHeight: any ) => StyleSheet.create({

    button:{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        paddingHorizontal: '5%',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    buttonText:{
        fontSize: textSize,
        lineHeight: textLineHeight,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    }

})
export default CustomButton;