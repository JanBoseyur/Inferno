
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';

function HomeScreen() {
  return (
    <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>

        <Tab.Navigator
          initialRouteName = "Home"
          activeColor = "#8f929c"
          inactiveColor = "white"
          barStyle = {{ backgroundColor: '#424447' }}
        >

          <Tab.Screen
            name = "Inicio"
            component = {HomeScreen}
            options = {{
              tabBarLabel: 'Inicio',
              tabBarIcon: 'home',
            }}
          />

          <Tab.Screen
            name = "Buscador"
            component = {ProfileScreen}
            options = {{
              tabBarLabel: 'Buscar',
              tabBarIcon: 'account-music',
            }}
          />

          <Tab.Screen
            name = "Novedades"
            component = {SettingsScreen}
            options = {{
              tabBarLabel: 'Novedades',
              tabBarIcon: 'bullhorn',
            }}
          />

        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
