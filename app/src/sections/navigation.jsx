
import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from './inicio';
import SearchScreen from './buscador';
import NewsScreen from './novedades';
import RankScreen from './rank';

const Tab = createMaterialBottomTabNavigator();

const Navigation = () => {

  return (

    <Tab.Navigator
      initialRouteName = "Inicio"
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
          borderTopWidth: 0,
        }}
      />

      <Tab.Screen
        name = "Buscador"
        component = {SearchScreen}
        options = {{
          tabBarLabel: 'Buscar',
          tabBarIcon: 'magnify',
          borderTopWidth: 0,
        }}
      />
      
      <Tab.Screen
        name = "Novedades"
        component = {NewsScreen}
        options={{
          tabBarLabel: 'Novedades',
          tabBarIcon: 'bullhorn',
          borderTopWidth: 0,
        }}
      />

      <Tab.Screen
        name = "Ranking"
        component = {RankScreen}
        options = {{
          tabBarLabel: 'Ranking',
          tabBarIcon: 'account-group',
          borderTopWidth: 0,
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;