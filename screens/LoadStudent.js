import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importing necessary components from React Native and Expo

const { width, height } = Dimensions.get('window');
//Components for styling width and height

const LoadStudent = ({ route }) => {
  //Defining a functional component for the Student info screen

  const { selectedCourse, student } = route.params;
  const navigation = useNavigation();
  //Initializing navigation as well as establishing the route parameters

  return (
    //Returning the user interface for the Login screen
    <View style={styles.container}>
      <Image source={require('../assets/vcu.png')} style={styles.vcuImage} />
      <Text style={styles.courseName}>{selectedCourse}</Text>
      <View style={styles.box}>
        <Image source={{ uri: student.href }} style={styles.studentImage} />
        <Text style={styles.studentName}>{student.name}</Text>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoadStudent;

const styles = StyleSheet.create({
  //Styling the Student screen components
  container: {
    flex: 1,
    backgroundColor: '#3D3D3D',
    alignItems: 'center',
  },
  vcuImage: {
    position: 'absolute',
    top: 100,
    width: 180,
    height: 100,
    resizeMode: 'contain',
  },
  courseName: {
    color: 'white',
    fontSize: 26,
    position: 'absolute',
    top: 225,
  },
  box: {
    width: (7 / 8) * width,
    height: height / 2,
    backgroundColor: '#D6D6D6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: (height - height / 3) / 2,
  },
  studentImage: {
    width: 225,
    height: 225,
    borderRadius: 15,
    marginBottom: 15,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goBackButton: {
    backgroundColor: '#32CD32',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.85 * (7 / 8),
  },
  goBackButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
