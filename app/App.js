
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from './src/sections/inicio';
import SearchScreen from './src/sections/buscador';
import NewsScreen from './src/sections/novedades';
import RankScreen from './src/sections/rank';

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
              borderTopWidth: 0
            }}
          />

          <Tab.Screen
            name = "Buscador"
            component = {SearchScreen}
            options = {{
              tabBarLabel: 'Buscar',
              tabBarIcon: 'magnify',
              borderTopWidth: 0
            }}
          />

          <Tab.Screen
            name = "Novedades"
            component = {NewsScreen}
            options = {{
              tabBarLabel: 'Novedades',
              tabBarIcon: 'bullhorn',
              borderTopWidth: 0
            }}
          />

          <Tab.Screen
            name = "Ranking"
            component = {RankScreen}
            options = {{
              tabBarLabel: 'Ranking',
              tabBarIcon: 'account-group',
              borderTopWidth: 0
            }}
          />

        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  )
}
