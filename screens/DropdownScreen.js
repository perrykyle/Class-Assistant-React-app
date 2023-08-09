import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Menu, IconButton, Provider } from 'react-native-paper';
// Importing necessary components from React Native and React-Native-Paper
// React native paper is a nice library I found for the drop down menu

const DropdownScreen = ({ navigation }) => {
  //Defining a functional component for the Drop Down screen

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [visible, setVisible] = useState(false);
  //Initializing the state variables that will determine the visibility state of the menu
  //as well as the course that will be referenced and read

  const courses = ['CMSC475', 'CMSC508', 'CMSC312'];
  //array of courses that exist for the professor

  // *** in a real life implementation, once you sign in with your eid and password,
  //     i would write a js backend function which would contact the canvas API to
  //     retrieve a list of classes and students, where I would format and upload the
  //     students list into the google bucket I am currently using under a json file,
  //     and I would grab the class names and add them to this array. Long term thinking
  //     but definitely possible.

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  // Menu Visibillity settings

  return (
    //Returning the user interface for the Login screen
    <Provider>
      <View style={styles.container}>
        <Image source={require('../assets/vcu.png')} style={styles.vcuImage} />
        <Text style={styles.courseText}>Select a course:</Text>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity style={styles.dropdown} onPress={openMenu}>
              <Text style={styles.dropdownText}>
                {selectedCourse || 'Select course...'}
              </Text>
              <IconButton icon="menu-down" size={20} onPress={openMenu} />
            </TouchableOpacity>
          }
        >
          {courses.map((course, index) => (
            <View style={styles.menuItemContainer} key={index}>
              <Menu.Item
                onPress={() => {
                  setSelectedCourse(course);
                  closeMenu();
                }}
                title={course}
              />
            </View>
          ))}
        </Menu>
        {selectedCourse && (
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => navigation.navigate('Course', { selectedCourse })}
          >
            <Text style={styles.selectButtonText}>Select course</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  //Styling the Drop down screen components
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
  courseText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 0,
    width: 200,
    height: 40,
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 5,
  },
  dropdownText: {
    fontSize: 16,
  },
  menuItemContainer: {
    width: 200,
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectButton: {
    backgroundColor: '#32CD32',
    borderRadius: 5,
    padding: 10,
    marginTop: 25,
    width: 200,
    alignItems: 'center',
  },
  selectButtonText: {
    color: 'white',
    fontSize: 14,
  },
  backButtonText: {
    color: 'black',
    fontSize: 14,
  }
});

export default DropdownScreen;
