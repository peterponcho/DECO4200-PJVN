import React from 'react';
import { Image, Text, View, StyleSheet} from 'react-native';

function DisplayKit({kitSelected, isBefore, servings}) {
    const eachServingString = "Each serving contains:\n"
    const priceString = `\nPrice per serving $${kitSelected?.price}`

    const portionString = `Selected portion size: ${servings}\n`;
    const containString = `Your ${kitSelected?.name} ingredients pack will contain:\n`

    if (isBefore){
        return (
            <View style = {styles.parent}>
                <View style={styles.picInfo}>
                    <Image
                    source={kitSelected?.title}
                    style={styles.slideImg}
                    />
                    <Text style = {styles.subtitleText}>
                    {kitSelected?.info}
                    </Text>
                </View>
                <View style={styles.infoOnly}>
                    <Text style = {styles.subtitleText}>
                        {eachServingString}
                    </Text>
                    {
                        kitSelected?.ingredients.map((item, index) => (
                            <Text style= {styles.ingrText}>
                                {`${kitSelected?.quantity[index]} ${item}`}
                            </Text>
                        )

                        )
                    }
                    <Text style = {styles.subtitleText}>
                        {priceString}
                    </Text>
                </View>
            </View>

        );
    }else {
        return (
            <View style = {styles.parent}>
                <View style={styles.picInfo}>
                    <Image
                    source={kitSelected?.title}
                    style={styles.slideImg}
                    />
                    <Text style = {styles.subtitleText}>
                    {kitSelected?.info}
                    </Text>
                </View>
                <View style={styles.infoOnly}>
                    <Text style = {styles.subtitleAfterText}>
                        {portionString}
                    </Text>
                    <Text style = {styles.subtitleAfterText}>
                        {containString}
                    </Text>
                    {
                        kitSelected?.ingredients.map((item, index) => (
                            <Text style= {styles.ingrAfterText}>
                                {`${kitSelected?.quantity[index]*servings} ${item}`}
                            </Text>
                        )

                        )
                    }

                </View>
            </View>

        );


    }

}
const styles = StyleSheet.create({
    parent:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        paddingBottom: '5%'
    },
    slideImg:{
        resizeMode: 'contain',
        height: '70%',
        width: '100%',
    },
    subtitleText:{
        color: '#2D2D2D',
        fontSize: 25,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 30,
        paddingVertical: '2%',

    },
    subtitleAfterText:{
        color: '#2D2D2D',
        fontSize: 25,
        fontWeight: '400',
        textAlign: 'left',
        lineHeight: 30,
        // paddingVertical: '2%',
        paddingLeft: '20%',
    },
    ingrText:{
        color: '#2D2D2D',
        fontSize: 25,
        fontWeight: '400',
        textAlign: 'left',
        lineHeight: 40,
        paddingLeft: '25%',

    },
    ingrAfterText:{
        color: '#2D2D2D',
        fontSize: 25,
        fontWeight: '400',
        textAlign: 'left',
        lineHeight: 40,
        paddingLeft: '20%',

    },
    picInfo:{
        // flexDirection: 'row',
        justifyContent: 'center',
        flex:1
    },
    infoOnly:{
        flex: 1,

    }

});

export default DisplayKit;