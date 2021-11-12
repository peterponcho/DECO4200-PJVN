import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import DisplayPicture from './DisplayPicture';

// Group Display picture of Bulletin board.
function GroupDisplay(props) {
    const displayPictures = Object.values(props.group.groupMembers).map((data, index) => <DisplayPicture id = {index} displayName={true}/>)

    return (
        <View style= {styles.groupDisplay}>
            <View style={styles.groupDP}>
                {displayPictures}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    groupDisplay:{
        height: '70%',
        backgroundColor: '#fff',
        borderRadius: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    groupInfo:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        

    },
    groupName:{
        fontSize: 24,
        lineHeight: 36,
        fontWeight: 'bold',
        letterSpacing: 0.25,

    },

    groupDP:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
    },

})
export default GroupDisplay;