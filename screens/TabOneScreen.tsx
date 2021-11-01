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
const member2 = Member(2, "Kate Maroon", "Kate", false, false);
const member3 = Member(3, "Lacy Maroon", "Lacy", false, false);
const member4 = Member(4, "Sam Maroon", "Sam", false, false);
const members = [member1, member2, member3, member4];
const myGroup = Group("Maroon Family", members, 4);
const testDescription= 'French Toast for lunch!';
const testText = "YAYYYY!!!!"

export default function TabOneScreen({ navigation, route }: RootTabScreenProps<'TabOne'>) {
  const [postData, setPostData] = React.useState(defaultData); // list of posts.
  const [count, setCount] = React.useState(4); // id post counter

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      
      // Get data from createNewPost.
      if(route.params){
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
      <Button
        onPress={() => navigation.navigate('Modal')}
        title="Create a new post"
      />
      <TopBar group = {myGroup} />
      <View style={styles.bulletinBoard}>
        <View style={styles.postArea}>

          <SectionList
          // horizontal
          // inverted={true}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          stickySectionHeadersEnabled={false}
          sections={postData}
          renderSectionHeader={({ section }) => (
            <>
              <Text style={styles.title}>{section.title}</Text>
              <FlatList
                horizontal
                data={section.data}
                // inverted={true}
                renderItem={({ item }) => <Post type={item.postType} img={item.img}  text = {item.text} desc = {item.desc} member={item.member}/>}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
          renderItem={({ item, section }) => {
            return null;

          }}
        />

        </View>
      </View>

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
  },

  bulletinBoard: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'flex-start',
    alignItems: 'center'

  },

  postArea:{
    backgroundColor: '#aaaaaa',
    alignSelf: 'stretch',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },

});

// The images should've been uri but I haven't put one yet
const defaultData= [
  {
    title: 'Today',
    data: [  {
      id: '10',
      postType: 'textOnly',
      img: null,
      text: testText,
      desc: null,
      member: member1,
  
    },
    {
      id: '11',
      postType: 'textOnly',
      img: null,
      text: testText,
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
      text: testText,
      desc: null,
      member: member4,
  
    }
    

    ]
  },
  {
    title: 'Yesterday',
    data:[  {
      id: '21',
      postType: 'textOnly',
      img: null,
      text: testText,
      desc: testDescription,
      member: member1,
    },
    {
      id: '22',
      postType: 'textOnly',
      img: null,
      text: testText,
      desc: testDescription,
      member: member1,
    }
    ]
  }

];
