import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import createNewPost from '../screens/createNewPost';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ChoosingIngredients from '../screens/ChoosingIngredients';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import HowPickWork from '../screens/HowPickWork';
import TrackDelivery from '../screens/TrackDelivery';
import HowToPick from '../screens/HowToPick';
import WhyThree from '../screens/WhyThree';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Mealshare" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ChooseIngr" component={ChoosingIngredients} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="NewPost" component={createNewPost} options={{ title: 'Create a New Post' }}/>
        <Stack.Screen name="HowPickWork" component={HowPickWork} options={{ title: 'How Does Picking Ingredients Work?' }}/>
        <Stack.Screen name="TrackDelivery" component={TrackDelivery} options={{ title: 'Estimated Delivery'}}/>
        <Stack.Screen name="HowToPick" component={HowToPick} options={{ title: 'How do I pick my ingredients pack?'}}/>
        <Stack.Screen name="WhyThree" component={WhyThree} options={{ title: 'Why are there only 3 days?'}}/>
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={{headerShown: false, title: 'Bulletin Board', tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />}}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Help Center',
          tabBarIcon: ({ color }) => <TabBarIcon name="question" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}
