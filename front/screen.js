import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import icons from @expo/vector-icons
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Codehomepage from './components/Codehomepage';
import AdminHomePage from './components/AdminHomePage';
import UserHomePage from './components/UserHomePage';
import MainScreen from './components/MainScreen';
import Search from './components/Search';
import Profile from './components/Profile';

import HTML from './development/Html'; // Capitalized the component name
import CSS from './development/Css';
import JavaScript from './development/JavaScript';
import ReactComponent from './development/ReactComponent'; // Renamed to avoid confusion
import ReactNative from './development/ReactNative';

import Cprogram from'./programming/Cprogram';
import Cpp from './programming/Cpp';
import Java from './programming/Java';
import Python from './programming/Python';
import Csharp from './programming/Csharp';

import Sqldatabase from './database/Sqldatabase';
import Mysqldatabase from './database/Mysqldatabase';
import Mongodb from './database/Mongodb';
import Access from './database/Access';
import Oracle from'./database/Oracle';

import HtmlQuizPage from './developmentquiz/HtmlQuizPage';
import CSSQuizPage from './developmentquiz/CSSQuizPage';
import ReactQuizPage from './developmentquiz/ReactQuizPage';
import JavaScriptQuizPage from './developmentquiz/JavaScriptQuizPage';
import ReactNativeQuizPage from './developmentquiz/ReactNativeQuizPage';

import PythonQuizPage from './programmingquiz/PythonQuizPage';
import CppQuizPage from './programmingquiz/CppQuizPage';
import CprogramQuizPage from './programmingquiz/CprogramQuizPage';
import CsharpQuizPage from './programmingquiz/CsharpQuizPage';
import JavaQuizPage from './programmingquiz/JavaQuizPage';

import AccessQuizPage from './databasequiz/AccessQuizPage';
import MongodbQuizPage from './databasequiz/MongodbQuizPage';
import MysqlQuizPage from './databasequiz/MysqlQuizPage';
import SqlQuizPage from './databasequiz/SqlQuizPage';
import OracleQuizPage from './databasequiz/OracleQuizPage'; // Fixed name

import HtmlCertificatePage from './certificate/HtmlCertificatePage';
import CssCertificatePage from './certificate/CssCertificatePage';
import JavaScriptCertificatePage from './certificate/JavaScriptCertificatePage';
import ReactCertificatePage from './certificate/ReactCertificatePage';
import ReactNativeCertificatePage from './certificate/ReactNativeCertificatePage';

import CCertificatePage from './certificate/CCertificatePage';
import CppCertificatePage from './certificate/CppCertificatePage';
import JavaCertificatePage from './certificate/JavaCertificatePage';
import PythonCertificatePage from './certificate/PythonCertificatePage';
import CsharpCertificatePage from './certificate/CsharpCertificatePage';

import AccessCertificatePage from './certificate/AccessCertificatePage';
import SqlCertificatePage from './certificate/SqlCertificatePage';
import MysqlCertificatePage from './certificate/MysqlCertificatePage';
import MongodbCertificatePage from './certificate/MongodbCertificatePage';
import OracleCertificatePage from './certificate/OracleCertificatePage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator Component with Icons
const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#9c6bff', // Updated active tab color to violet
        tabBarInactiveTintColor: 'gray', // Keeping the inactive color gray
        tabBarStyle: { backgroundColor: '#a2c1f5' },
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeTab" component={UserHomePage} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

// Stack Navigator Component
const Screen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen
          name="Admin"
          component={LoginPage}
          initialParams={{ type: 'Admin' }}
          options={{ title: 'Admin Login' }}
        />
        <Stack.Screen
          name="User"
          component={LoginPage}
          initialParams={{ type: 'User' }}
          options={{ title: 'Student Login' }}
        />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="codehome" component={Codehomepage} options={{ headerShown: false }} />
        <Stack.Screen name="AdminHomePage" component={AdminHomePage} options={{ headerShown: false }} />
        <Stack.Screen name="UserHomePage" component={TabScreen} options={{ headerShown: false }} />

        {/* Development Pages */}
        <Stack.Screen name="HTML" component={HTML} />
        <Stack.Screen name="CSS" component={CSS} />
        <Stack.Screen name="JavaScript" component={JavaScript} />
        <Stack.Screen name="React" component={ReactComponent} />
        <Stack.Screen name="ReactNative" component={ReactNative} />

        {/* Programming Pages */}
        <Stack.Screen name="Cprogram" component={Cprogram} />
        <Stack.Screen name="Cpp" component={Cpp} />
        <Stack.Screen name="Java" component={Java} />
        <Stack.Screen name="Python" component={Python} />
        <Stack.Screen name="Csharp" component={Csharp} />

        {/* Database Pages */}
        <Stack.Screen name="Sqldatabase" component={Sqldatabase} />
        <Stack.Screen name="Mysqldatabase" component={Mysqldatabase} />
        <Stack.Screen name="Mongodb" component={Mongodb} />
        <Stack.Screen name="Access" component={Access} />
        <Stack.Screen name="Oracle" component={Oracle} />

        {/* Quiz Pages */}
        <Stack.Screen name="htmlQuizPage" component={HtmlQuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="CSSQuizPage" component={CSSQuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="ReactQuizPage" component={ReactQuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="JavaScriptQuizPage" component={JavaScriptQuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="ReactNativeQuizPage" component={ReactNativeQuizPage} options={{ headerShown: false }} />

        <Stack.Screen name="PythonQuizPage" component={PythonQuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="CppQuizPage" component={CppQuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="CprogramQuizPage" component={CprogramQuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="CsharpQuizPage" component={CsharpQuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="JavaQuizPage" component={JavaQuizPage} options={{ headerShown: false }} />

        <Stack.Screen name="AccessQuizPage" component={AccessQuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="MongodbQuizPage" component={MongodbQuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="MysqlQuizPage" component={MysqlQuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="SqlQuizPage" component={SqlQuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="OracleQuizPage" component={OracleQuizPage} options={{ headerShown: false }} />

        {/* Certificate Pages */}
        <Stack.Screen name="HtmlCertificatePage" component={HtmlCertificatePage} />
        <Stack.Screen name="CssCertificatePage" component={CssCertificatePage} />
        <Stack.Screen name="JavaScriptCertificatePage" component={JavaScriptCertificatePage} />
        <Stack.Screen name="ReactCertificatePage" component={ReactCertificatePage} />
        <Stack.Screen name="ReactNativeCertificatePage" component={ReactNativeCertificatePage} />

        <Stack.Screen name="CCertificatePage" component={CCertificatePage} />
        <Stack.Screen name="CppCertificatePage" component={CppCertificatePage} />
        <Stack.Screen name="JavaCertificatePage" component={JavaCertificatePage} />
        <Stack.Screen name="PythonCertificatePage" component={PythonCertificatePage} />
        <Stack.Screen name="CsharpCertificatePage" component={CsharpCertificatePage} />

        <Stack.Screen name="AccessCertificatePage" component={AccessCertificatePage} />
        <Stack.Screen name="SqlCertificatePage" component={SqlCertificatePage} />
        <Stack.Screen name="MysqlCertificatePage" component={MysqlCertificatePage} />
        <Stack.Screen name="MongodbCertificatePage" component={MongodbCertificatePage} />
        <Stack.Screen name="OracleCertificatePage" component={OracleCertificatePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Screen;
