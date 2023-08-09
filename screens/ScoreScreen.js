import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importing necessary components from React Native and Expo

const { width, height } = Dimensions.get('window');
//Components for styling width and height

const ScoreScreen = ({ route }) => {
  //Defining a functional component for the Score screen

  const { selectedCourse, studentArray, scoreArray } = route.params;
  const navigation = useNavigation();
  //Initializing navigation as well as establishing the route parameters

  let totalScore = 0;
  const totalQuestions = scoreArray.length;

  for(let i = 0; i < totalQuestions; i++){
    if (scoreArray[i] === 1){
        ++totalScore;
    }
  }
  //Finds the total score and total number of students

  const renderMissedNames = () => {
    return studentArray.map((student, index) => {
      if (scoreArray[index] === 0) {
        return (
          <TouchableOpacity
            key={index}
            style={styles.studentNameTouchable}
            onPress={() => {
              navigation.navigate('Student', {
                selectedCourse: selectedCourse,
                student: student,
              });
            }}
          >
            <Text style={styles.studentName}>{student.name}</Text>
          </TouchableOpacity>
        );
      }
    });
  };
  //provides rendering for the missed names that are displayed in the box,
  //the function allows to touch each students name to learn their details
  //It navigates you to a page illustrating the student and their correct name

  return (
    //Returning the user interface for the Score screen
    <View style={styles.container}>
      <Image source={require('../assets/vcu.png')} style={styles.vcuImage} />
      <Text style={styles.courseName}>{selectedCourse}</Text>
      <View style={styles.box}>
        <Text style={styles.title}>Score</Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>{totalScore}/{totalQuestions}</Text>
        </View>
        <Text style={styles.missedNamesTitle}>Missed Names</Text>
        <ScrollView style={styles.missedNamesContainer}>
          {renderMissedNames()}
        </ScrollView>
        <TouchableOpacity style={styles.restartButton} onPress={() => navigation.navigate('Course', {selectedCourse})}>
          <Text style={styles.restartButtonText}>Restart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScoreScreen;

const styles = StyleSheet.create({
  //Styling the Score screen components
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    justifyContent: 'center',
  },
  scoreContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    },
  scoreText: {
    fontSize: 20,
    color: 'black',
    },
  restartButton: {
    backgroundColor: '#32CD32',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    width: width * 0.85 * (7/8),
    justifyContent: 'center',
    alignItems: 'center',
    },
  restartButtonText: {
    fontSize: 20,
    color: 'white',
    },
  missedNamesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    },
  missedNamesContainer: {
    width: (7 / 8) * width - 40,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    },
  studentNameTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    width: '100%',
    },
  studentName: {
    fontSize: 20,
    color: 'black',
    textDecorationLine: 'underline',
    },
});