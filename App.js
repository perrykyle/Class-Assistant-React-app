import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//React and Navigation imports

import LoginScreen from './screens/LoginScreen';
import DropdownScreen from './screens/DropdownScreen';
import CourseScreen from './screens/CourseScreen';
import QuizScreen from './screens/QuizScreen';
import ScoreScreen from './screens/ScoreScreen';
import LoadStudent from './screens/LoadStudent';
//Screen imports

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}
      //Options for the Stack Navigator enable a smoother experience
      //Login Screen is first
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dropdown" component={DropdownScreen} />
        <Stack.Screen name="Course" component={CourseScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Score" component={ScoreScreen} />
        <Stack.Screen name="Student" component={LoadStudent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
// Export App