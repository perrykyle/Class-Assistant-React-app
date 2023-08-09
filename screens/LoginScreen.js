import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importing necessary components from React Native and Expo

const LoginScreen = () => {
  //Defining a functional component for the Login screen

  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  //Initializing the navigation and state variables

  const handleSubmit = () => {
    //Defining the function that handles user input and navigation
    if (username === 'john123' && password === 'password') {
      setError(false);
      navigation.navigate('Dropdown');
    } else {
      setError(true);
      setUsername('');
      setPassword('');
    }
  };

  return (
    //Returning the user interface for the Login screen
    //I realized I probably could have put the VCU header once in the App.js but I was new to react lol
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={require('../assets/vcu.png')} style={styles.vcuImage} />
      <Text style={styles.welcomeText}>Welcome back!</Text>
      <Text style={styles.loginInfo}>Please sign in with your VCU eid and password</Text>
      {error && <Text style={styles.errorText}>Incorrect username or password</Text>}
      <View>
        <TextInput
          style={styles.input}
          placeholder="VCU EID"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //Styling the Login screen components
  container: {
    flex: 1,
    backgroundColor: '#3D3D3D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vcuImage: {
    position: 'absolute',
    top: 100,
    width: 180,
    height: 100,
    resizeMode: 'contain',
  },
  welcomeText: {
    color: 'white',
    fontSize: 26,
    marginBottom: 25,
  },
  loginInfo: {
    color: 'white',
    fontSize: 18,
    marginBottom: 25,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: 200,
  },
  loginButton: {
    backgroundColor: '#32CD32',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default LoginScreen;
//Exporting the LoginScreen component to use it elsewhere in the app