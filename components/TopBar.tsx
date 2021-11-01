import React from 'react';
import CustomButton from '../components/CustomButton';
import GroupDisplay from '../components/GroupDisplay'
import { View, StyleSheet, Text} from 'react-native';

function TopBar(props) {

    return (
        <View style={styles.container}>
            <GroupDisplay group= {props.group}/>
            <View style={styles.trackIngredientContainer}>
                <CustomButton title='Track Ingredient Delivery Status' textSize= {24} textLineHeight= {24} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: '15%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
        backgroundColor: '#c4c4c4',

    },
    trackIngredientContainer:{
        paddingVertical: '2%'

    }

})

export default TopBar;