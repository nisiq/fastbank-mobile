import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import Assistente from './pages/Assistente';
import Ajustes from './pages/Ajustes';
import Welcome from './pages/Welcome';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Transferencia from './pages/Transferencia'

import CustomTabBar from './components/CustomTabBar';
import Cartao from './pages/Cartao';
import Emprestimo from './pages/Emprestimo';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTab = () => (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#d2d',
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: '#fff',
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
        <Tab.Screen
        name="Home"
        component={Home}
        options={{
            tabBarIcon: "compare-arrows"
        }}
        />
      <Tab.Screen
        name="Assistente"
        component={Assistente}
        options={{
          tabBarIcon: 'message',
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={Ajustes}
        options={{
          tabBarIcon: 'settings',
        }}
      />
    </Tab.Navigator>
  );

  //      onPress={() => navigation.navigate(screenName)}


const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Cadastro" component={Cadastro} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Transferencia" component={Transferencia} />
    <Stack.Screen name="Cartao" component={Cartao} />
    <Stack.Screen name="Emprestimo" component={Emprestimo} />

  </Stack.Navigator>
);

export function Routes() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode="none">
      
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainTab} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
