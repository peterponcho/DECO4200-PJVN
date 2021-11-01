import { FLIPPED_ALIAS_KEYS, switchStatement, tSImportEqualsDeclaration } from '@babel/types';
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import CustomButton from './CustomButton';
import DisplayPicture from '../components/DisplayPicture';
import { Text, View} from '../components/Themed';



function Post({type, img, text, desc, comments, member}) {

    const [hasImg, setHasImg] = React.useState( type === "imageOnly" ? true : false);
    const [hasText, setHasText] = React.useState(type === "textOnly" ? true : false);
    const [hasDesc, setHasDesc] = React.useState(type === ("imageDesc" || 'textOnly') ? true : false);

    const postImg = <Image source={{uri: img}} style= {styles.postImage}/>
    const postText = <Text>{text}</Text>
    const postDesc = <Text>{desc}</Text>
    return (
        <View style={styles.post}>
            <View style={styles.topArea}>
                <View style = {styles.user}>
                    <DisplayPicture />
                    <Text>{member.displayName}</Text>
                </View>
                <View style = {styles.description}>
                    {/* show  description if there is description*/}
                    {hasDesc && postDesc} 
                </View>
            </View>
            <View style = {styles.postContainer}>
                {/* show  image and text if there is */}
                {hasImg && postImg}
                {hasText && postText}
            </View>
            <View style={styles.actionButtons}>
                <View style = {styles.addComment}>
                    {/* haven't done this */}
                    <CustomButton title='Add Comment' textSize={12} textLineHeight={12} />
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    post:{
        width: 500,
        height: 500,
        marginRight: 100,
        // backgroundColor: 'blue'
    },
    topArea:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor:'red',
    },
    user:{
        // width: '25%',
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',

    },
    description:{
        flex: 3,
        // backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'flex-start'


    },

    postContainer:{
        flex: 4,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButtons:{
        flex: 1,
        backgroundColor: 'blue',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center'
    },

    addComment:{
        flex:1
    },
    postImage:{
        height: '100%',
        width: '100%'
    },




})
export default Post;