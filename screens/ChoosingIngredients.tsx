import * as React from 'react';
import { TextInput, SafeAreaView, View, Image, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import { dietaryList, allergies, navInfo, specialDiet, religiousReasons, kits } from '../components/ChoosingIngredientsData';
import DisplayKit from '../components/DisplayKit';
const windowWidth = Dimensions.get('window').width;

let dietReq = []; // Captures dietary requirements input from users, if needed.
let originalBalance = 60; // dummy balance that user has.
const test=[{id: '1'}]; // Dummy list for flatlist.


const ChoosingIngredients = ({navigation}) => {
    const ref = React.useRef(); // Reference the flatlist (slides)
    const inputText = React.useRef(); // additional dietary requirements input text

    const [kitSelected, setKitSelected] = React.useState(null); // ingredient pack that user selects.
    const [countServing, setCountServing] = React.useState(1); // serving size that user selects.
    const [deliveryDate, setDeliveryDate] = React.useState('Monday'); // delivery date that user selects.
    const [balance, setBalance] = React.useState(originalBalance); // dummy balance for user.
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const [hasDiet, setHasDiet] = React.useState(true); // skip dietary requirements slide if set to true.
    const [inDietMenu, setInDietMenu] = React.useState(false); // indicates user is in dietary menu if set to true.
    const [selected, setSelected] = React.useState(false); //  toggle for dietary checkbox.

    // Delivery date.
    const [monSelected, setMonSelected] = React.useState(false);
    const [tuesSelected, setTuesSelected] = React.useState(false);
    const [wedSelected, setWedSelected] = React.useState(false);
    const [checkSelected, setCheckSelected] = React.useState(false);

    // Display images for dietary requirements menu. 
    const [dietaryImg, setDietaryImg] = React.useState(dietaryList);

    // Slides.
    const slides=[
        {
            id: 'c1',
            multipleImg: false,
            hasQuestion: true,
            image: require('../assets/images/yourTurn.png'),
            title: 'This week it’s your turn to pick the ingredient pack that the group is cooking with!',
            subtitle: null,
            question: 'How does picking ingredient work?',
            nextText: 'Next',
            indicator: 1,

        },
        {
            id: 'c2',
            multipleImg: false,
            hasQuestion: false,
            image: null,
            title: 'Do you have any allergies or dietary requirements we need to know about?',
            subtitle: null,
            question: null,
            nextText: null,
            indicator: 2,
    
        },
        
        {
            id: 'c3',
            multipleImg: true,
            hasQuestion: false,
            image: dietaryImg,
            title: 'What are they?',
            subtitle: 'Not listed here? Let us know what it is.',
            question: null,
            nextText: 'Next',
            indicator: 2,
    
        },
        {
            id: 'c4',
            multipleImg: false,
            hasQuestion: false,
            image: require('../assets/images/thanks.png'),
            title: 'Thanks for that!',
            subtitle: 'We’ll take this into account when picking your ingredients\nand make sure they’re suitable for your preferences.\n\nThis data will be saved on your account so you don’t have to\nrepeat this process again.',
            question: null,
            nextText: 'Next',
            indicator: 2,
        },{
            id: 'c5',
            multipleImg: false,
            hasQuestion: true,
            image: kits,
            title: 'Pick your ingredient pack for this week!',
            subtitle: null,
            question: 'How do I pick my ingredients pack?',
            nextText: 'Next',
            indicator: 3,
        },
        {
            id: 'c6',
            multipleImg: false,
            hasQuestion: false,
            image: kitSelected?.title,
            title:`${kitSelected?.name}`,
            subtitle: null,
            question: null,
            nextText: 'Choose this pack',
            indicator: 3,
        },
        {
            id: 'c7',
            multipleImg: false,
            hasQuestion: false,
            image: null,
            title: 'Confirm your selection',
            subtitle: 'Please note that you can’t make changes to your ingredients pack once you press confirm.',
            question: null,
            nextText: 'Confirm',
            indicator: 3,
    
        },
        {
            id: 'c8',
            multipleImg: false,
            hasQuestion: false,
            image: require('../assets/images/balance.png'),
            title: 'Well done for choosing the ingredient pack for your group this week!',
            subtitle: 'Your remaining balance:',
            question: null,
            nextText: 'Next',
            indicator: 3,
    
        },
        {
            id: 'c9',
            multipleImg: false,
            hasQuestion: true,
            image: null,
            title: 'Now let’s choose the delivery date.',
            subtitle:'Which day would you like your pack delivered to you?',
            question:'Why are there only 3 days?',
            nextText: 'Confirm',
            indicator: 4,
        },
        {
            id: 'c10',
            multipleImg: false,
            hasQuestion: false,
            image: require('../assets/images/delivery.png'),
            title: `Great! Your MealShare ingredient pack is scheduled to arrive on ${deliveryDate}.`,
            subtitle: 'We’ll notify you when it’s out on its way to your home.\nYou can track the delivery in the Bulletin Board. ',
            nextText: 'Confirm',
            indicator: 4,
        }
    
    ];



    // Handles next button
    const goNext = () => {

        // Changes balance after user confirms their ingredient pack.
        if (currentSlideIndex == 6){
            setBalance (balance -(kitSelected?.price * countServing));

        }
        // Indication if user is in checkbox menu.
        if (currentSlideIndex == 2){
            setInDietMenu(false);
        }
        // Does not skip dietary part if user pressed yes when asked dietary requirements.
        if (currentSlideIndex == 1){
            setHasDiet(true);
        }

        // Go to next slide.
        // Or to bulletin board if no slides left.
        /* USYD CODE CITATION ACKNOWLEDGEMENT
        * I declare that the following lines of code have been copied from the
        * website titled: " OnboardingScreenAppReactNativePublic"
        * and it is not my own work.
        *
        * Original URL
        * //https://github.com/hakymz/OnboardingScreenAppReactNative/blob/main/src/screens/OnboardingScreen.js
        * Last access November, 2021
        */
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * windowWidth;
            ref?.current.scrollToOffset({offset});
            setCurrentSlideIndex(currentSlideIndex + 1);
            /* end of copied code */
        }else{
            navigation.navigate("Mealshare", {screen: 'TabOne', params: deliveryDate} );
        }

    
    };

    // Handles next button when user has no dietary requirements
    const skipDiet = () => {

        // Skip dietary requirements slide.
        /* USYD CODE CITATION ACKNOWLEDGEMENT
        * I declare that the following lines of code have been copied from the
        * website titled: " OnboardingScreenAppReactNativePublic"
        * and it is not my own work.
        *
        * Original URL
        * //https://github.com/hakymz/OnboardingScreenAppReactNative/blob/main/src/screens/OnboardingScreen.js
        * Last access November, 2021
        */
        const nextSlideIndex = currentSlideIndex + 2;
        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * windowWidth;
            ref?.current.scrollToOffset({offset});
            setCurrentSlideIndex(currentSlideIndex + 2);

        }
        /* end of copied code */

        setHasDiet(false);
    };


    // Handles back button.
    const goBack = () => {
        // Skips dietary requirement slide if user pressed no previously.
        let num = 0;
        if (currentSlideIndex == 3 && !hasDiet){
            num = 2;
        }else{
            num = 1;
        }

        // go back to previous menu according to where users are in the dietary requiremets slide.
        if (currentSlideIndex == 2 && inDietMenu|| currentSlideIndex == 3 && hasDiet ){
            setDietaryImg(dietaryList);
            setInDietMenu(false);
        }

        if (currentSlideIndex == 2 && inDietMenu){

            setDietaryImg(dietaryList);
            return;
        }

        // Go back to previous slide
        // Or to bulletin board if first slide.
        const nextSlideIndex = currentSlideIndex - num;
        if (nextSlideIndex >=0) {
            const offset = nextSlideIndex * windowWidth;
            ref?.current.scrollToOffset({offset});
            setCurrentSlideIndex(currentSlideIndex - num);
        }else if(nextSlideIndex <0){
            navigation.navigate("Mealshare");

        }

    };

    // Handles buttons in dietary requirements menu
    const dietaryHandler = (item, id) =>{
        // Id 0 indicates allergies menu
        // Id 1 indicates intolerances menu
        // Id 2 indicates religious reasons menu

        // Change image according to which menu user selects.
        if (id.length == 1){
            setInDietMenu(true);
            if (id == 1){
                setDietaryImg(allergies);
                
            }else if (id == 2){
                setDietaryImg(specialDiet);

            }else if (id == 3){
                setDietaryImg(religiousReasons);
            }

        }else{
            
            // Handles checkboxes when user is in a menu
            item.color = item.color == '#FF792E' ? 'white' : '#FF792E';
            setSelected(!selected);

            // Deletes input if unchecked.
            if (dietReq.includes(id)){
                const idx = dietReq.indexOf(id);
                dietReq.splice(idx, 1);
            
            // Adds input if unchecked.
            }else{
                dietReq = [...dietReq, id];
            }

            
        }

    }

    // Captures text input of custom dietary requirements.
    const handleEditChange = (text: string) =>{
        inputText.current = text;

    }

    // Adds custom text input of dietary requirements.
    const submitDietHandler = () =>{
        // Input text is submited after user presses enter and the submit button.
        if (inputText.current !== ""){
            setSelected(!selected);
            dietReq = [...dietReq, inputText.current];

        }

        inputText.current= "";
    }

    // Set selected kit and go to next slide.
    const selectKitHandler = (item) => {

        // Make sure to change maximum number of servings.
        // Else user would have negative balance.
        let newNum = 0;
        const total = item?.price * countServing;

        if (total > balance){
            while(newNum* item?.price <= balance){
                newNum ++;
            }
            
            setCountServing(newNum-1);
        }
        
        setKitSelected(item); // set the ingredient kit user selects.

        // Go to next slide.
        const offset = (currentSlideIndex +1) * windowWidth;
        ref?.current.scrollToOffset({offset});
        setCurrentSlideIndex(currentSlideIndex + 1);
    }

    // Handles serving size buttons.
    const servingSizeHandler = (num) => {
        
        // num is -1 when user presses the '-' button, 1 when user presses '+' button.
        const newNum = countServing + num;
        const total = kitSelected?.price * newNum;
        const newBalance = balance - total;
        
        // Make sure that servings is at least 1 and not more than balance user has.
        if ((num <0 && countServing >1)|| (num >0 && countServing >=0) && newBalance >= 0){
            setCountServing(newNum);
        }

        
    }

    // Handles the delivery date buttons.
    const deliveryDateHandler = (day) => {

        setCheckSelected(true);
        setDeliveryDate(day);

        if (day === 'Monday'){
            setMonSelected(true);
            setTuesSelected(false);
            setWedSelected(false);

        }else if (day === 'Tuesday'){
            setMonSelected(false);
            setTuesSelected(true);
            setWedSelected(false);

        }else if (day === 'Wednesday'){
            setMonSelected(false);
            setTuesSelected(false);
            setWedSelected(true);
        }

    }

    // Handles the questions button.
    const questionHandler = (index) => {
        if (index == 0){
            navigation.navigate('HowPickWork');
        }else if (index == 4){
            navigation.navigate('HowToPick');
        }else if (index == 8){
            navigation.navigate('WhyThree');
        }

    }


    // Bottom navigation buttons of the screen.
    const ButtonNav = () => {
        return (
            <View
            style = {styles.buttonNavs}>

                {/* No back button after user confirms ingredient pack*/}
                { currentSlideIndex != 7 &&
                
                <TouchableOpacity 
                style={styles.nextButton}
                onPress={goBack}>
                    <Text
                        style = {styles.buttonTextBack}>
                        Back
                    </Text>
                </TouchableOpacity>}
                
                {/* question button */}
                {slides[currentSlideIndex]?.hasQuestion && 
                <TouchableOpacity 
                style={styles.nextButton}
                onPress={() => questionHandler(currentSlideIndex)}>
                    <Text
                        style={styles.buttonQuestionText}>
                        {slides[currentSlideIndex]?.question}
                    </Text>

                </TouchableOpacity>
                }
                
                {/* Next button. No next button when user is asked dietary requirements */}
                { ((currentSlideIndex != 1 &&
                currentSlideIndex != 4 && currentSlideIndex != 8) ||
                (currentSlideIndex == 8 && checkSelected)) &&
                <TouchableOpacity 
                    style={styles.nextButton}
                    onPress={goNext}>
                    <Text
                        style={styles.buttonTextNext}>
                        {slides[currentSlideIndex]?.nextText}
                    </Text>
                </TouchableOpacity>}


            </View>
        );
    }

    // Top navigation indicator bar component.
    const NavIndicator = () =>{

        return(
            <View
                style={styles.indicatorWrapper}>

                {navInfo.map((item, index) => (
                <View
                    key={index}
                    style={[
                    styles.indicator,
                    (slides[currentSlideIndex]?.indicator >= item?.id)
                    && {
                        backgroundColor: "#205ECF",

                    },
                    ]}>
                        <Text style = {[styles.navText,   
                        !(slides[currentSlideIndex]?.indicator >= item?.id)
                        && {
                        color: "#C4C4C4"}]}>{item.title}</Text>
                </View>
                ))}


            </View>

        );

    }

    // Slide component.
    const Slide = ({item}) => {

        return(
            <View style= {styles.mainScreen}>
                <View style= {styles.slideWrapper}>

                    {/* Title of slide */}
                    <Text
                    style={styles.titleText}>
                        {item?.title}
                    </Text>
    
                    {/* Single imae of slide */}
                    {!item.multipleImg && 
                    item?.image && 
                    currentSlideIndex != 4  
                    && currentSlideIndex != 5 
                    && currentSlideIndex != 6 &&
                    <Image
                    source={item?.image}
                    style={styles.slideImg}
                    />}

                    {/* Dietary requirements slide */}
                    {item.multipleImg && 
                        <View
                        style={{ flex: 1, alignItems: 'center'}}>

                            <View
                                style = {styles.listImg}>
                                

                                {item.image.map((item, index) => (
                                    
                                <TouchableOpacity
                                    style = {styles.dietaryImg}
                                    onPress= {() => dietaryHandler(item, item.id)}>

                                    <View style={[styles.checkbox, {backgroundColor: item?.color}]} />
                                    <Image source={item.title}/>
                                    <Text style={styles.subtitleText}>
                                        {item?.subtitle}
                                    </Text>

                                </TouchableOpacity>

                                ))}
                            </View>
                        </View>
                    }

                    {/* Subtitle of slide. */}
                    {((inDietMenu && currentSlideIndex == 2 ) ||
                    (!inDietMenu && currentSlideIndex != 2 ) ) &&
                    currentSlideIndex != 5 &&
                    currentSlideIndex != 6 &&
                    <Text
                    style= {styles.subtitleText}>
                        {item?.subtitle}
                    </Text>
                    
                    }

                    {/* Text input for dietary requirements */}
                    {(inDietMenu && currentSlideIndex == 2 ) &&
                    <TextInput 
                    style={styles.textInputArea}
                    placeholder="Tap to start typing"
                    onChangeText={handleEditChange}
                    />}

                    {(inDietMenu && currentSlideIndex == 2 ) &&
                    <TouchableOpacity
                    onPress= {submitDietHandler}>
                        <Text
                        style = {styles.submitText}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                    }

                    {/* Select kits slide */}
                    {currentSlideIndex == 4 && 
                        <View
                        style={{ flex: 1, alignItems: 'center'}}>

                            <View
                                style = {styles.listImg}>
                                

                                {kits.map((item, index) => (
                                    
                                <TouchableOpacity
                                    onPress= {() => selectKitHandler(item)}>

                                    <Image
                                    source={item.title}
                                    style={styles.kitImg}
                                    />
                                    <Text
                                    style={styles.subtitleText}>{item?.name}</Text>

                                    
                                </TouchableOpacity>

                                ))}
                            </View>
                        </View>
                    }

                    {/* View kits slide. */}
                    {currentSlideIndex == 5 &&
                    <FlatList
                    data={test}
                    renderItem={({item}) => (

                    <View style={{flex:1}}>                        
                        <Text style = {styles.subtitleText}>
                        {'Your current balance'}
                        </Text>
                        <Text style = {styles.subtitleText}>
                            {`$${balance}`}
                        </Text>
                        <Text style = {styles.subtitleText}>
                            {'How many servings would you like?\n'}
                        </Text>
                        <View style = {styles.selectServingSize}>
                            <TouchableOpacity
                                onPress= {() => servingSizeHandler(-1)}>
                                <Image
                                source={require('../assets/images/minus.png')}
                                />
                            </TouchableOpacity>
                            <Text style = {styles.subtitleText}>
                                {`${countServing}`}
                            </Text>
                            <TouchableOpacity
                                onPress= {() => servingSizeHandler(1)}>
                                <Image
                                source={require('../assets/images/add.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <DisplayKit kitSelected = {kitSelected} isBefore = {true} servings = {countServing}></DisplayKit>

                    </View>
                        
                    )}/>}

                    {/* Confirm kits slide. */}
                    {currentSlideIndex == 6 &&
                    <FlatList
                    data={test}
                    renderItem={({flitem}) => (
                        <View>
                            <Text style = {styles.subtitleText}>
                            {`Total cost for ${countServing} `+ (countServing == 1 ? 'serving:':'servings:')}
                            </Text>
                            <Text style = {styles.subtitleText}>
                                {`$${countServing*kitSelected?.price}\n`}
                            </Text>
                            <Text style = {styles.subtitleText}>
                                {`${item?.subtitle}\n\n`}
                            </Text>
                            <DisplayKit kitSelected = {kitSelected} isBefore = {false} servings = {countServing}></DisplayKit>
                        </View>

                    )}/>} 

                    {/* Balance slide after choosing kit. */}
                    {currentSlideIndex == 7 &&
                        <Text style={styles.titleText}>
                            {`$${balance}`}
                        </Text>
                    } 

                    {/* Choose delivery date slide. */}
                    {currentSlideIndex == 8 &&
                        <View style={styles.deliveryDate}>
                            <TouchableOpacity
                                onPress= {() => deliveryDateHandler('Monday')}>
                                <View style= {[styles.dateBtn, {backgroundColor: monSelected? '#FF792E':'#FFE7D9'}]}>
                                    <Text style={[styles.dateText, { color: monSelected? 'white': '#FF792E'}]}>
                                        {'Monday\n25'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress= {() => deliveryDateHandler('Tuesday')}>
                                <View style= {[styles.dateBtn, {backgroundColor: tuesSelected? '#FF792E':'#FFE7D9'}]}>
                                    <Text style={[styles.dateText, { color: tuesSelected? 'white': '#FF792E'}]}>
                                        {'Tuesday\n26'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress= {() => deliveryDateHandler('Wednesday')}>
                                <View style= {[styles.dateBtn, {backgroundColor: wedSelected?'#FF792E':'#FFE7D9'}]}>
                                    <Text style={[styles.dateText, { color: wedSelected? 'white': '#FF792E'}]}>
                                        {'Wednesday\n27'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    
                    }

                    {/* Yes and no buttons of second slide. */}
                    {currentSlideIndex == 1 &&
                    <View style = {styles.answerBtn}>
                        <TouchableOpacity 
                            style={styles.nextButton }
                            onPress={skipDiet}>
                            <Text
                                style={styles.buttonTextNo}>
                                No
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.nextButton}
                            onPress={goNext}>
                            <Text
                                style={styles.buttonTextYes}>
                                Yes
                            </Text>
                        </TouchableOpacity>
                    </View>}


                </View>
            </View>
        );
    };

    return (
        // Main Choosing Ingredients component.
        <SafeAreaView style={styles.onboardingBg}>
            <NavIndicator/>
            <FlatList
                ref={ref}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={slides}
                extraData={selected}
                pagingEnabled
                scrollEnabled= {false}
                renderItem={({item}) => <Slide item={item} />}
            />
            <ButtonNav/>

        </SafeAreaView>

        
    );
}

// Styles.
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
        justifyContent: 'center',
        flex: 1
    },

    slideWrapper:{
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#FBF9F8',
        borderRadius: 30,
    },

    slideImg:{
        alignSelf: 'center',
        resizeMode: 'contain',
        height: '40%',
        width: '90%',
        paddingBottom: '10%'
    },

    nextButton:{
        justifyContent: 'center', 
        alignItems: 'center',
    },

    titleText:{
        color: '#2D2D2D',
        fontSize: 30,
        lineHeight: 40,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: '10%',
        paddingBottom: '2%',  

    },

    subtitleText:{
        color: '#2D2D2D',
        fontSize: 25,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 30,

    },

    submitText:{
        color: '#2D2D2D',
        fontSize: 25,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 30,
        paddingBottom: '5%',
    },

    buttonNavs:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: windowWidth,
        flex: 1
    },

    buttonTextBack:{
        fontSize: 30,
    },

    buttonTextNext:{
        fontSize: 30,
        color:'#FF792E',
    },

    buttonTextNo:{
        fontSize: 30,
        color:'#666666'
    },

    buttonTextYes:{
        fontSize: 30,
        color:'#FF792E',

    },

    buttonQuestionText:{
        fontSize: 20,
        color: '#205ECF'

    },
    answerBtn:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: '15%',

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
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        color: '#fff', 
    },

    textInputArea:{
        height: 50,
        width: 500,
        padding: 10,
        fontSize: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'white',
        shadowColor: 'black',
        alignSelf: 'center',
        marginBottom: '5%',

    },
    dietaryImg:{
        padding: '2%',
    },

    listImg:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1, 

    },

    kitImg:{
        margin:'1%',
        resizeMode: 'contain',
        height: 250,
        width: 250,

    },

    checkbox:{
        height: 50,
        width: 50,
        borderRadius: 100,
        position: 'absolute', 
        zIndex: 1,
        top: 30,
        left: 180,
    },

    selectServingSize:{
        flexDirection: 'row',
        paddingHorizontal: '20%',
        paddingBottom: '5%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1
    },

    deliveryDate:{
        paddingTop: '5%',
        flexDirection: 'row',
        justifyContent:'space-around',
    },

    dateText:{
        fontSize: 30,
        lineHeight: 40,
        fontWeight: 'bold',
        textAlign: 'center',
    
    },

    dateBtn:{
        width: 200,
        height: 300,
        borderRadius: 100,
        justifyContent: 'center',

    },

});

export default ChoosingIngredients;