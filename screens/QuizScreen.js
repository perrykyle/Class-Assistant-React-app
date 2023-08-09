import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Animated,
  TouchableOpacityBase,
  Touchable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importing necessary components from React Native

const { width, height } = Dimensions.get('window');
//Components for styling width and height

const QuizScreen = ({ route }) => {
  const { selectedCourse, style, mode } = route.params;
  const [students, setStudents] = useState([]);
  const [displayStudentIndex, setDisplayStudentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackImage, setFeedbackImage] = useState(null);
  const [scoreArray, setScoreArray] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  //Initializing lots of variables that determine different variables and settings in the quiz
  // selectedCourse is the course
  // Style is 0 for shuffled students, 1 is for alphabetically sorted students
  // mode is 0 for type-in answer, 1 is for multiple choice answer

  const navigation = useNavigation();
  //Initializing Navigation component

  const url = `https://storage.googleapis.com/475public/${selectedCourse}.json`;
  //URL which accesses my google bucket consisting of students in each class.
  //here is a example URL of what one of the files looks like: https://storage.googleapis.com/475public/CMSC312.json
  //This is the best way I could think to dynamically access a list of students

  //The schema which my app follows is: 
  /* 
    {
      "students":[
        {
          "name": "", 
          "href": ""
        }
      ]
    }
  */
 //Where the json is an object consisting of "students", with a value of an array
 //The array consists of objects with "name" and "href" referencing the first and last
 //name of students and the link to their image. VCU ID image ex.

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  //Function to shuffle the student array

  const showFeedback = (isCorrect) => {
    setFeedbackImage(isCorrect ? require('../assets/check.png') : require('../assets/mark.png'));
    setFeedbackVisible(true);
    fadeAnim.setValue(0);
  
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setFeedbackVisible(false);
    });
  };
  //chooses the photo that we require to use in feed back, and enables the animation for 1 second
  //it accomplishes this by setting the visibility to true and then running the animation,
  //which slowly fadest fades the photo out of vision.

  const sortAlphabetically = (array) => {
    array.sort((a, b) => {
      const aLastName = a.name.split(' ').pop();
      const bLastName = b.name.split(' ').pop();
      return aLastName.localeCompare(bLastName);
    });
  };
  //Function to alphabetically sort the student array

  const generateOptions = () => {
    const correctStudent = students[displayStudentIndex];
    const otherStudents = students.filter((student, index) => index !== displayStudentIndex);
    shuffleArray(otherStudents);

    const newOptions = [correctStudent, otherStudents[0], otherStudents[1]];
    shuffleArray(newOptions);
    setOptions(newOptions);
    setSelectedOption(newOptions[0]);
  };
  //generates options for the multiple choice randomly

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (style === 0) {
          shuffleArray(data.students);
        } else if (style === 1) {
          sortAlphabetically(data.students);
        }
        setStudents(data.students);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  //useEffect hook gathers the students data and decides to shuffle or sort alphabetically

  useEffect(() => {
    if (students.length > 0) {
      generateOptions();
    }
  }, [displayStudentIndex, students]);
  //generates options based on the displayStudentIndex in Students

  useEffect(() => {
    if (students.length > 0) {
      setScoreArray(new Array(students.length).fill(-1));
    }
  }, [students]);
  //creates the score array and initializes every value to -1
  //a correct score replaces the index at where the student was with 1
  //an incorrect score replaces the index with 0

  const renderMultipleChoice = () => (
    options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={styles.optionButton}
        onPress={() => setSelectedOption(option)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={[
              styles.optionCircle,
              selectedOption === option ? styles.optionCircleSelected : null,
            ]}
          />
          <Text style={styles.optionText}>{option.name}</Text>
        </View>
      </TouchableOpacity>
    ))
  );
  //renderMultipleChoice itereates over each generated option and lists them
  //vertically under the student, with only one being the right answer.
  //It sets the selected option on each time and the selected option is only
  //processed when submitted

  const renderTypeIn = () => (
    <TextInput
      style={styles.typeInInput}
      onChangeText={setTypedAnswer}
      value={typedAnswer}
      placeholder="Type student name"
      autoCapitalize="none"
    />
  );
  //renderTypeIn creates a typeInInput where you have to enter the name
  //when youre done typing to submit, typedAnswer is the value referenced

  const handlePress = () => {
    //handePress for submit button per each student

    let isCorrect = false;
    //initialize variable
  
    if (mode === 1 && selectedOption === students[displayStudentIndex]) {
      isCorrect = true;
    // if mode is multiple choice and selectedOption is correct,
    // change isCorrect to True
    } else if (
      mode === 0 &&
      typedAnswer.trim().toLowerCase() === students[displayStudentIndex].name.toLowerCase()
      //if mode is type in and the typedAnswer = the student disregarding casing,
      //is correct is true
    ) {
      isCorrect = true;
    }
  
    const updatedScoreArray = [...scoreArray];
    updatedScoreArray[displayStudentIndex] = isCorrect ? 1 : 0;
    //update score array based on whether or not isCorrect wnet
  
    const newIndex = (displayStudentIndex + 1) % students.length;
    setDisplayStudentIndex(newIndex);
    showFeedback(isCorrect);
    //updates the student index that gets displayed, as well as triggers the hook
    //to generate new options for the next student
    //updates showFeedback with the value of isCorrect, displaying the check mark
    //or the x
  
    if (newIndex === 0) {
      //if all students have been iterated through

      navigation.navigate('Score', {
        selectedCourse: selectedCourse,
        studentArray: students,
        scoreArray: updatedScoreArray, 
        //Navigates to the score sheet.
      });

    } else {

      setScoreArray(updatedScoreArray); 
      // Updates the scoreArray state if it's not the last question
    }
  };
  
  

  return (
    //Returning the user interface for the Quiz screen
    <View style={styles.container}>
      <Image source={require('../assets/vcu.png')} style={styles.vcuImage} />
      <Text style={styles.courseName}>{selectedCourse}</Text>
      {students.length > 0 && (
        <View style={styles.studentBox}>
          <Image source={{ uri: students[displayStudentIndex].href }} style={styles.studentImage} />
          {mode === 1 && renderMultipleChoice()}
          {mode === 0 && renderTypeIn()}
          <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          {feedbackVisible && (
            <Animated.View
              style={[
                styles.feedbackImageContainer,
                {
                  opacity: fadeAnim,
                },
              ]}
            >
              <Image source={feedbackImage} style={styles.feedbackImage} />
            </Animated.View>
          )}
        </View>
      )}
      <TouchableOpacity
        style = {styles.backButton}
        onPress = {() => navigation.navigate("Course", { selectedCourse: selectedCourse})}
      >
        <Text style = {styles.backButtonText}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
  
};

export default QuizScreen;

const styles = StyleSheet.create({
  //Styling the Quiz screen components
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
  studentBox: {
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
  typeInInput: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    width: 225,
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 50,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 225,
  },
  selectedOption: {
    backgroundColor: 'black',
  },
  unselectedOption: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
  },
  optionCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    marginRight: 10,
  },
  feedbackImageContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  feedbackImage: {
    width: 62,
    height: 62,
  },
  optionText: {
    color: 'black',
    fontSize: 14,
    textAlign: 'left',
  },
  submitButton: {
    backgroundColor: '#32CD32',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
    marginBottom: 20,
    width: width * 0.85 * (7/8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  optionCircleSelected: {
    backgroundColor: 'black',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 800,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'black',
    fontSize: 14,
  },
});
