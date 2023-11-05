import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

function Screen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/Image 95.png')} style={{ width: 243, height: 243, marginVertical: 10 }}></Image>
      <Text style={styles.textScreen1}>MANAGE YOUR <br />TASK</Text>
      <View style={styles.viewInput}>
        <Image source={require('./assets/Frame.png')} style={styles.imageInput}></Image>
        <TextInput style={styles.textInputSc1} placeholder='Enter your name'></TextInput>
      </View>
      <Pressable style={styles.btnScreen1}
        onPress={() => navigation.navigate('Screen2')}>
        <Text style={styles.textBtnSc1}> GET STARTED -></Text>
      </Pressable>
    </View>
  );
}



function Screen2({navigation, route}) {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch('https://6544b4795a0b4b04436ccc12.mockapi.io/lab7')
      .then((response) => response.json())
      .then((jobs) => setJobs(jobs))
      .catch((error) => console.error('error data: ', error));
  }, []);

  const [searchText, setSeacchText] = useState('');
  const filteredJobs = jobs.filter((job) => {
    return job;
  })

  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
        <Image source={require('./assets/Frame1.png')} style={styles.imageInput}></Image>
        <TextInput style={styles.textInputSc1} placeholder='Search'></TextInput>
      </View>

      <View>
        <ScrollView>
          {filteredJobs.map((listJob => (
            <View style={styles.viewList}>
              <Image source={require('./assets/checkbox.png')} style={{width: 24, height: 24}}></Image>
              <Text style={styles.textList}>{listJob.name}</Text>
              <Image source={require('./assets/edit.png')} style={{width: 24, height: 24, alignItems: 'flex-end'}}></Image>
            </View>
          )))}
        </ScrollView>
      </View>

      <View style={styles.btnAdd}>
        <Image source={require('./assets/Frame2.png')} style={{ width: 32, height: 32, }} resizeMode='contain'></Image>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Screen1">
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textScreen1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8353E2',
    textAlign: 'center',
  },
  viewInput: {
    width: 334,
    height: 43,
    // backgroundColor: 'black',
    borderWidth: 1,
    marginVertical: 20,
    borderRadius: 12,
    padding: 5,
    flexDirection: 'row',
    // justifyContent: 'flex-start',
  },
  imageInput: {
    width: 20,
    height: 20,
    margin: 5,
  },
  textInputSc1: {
    width: 123,
    height: 26,
    // backgroundColor: 'blue',
    padding: 5,
  },
  btnScreen1: {
    width: 190,
    height: 44,
    marginVertical: 20,
    backgroundColor: '#00BDD6',
    justifyContent: 'center',
    borderRadius: 12,
  },
  textBtnSc1: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    color: 'white'
  },
  viewInputSc2: {
    width: 334,
    height: 44,
    borderRadius: 4,
    borderWidth: 1,
  },
  btnAdd: {
    width: 69,
    height: 69,
    backgroundColor: '#00BDD6',
    borderRadius: 200 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewList: {
    width: 334,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DEE1E6',
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  textList: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
});
