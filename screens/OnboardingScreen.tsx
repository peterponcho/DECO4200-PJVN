import * as React from 'react';
import { TextInput, SafeAreaView, View, Image, Text, StyleSheet, Dimensions, FlatList, Button, TouchableOpacity} from 'react-native';
// https://github.com/hakymz/OnboardingScreenAppReactNative/blob/main/src/screens/OnboardingScreen.js

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function OnboardingScreen({navigation}) {

    const ref = React.useRef(); // Reference the flatlist

    // Alternative subtitle and titles
    const haveCardTitle = 'Sign Up with your mealshare card'; 
    const noCardTitle = 'Don’t Have a card?';
    const haveCardSub = 'To create your MealShare account, you must have your registered Harris Farm card ready. It looks like this:';
    const noCardSub = 'Head to your nearest Harris Farm to create your MealShare membership card and account.';
    const identityText =  'What is your full name?';
    const identityWrong = 'Your full name seems to be wrong. Please make sure you check the spelling.'


    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const [hasCard, setHasCard] = React.useState(true);
    const [showNext, setShowNext] = React.useState(true);
    const [altTitle, setAltTitle] = React.useState(haveCardTitle);
    const [altSub, setAltSub] = React.useState(haveCardSub);
    const [identitySub, setIdentitySub] = React.useState(identityText);
    const inputText = React.useRef(); // Full name input text

    // Onboarding slides.
    const slides = [
        {
            id: '1',
            image: require('../assets/images/landingImg.png'),
            title: 'Welcome to Mealshare',
            subtitle: 'Embark on a cooking journey with your friends and families. Cook with fresh ingredients from  Harris Farms and share recipes, photos and tips.',
        },
        {
            id: '2',
            image: require('../assets/images/sampleCard.png'),
            title: altTitle,
            subtitle: altSub,
        },
        {
            id: '3',
            image: require('../assets/images/tapCard.png'),
            title: 'Tap your card here',
            subtitle: 'Tapping your card here will sync your details onto the device for a quick sign up process.',
        },
        {
            id: '4',
            image: require('../assets/images/successful.png'),
            title: 'Your tap was successful',
            subtitle: null,
        },
        {
            id: '5',
            image: null,
            title: 'Verify your identity',
            subtitle: identitySub,
        },
        {
            id: '6',
            image: require('../assets/images/successful.png'),
            title: 'Verification successful',
            subtitle: null,
        },
        {
            id: '7',
            image: require('../assets/images/groupDp.png'),
            title: 'Your group',
            subtitle: 'Mary Maroon has invited you to join their group called “The Maroon Family”.',
        },
        {
            id: '8',
            image: require('../assets/images/vidTutorial.png'),
            title: 'MealShare Tour',
            subtitle: 'Taking you on a tour of MealShare to show you step by step how everything works.',
        },
      ];

    // Slide component.
    const Slide = ({item}) => {

        // if landing screen, then image comes first.
        if (item.id === '1') {
            return(
                <View style= {styles.mainScreen}>
                    <View style= {styles.slideWrapper}>
                        <Image
                            source={item?.image}
                            style={styles.slideImg}
                        />

                        <Text
                        style={styles.titleText}>
                            {item?.title}
                        </Text>

                        <Text
                        style= {styles.subtitleText}>
                            {item?.subtitle}
                        </Text>

                    </View>


                </View>
            );
        
        // Else image comes last.
        }else{
            return(
                <View style= {styles.mainScreen}>
                    <View style= {styles.slideWrapper}>

                        <Text
                        style={styles.titleText}>
                            {item?.title}
                        </Text>
        
                        <Text
                        style= {styles.subtitleText}>
                            {item?.subtitle}
                        </Text>

                        {/* Image as button for tap card slide */}
                        {item.id === '3' && 
                            <TouchableOpacity
                                onPress={goNext}
                                style = {{justifyContent: 'center'}}> 
                                <Image
                                source={item?.image}
                                style={styles.slideImg}
                            />
                            </TouchableOpacity>
                            
                            }

                        {item.image && item.id !== '3'&& <Image
                        source={item?.image}
                        style={styles.slideImg}
                        />}

                        {/* Text input for identity verification slide */}
                        {item.id === '5'&& <TextInput 
                        style={styles.textInputArea}
                        placeholder="Tap to start typing"
                        onChangeText={handleEditChange}
                        />}
        
                    </View>
        
        
                </View>
        
            );
        }
    }
    // Captures text input.
    const handleEditChange = (text: string) =>{
        inputText.current = text;

    }

    // Handles next button
    const goNext = () => {
        let allClear = true; // To prevent going next if user inputs wrong full name.

        // If current slide is identity verification slide then check input string.
        if (currentSlideIndex == 4){
            const currentText = inputText.current;

            // if input string is not the correct fullname then change text and
            // rpevent from going to next slide.
            if (currentText?.toUpperCase().replaceAll(" ", "") != 'LISAMAROON'){
                allClear = false;
                setIdentitySub(identityWrong);
            }else{
                setIdentitySub(identityText);
            }
            // Reset imput text.
            inputText.current = '';
            


        }

        // Go to next slide.
        // Or to bulletin board if no slides left.
        if (allClear){
            const nextSlideIndex = currentSlideIndex + 1;

            if (nextSlideIndex != slides.length) {
                const offset = nextSlideIndex * windowWidth;
                ref?.current.scrollToOffset({offset});
                setCurrentSlideIndex(currentSlideIndex + 1);

            }else{
                navigation.navigate("Mealshare");
            }

        }

      };

      // Handles back button.
    const goBack = () => {

        // Back button for 'Don't have mealshare card' screen.
        if(!hasCard){
            setAltTitle(haveCardTitle);
            setAltSub(haveCardSub);
            setShowNext(true);
            setHasCard(true);

        
        // Go to previous slide.
        }else{
            const nextSlideIndex = currentSlideIndex - 1;
            if (nextSlideIndex >=0) {
            const offset = nextSlideIndex * windowWidth;
            ref?.current.scrollToOffset({offset});
            setCurrentSlideIndex(currentSlideIndex - 1);
            }
        }

        // Reset text input.
        setIdentitySub(identityText);
        inputText.current = '';

    };

    // Handles 'I don't have a card' button on slide 1.
    const noCard = () =>{
        setAltTitle(noCardTitle);
        setAltSub(noCardSub);
        setShowNext(false);
        setHasCard(false);
    }

    // Bottom navigation buttons of the screen.
    const ButtonNav = () => {
        return (
            <View
            style = {styles.buttonNavs}>

                {/* No back button on landing screen */}
                {currentSlideIndex != 0 && <TouchableOpacity 
                style={styles.nextButton}
                onPress={goBack}>
                    <Text
                        style = {styles.buttonText}>
                        Back
                    </Text>
                </TouchableOpacity>}
                
                {/* Button only in 'Sign up you meakshare card' slide */}
                {currentSlideIndex == 1 && hasCard && 
                <TouchableOpacity 
                style={styles.nextButton}
                onPress={noCard}>
                    <Text
                        style={styles.buttonText}>
                        I Don't have a card
                    </Text>
                </TouchableOpacity>}
                
                {/* No next button on 'Tap card' slide */}
                {showNext && currentSlideIndex != 2 && <TouchableOpacity 
                style={styles.nextButton}
                onPress={goNext}>
                    <Text
                        style={styles.buttonText}>
                        Next
                    </Text>
                </TouchableOpacity>}


            </View>
        );
    }

    // Top navigation indicator bar.
    const navInfo = [
        {
            id: '1',
            title: 'Scan Card',
        },
        {
            id: '2',
            title: 'Verify It’s You',
        },
        {
            id: '3',
            title: 'Groups',
        },
        {
            id: '4',
            title: 'Tutorials',
        },

    ];

    // Top navigation indicator bar component.
    const NavIndicator = () =>{

        // No bar on landing page.
        if (currentSlideIndex == 0){
            return(null);
        }

        return(
            <View
                style={styles.indicatorWrapper}>

                {/* 'Scan card' on slides with id 1,2,3
                'Verify it's you' on slides with id 4, 5
                'Groups' on slides with id 6
                'Tutorials' on slides with id 7 */}
                {navInfo.map((item, index) => (
                <View
                    key={index}
                    style={[
                    styles.indicator,
                    (currentSlideIndex < 4 && index == 0 || 
                    currentSlideIndex < 6 && currentSlideIndex >=4 && index <= 1 ||
                    currentSlideIndex == 6 &&  index <= 2 ||
                    currentSlideIndex == 7 &&  index <= 3)
                    && {
                        backgroundColor: "#205ECF",

                    },
                    ]}>
                        <Text style = {[styles.navText,   
                        !(currentSlideIndex < 4 && index == 0 || 
                        currentSlideIndex < 6 && currentSlideIndex >=4 && index <= 1 ||
                        currentSlideIndex == 6 &&  index <= 2 ||
                        currentSlideIndex == 7 &&  index <= 3)
                        && {
                        color: "#C4C4C4"}]}>{item.id + "  " + item.title}</Text>

                </View>
                ))}

            </View>

        );

    }

    // Main onboarding component.
    return (
        <SafeAreaView style={styles.onboardingBg}>
            <NavIndicator/>
            <FlatList
                ref={ref}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={slides}
                pagingEnabled
                scrollEnabled= {false}
                renderItem={({item}) => <Slide item={item} />}
            />
            <ButtonNav/>

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({

    onboardingBg:{
        backgroundColor: '#F3EDE5', 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '1%',
    },

    mainScreen:{
        width: windowWidth,
        paddingRight: '10%',
        paddingLeft: '10%',
        paddingTop: '5%',
        flex: 1
    },

    slideWrapper:{
        justifyContent: 'flex-start',
        flex: 1
    },

    slideImg:{
        resizeMode: 'contain',
        height: '70%',
        width: '100%',
    },

    nextButton:{
        justifyContent: 'center', 
        alignItems: 'center',
    },

    titleText:{
        color: '#FF792E',
        fontSize: 50,
        lineHeight: 50,
        fontWeight: 'bold',
        paddingBottom: '2%',  
    },

    subtitleText:{
        fontSize: 25,
        fontWeight: '500',
        lineHeight: 30,
        paddingBottom: '2%',
    },

    buttonNavs:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: windowWidth,
        flex: 1
    },

    buttonText:{
        fontSize: 30
    },

    indicator: {
        flex: 1,
        height: 40,
        width: 50,
        backgroundColor: '#EDE7E7',
        marginHorizontal: 3,
        borderRadius: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },

    indicatorWrapper:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: '10%',
    },

    navText:{
        fontSize: 20,
        fontWeight: '500',
        color: '#fff'
    },

    textInputArea:{
        height: 80,
        padding: 10,
        fontSize: 40,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: '#FF792E',
    }

});

export default OnboardingScreen;