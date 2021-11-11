import { FLIPPED_ALIAS_KEYS, switchStatement, tSImportEqualsDeclaration } from '@babel/types';
import React from 'react';
import { StyleSheet, Image, TouchableOpacity, FlatList, TextInput} from 'react-native';
import DisplayPicture from '../components/DisplayPicture';
import { Text, View} from '../components/Themed';

const lcomments= [
    {
        id: '1',
        text: 'That look\'s delicious!',
        name: 'John',
        memNum: 1,

    }, 
    {
        id: '2',
        text: 'Hey, how\'s it going!',
        name: 'Daniel',
        memNum: 2,
    },
    {
        id: '3',
        text: 'That look\'s delicious!',
        name: 'John',
        memNum: 1,

    }, 
    {
        id: '4',
        text: 'Hey, how\'s it going!',
        name: 'Daniel',
        memNum: 2,
    },
    {
        id: '5',
        text: 'That look\'s delicious!',
        name: 'John',
        memNum: 1,

    }, 
    {
        id: '6',
        text: 'Hey, how\'s it going!',
        name: 'Daniel',
        memNum: 2,
    },
    {
        id: '7',
        text: 'Hey, how\'s it going!',
        name: 'Daniel',
        memNum: 2,
    },
    {
        id: '8',
        text: 'Hey, how\'s it going!',
        name: 'Daniel',
        memNum: 2,
    },
    {
        id: '9',
        text: 'Hey, how\'s it going!',
        name: 'Daniel',
        memNum: 2,
    },
]
let num = 1;
function Post({type, img, text, desc, comments, member, isHeart,}) {

    const [hasImg, setHasImg] = React.useState( type === "imageOnly" ? true : false);
    const [hasText, setHasText] = React.useState(type === "textOnly" ? true : false);
    const [hasDesc, setHasDesc] = React.useState(type === ("imageDesc" || 'textOnly') ? true : false);
    const [isLiked, setIsLiked] = React.useState(false);
    const [viewComment, setviewComment] = React.useState(false);
    const [listComments, setListComments] = React.useState(lcomments);
    const[counter, setCounter]= React.useState(num);
    const inputText = React.useRef(''); // additional dietary requirements input text



    const postImg = <Image source={{uri: img}} style= {styles.postImage}/>
    const postText = <Text>{text}</Text>
    const postDesc = <Text>{desc}</Text>

    const heartHandler= () =>{
        setIsLiked(!isLiked);
    }
    const viewCommentHandler= () => {
        setviewComment(true);
    }
    const goBackHandler = () => {
        setviewComment(false);
    }
    // Captures text input of custom dietary requirements.
    const handleEditChange = (text: string) =>{
        inputText.current = text;

    }
    const addCommentHandler = () =>{
        console.log(inputText);
        if (inputText !== ''){
            const newComment = {

                id: 'n' + num,
                text: inputText.current,
                name: 'Me',
                memNum: 0,
            
            }
            setListComments([...listComments, newComment])
            inputText.current= '';
            num++;

        }
    }

    if (viewComment){
        return(
            <View style={styles.post}>

                <FlatList
                // ref={ref}
                // showsHorizontalScrollIndicator={false}
                // horizontal
                data={listComments}
                // pagingEnabled
                // scrollEnabled= {false}
                renderItem={({item}) => 
                        <View style={styles.commentArea}>
                            <View style = {styles.commentUser}>
                                <DisplayPicture id ={item?.memNum}/>
                                <Text style= {styles.commentName}>{item?.name}</Text>
                            </View>
                            <View style = {styles.commentDescription}>
                                {/* show  description if there is description*/}
                                <Text>{item?.text}</Text>
                            </View>


                    </View>
                }/>
                <TextInput 
                    // style={styles.textInputArea}
                    placeholder="Tap to start typing your comment"
                    onChangeText={handleEditChange}
                />
                <TouchableOpacity style={styles.backBtn} onPress={addCommentHandler}>
                    <Text>
                        {'Send'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backBtn} onPress={goBackHandler}>
                    <Text>
                        {`Back to ${member?.displayName === 'Me' ? 'my' : (member?.displayName + '\'s ')}` +  ` post`}
                    </Text>
                </TouchableOpacity>

            </View>
        )

    }else{
        return (
            <View style={styles.post}>
                <View style={styles.topArea}>
                    <View style = {styles.user}>
                        <DisplayPicture id ={member?.id-1}/>
                        <Text>{member?.displayName}</Text>
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
                        <TouchableOpacity style={styles.commentBtn} onPress={viewCommentHandler}>
                            <Text>
                                {`Comment on ${member?.displayName === 'Me' ? 'my' : (member?.displayName + '\'s ')}` +  ` post`}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.heart} onPress={heartHandler}>
                            <Image
                                source={isLiked? require('../assets/images/redHeart.png') : require('../assets/images/heart.png')}
                            />
                        </TouchableOpacity>


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    post:{
        width: 400,
        height: 400,
        marginRight: 100,
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
    commentArea:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    commentUser:{
        // width: '25%',
        flex: 1,
        // height: '100%',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingRight: '5%',

    },
    commentDescription:{
        flex: 1,
        // backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'flex-start'


    },
    commentName:{
        fontWeight: 'bold',

    },
    description:{
        flex: 3,
        // backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'flex-start'


    },

    postContainer:{
        flex: 4,
        backgroundColor: '#F1F1F1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButtons:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    addComment:{
        flex:1,
    },
    postImage:{
        height: '100%',
        width: '100%'
    },
    commentBtn:{
        paddingLeft: '5%',
        alignItems: 'flex-start',
        flex: 9,
        // backgroundColor: 'red'

    },
    backBtn:{
        paddingLeft: '5%',
        alignItems: 'flex-start',

    },
    heart:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }




})
export default Post;