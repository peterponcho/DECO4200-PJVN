import * as React from 'react';
import { StyleSheet, TextInput, Button, Image } from 'react-native';
import DisplayPicture from '../components/DisplayPicture';
import { Camera } from 'expo-camera';
import { RootStackScreenProps } from '../types';
import { Text, View } from '../components/Themed';

export default function createNewPost({navigation}: RootStackScreenProps<'Modal'>) {
  const liveCam = <Camera
                    ref={ref => setCamera(ref)}
                    style={styles.fixedRatio}
                    type={type}
                    ratio={'1:1'} />
  
  const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
  const [camera, setCamera] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [postText, setPostText] = React.useState('');
  const [postButtonTitle, setPostButtonTitle] = React.useState('Back to Bulletin Board');
  const [takePictureButton, setTakePictureButton] = React.useState('Take Picture');
  const [cameraDisplay, setCameraDisplay] = React.useState(liveCam);




  React.useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');


    })();
  }, []);

  const takePicture = async () => {

    // Take Picture
    if (camera) {
      const data = await camera.takePictureAsync(null);

      setImage(data.uri);
      setPostButtonTitle('Post');
      setCameraDisplay(<Image source={{uri: data.uri}} style={ {height: '100%', width: '100%'}}/>);
      setTakePictureButton("Remove and Retake Picture");
    
    // Remove Picture to take new picture.
    }else{
      setImage(null);
      setPostButtonTitle('Back to Bulletin Board');
      setCameraDisplay(liveCam);
      setTakePictureButton("Take Picture");
    }
  }

  // Captures text input.
  const handleEditChange = (text: string) =>{
    setPostText(text);

    // 'Post' button set to 'Back to Bulletin Board' if no text or image input.
    if (!(text === '')){
      setPostButtonTitle('Post');
    }else{
      if (!image){
        setPostButtonTitle('Back to Bulletin Board');
      }

    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.textDesc}>

        <View style={styles.user}>
          <DisplayPicture/>
          <Text style={styles.title}>Me</Text>
        </View>

        <TextInput 
        style={styles.textInputArea}
        placeholder="Tap to add text.."
        onChangeText={handleEditChange}
        />

      </View>

      <View style={styles.cameraArea}>
        {cameraDisplay}
      </View>

      <View style = {styles.button}>
        <Button
          title="Flip Image"
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
        </Button>
      </View>

      <View style = {styles.button}>
          <Button title={takePictureButton} onPress={() => takePicture()} />
      </View>

      <View style = {styles.button}>
        <Button title={postButtonTitle} onPress={() => navigation.navigate("Mealshare", {screen: 'TabOne', params: [image, postText]}  )} />
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  textDesc:{
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection:'row',
    width: '100%',
    backgroundColor: 'yellow'

  },

  user:{
    flex: 1,
    backgroundColor: 'red',
  },

  textInputArea:{
    flex: 5,
  },

  cameraArea:{
    flex: 4,
    width: '100%',
  },

  button:{
    flex: 1,
    width: '100%'
  },

  cameraContainer: {
    flex: 1,
    flexDirection: 'row'
  },

  fixedRatio: {
    flex: 1,
    aspectRatio: 1
  }

});
