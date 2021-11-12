import * as React from 'react';
import { StyleSheet, SectionList, FlatList, Button} from 'react-native';

import TopBar from '../components/TopBar';
import Post from '../components/Post';
import {Member} from '../components/Member';
import {Group} from '../components/Group';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

// Dummy member, group, texts.
const member1 = Member(1, "Lisa Maroon", "Lisa", true, false);
const member2 = Member(2, "John Maroon", "John", false, false);
const member3 = Member(3, "Daniel Maroon", "Daniel", false, false);
const member4 = Member(4, "Mary Maroon", "Mary", false, false);
const members = [member1, member2, member3, member4];
const myGroup = Group("Maroon Family", members, 4);
const testText = "French Toast for lunch!"


export default function TabOneScreen({ navigation, route }: RootTabScreenProps<'TabOne'>) {
  const [postData, setPostData] = React.useState(defaultData); // list of posts.
  const [count, setCount] = React.useState(4); // id post counter
  const [deliveryDate, setDeliveryDate] = React.useState(null);
  const ann1 = 'It’s your turn to pick the ingredient pack!'
  const ann2 = `Your delivery is coming this ${deliveryDate}!`

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      
      // Get data from createNewPost and from choosing ingredients delivery date.
      if(route.params){
        if(route.params === 'Monday' || route.params === 'Tuesday'|| route.params === 'Wednesday'){
            setDeliveryDate(route.params);
            return;
        }

        setCount(count+1); // update post counter.
        const newPost = {
          id: 1 + count.toString(), // '110' instead of '20'
          postType: route.params[0] ? route.params[1] === '' ? 'imageOnly' : 'imageDesc' : 'textOnly',
          img: route.params[0],
          text: route.params[1],
          desc: route.params[1],
          member: member1, // user.
        };
        
        // If no text or img then don't add new post.
        if (route.params[0] || !(route.params[1] ==='')){
          setPostData(

            [  {...postData[0], data:
              [newPost, ...postData[0].data]}, ...postData.slice(1)
  
            ]
          );
        }

      }


    });
  });

  return (
    <View style={styles.container}>
      <TopBar group = {myGroup} delDate={`${deliveryDate ? deliveryDate : null}`}  annText={`${deliveryDate ? ann2: ann1}`} activeButton= {deliveryDate ? false: true}/>
      <View style={styles.bulletinBoard}>
        <View style={styles.postArea}>

          <SectionList
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={postData}
          renderSectionHeader={({ section }) => (
            <>
              <View style = {styles.dayPost}>
              <Text style={styles.title}>{`${section.title.toUpperCase()}`}</Text>
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => <Post type={item.postType} img={item.img}  text = {item.text} desc = {item.desc} member={item.member}/>}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}/>
                </View>
              
            </>
          )}
          renderItem={({ item, section }) => {
            return null;

          }}
        />

        </View>
      </View>
      <Button
        onPress={() => navigation.navigate('NewPost')}
        title="Create a new post"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-start',
  },

  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color:'#FF792E',
    paddingVertical: '2%',
    alignSelf: 'center',
  },

  bulletinBoard: {
    flex: 1,
    backgroundColor: '#FBF9F8',
    justifyContent: 'flex-start',
    alignItems: 'center'

  },

  postArea:{
    backgroundColor: '#F3EDE5',
    alignSelf: 'stretch',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  dayPost:{
    backgroundColor: '#F3EDE5',
    paddingBottom:'5%',
    paddingLeft: '5%',
  }

});

const defaultData= [
  {
    id: 'd1',
    title: 'Today',
    data: [  {
      id: '10',
      postType: 'textOnly',
      img: null,
      text: 'Today I made spaghetti!',
      desc: null,
      member: member1,
  
    },
    {
      id: '11',
      postType: 'textOnly',
      img: null,
      text: 'Can\'t wait to use the ingredients to cook!',
      desc: null,
      member: member2,
  
    },
    {
      id: '12',
      postType: 'textOnly',
      img: null,
      text: testText,
      desc: null,
      member: member3,
  
    },
    {
      id: '13',
      postType: 'textOnly',
      img: null,
      text: 'The ingredients are so fresh this week!',
      desc: null,
      member: member4,
  
    }
    

    ]
  },

];
