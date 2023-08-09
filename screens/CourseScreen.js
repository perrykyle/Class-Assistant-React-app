import React, { useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importing necessary components from React Native

const { width, height } = Dimensions.get('window');
//Components for styling width and height

const styleMode = {
  'Shuffle': 0,
  'Multiple Choice': 1,
  'Type-in': 0,
  'Alphabetical': 1
};
//Dictionary for exports to be used in the next screen

const CourseScreen = ({ route }) => {
  const { selectedCourse } = route.params;
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  //Initializing the state variables that will determine the patterns in the quiz 

  const navigation = useNavigation();
  //Initializing Navigation component

  const handleBack = () =>{
    navigation.navigate('Dropdown');
  }
  //Back button onPress function

  const handleSubmit = () => {
    navigation.navigate('Quiz', 
    { selectedCourse: selectedCourse,
      style: styleMode[selectedStyle],
      mode: styleMode[selectedMode],
    })};
  //Submit onPress function

  const selectStyle = (style) => {
    setSelectedStyle(style);
  };
  //for Selecting Style

  const selectMode = (mode) => {
    setSelectedMode(mode);
  };
  //for Selecting Mode

  return (
    //Returning the user interface for the Course selection screen
    <View style={styles.container}>
      <Image source={require('../assets/vcu.png')} style={styles.vcuImage} />
      <View style={styles.content}>
        <Text style={styles.courseName}>{selectedCourse}</Text>
        <View style={styles.box}>
            <Text style={styles.title}>Style</Text>
            <View style={styles.buttonRow}>
            <TouchableOpacity
                style={[
                styles.button,
                selectedStyle === 'Shuffle' ? styles.buttonSelected : null,
                ]}
                onPress={() => selectStyle('Shuffle')}
            >
                <Text style={styles.buttonText}>Shuffle</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                styles.button,
                selectedStyle === 'Alphabetical' ? styles.buttonSelected : null,
                ]}
                onPress={() => selectStyle('Alphabetical')}
            >
                <Text style={styles.buttonText}>Alphabetical</Text>
            </TouchableOpacity>
            </View>
            <Text style={styles.title}>Mode</Text>
            <View style={styles.buttonRow}>
            <TouchableOpacity
                style={[
                styles.button,
                selectedMode === 'Type-in' ? styles.buttonSelected : null,
                ]}
                onPress={() => selectMode('Type-in')}
            >
                <Text style={styles.buttonText}>Type-in</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                styles.button,
                selectedMode === 'Multiple Choice' ? styles.buttonSelected : null,
                ]}
                onPress={() => selectMode('Multiple Choice')}
            >
                <Text style={styles.buttonText}>Multiple Choice</Text>
            </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        {(selectedStyle !== '' && selectedMode !== '') && (
          <TouchableOpacity
            style={styles.goButton}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Go</Text>
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  //Styling the Course screen components
  container: {
    flex: 1,
    backgroundColor: '#3D3D3D',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vcuImage: {
    position: 'absolute',
    top: 100,
    width: 180,
    height: 100,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseName: {
    color: 'white',
    fontSize: 26,
    position: 'absolute',
    top: 225,
  },
  box: {
    backgroundColor: '#D6D6D6',
    width: width * 0.85,
    height: height * 0.25,
    borderRadius: 5,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:35,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    width: width * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: '#32CD32',
  },
  buttonText: {
    fontSize: 16,
  },
  goButton: {
    backgroundColor: '#32CD32',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: width * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: width * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CourseScreen;
