import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import DisplayPicture from './DisplayPicture';

function GroupDisplay(props) {
    const displayPictures = Object.values(props.group.groupMembers).map((data) => <DisplayPicture />)

    return (
        <View style= {styles.groupDisplay}>
        <View style={styles.groupDP}>
            {displayPictures}

        </View>
        <View style={styles.groupInfo}>
            <Text style={styles.groupName}>
                {props.group.groupName}
            </Text>
            <Text>

            {Object.values(props.group.groupMembers).map((data) => data.displayName).join(', ')}

            </Text>
        </View>
    </View>
    );
}
const styles = StyleSheet.create({
    groupDisplay:{
        height: '60%',
        width: '40%',
        backgroundColor: '#fff',
        flexDirection:'row',
    },
    groupInfo:{
        flex: 1,
        alignItems: 'flex-start',
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