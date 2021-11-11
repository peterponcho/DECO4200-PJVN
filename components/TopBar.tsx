import React from 'react';
import CustomButton from '../components/CustomButton';
import GroupDisplay from '../components/GroupDisplay'
import { View, StyleSheet, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function TopBar(props) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <GroupDisplay group= {props?.group}/>
            <View style={styles.trackIngredientContainer}>
                {/* <CustomButton title='Track Ingredient Delivery Status' textSize= {24} textLineHeight= {24} /> */}
                <Text style= {styles.announcements}>
                    Announcements
                </Text>
                <TouchableOpacity
                onPress = {() => props?.activeButton? navigation.navigate("ChooseIngr") : null}
                disabled={props?.activeButton? false: true}
                style = {styles.annBtn}>
                    <Text style={styles.btnText}>
                        {props?.annText}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: '24%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal: '5%',
        backgroundColor: '#E9EBF6',

    },
    trackIngredientContainer:{
        height: '70%',
        // width: '40%',
        flex: 1,
        backgroundColor: '#fff',
        marginLeft: '10%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',

        // paddingVertical: '2%'

    },
    announcements:{
        paddingBottom: '5%',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF792E',

    },

    annBtn:{
        justifyContent: 'center',
        alignItems: 'center',


    },
    btnText:{
        color: '#205ECF',
        fontSize: 20,
        // lineHeight: 20,

    }

})

export default TopBar;