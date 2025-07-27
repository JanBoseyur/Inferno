
import { Image } from 'expo-image';
import React, { useEffect, useState, useCallback  } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { useRouter } from 'expo-router';

import { createClient } from '@supabase/supabase-js';

import { MaterialIcons } from '@expo/vector-icons';
import CountryFlag from "react-native-country-flag";

const supabaseUrl = 'https://skdjkigdmvyqozheuwqo.supabase.co';
const supabaseAnonKey = 'sb_publishable_0ftg6MAXovUlhLsz5OtKHA_wEyjrmgO';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const router = useRouter();

export default function App() {
  const [bandas, setBandas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from('bandas')
          .select('*')

        if (error) {
          console.error('Error al obtener datos:', error);
        } else {
        }
      };

      fetchData();
    }, [])
  );

  return (
    <View>
      
      <ScrollView contentContainerStyle = {styles.body}>
        {bandas.map((banda, index) => (
          
        <TouchableOpacity key = {banda.id} 
          style = {[styles.containerbanda, index !== bandas.length - 1 && { borderBottomWidth: 0 }]}
          onPress = {() => router.push(`/perfil/${banda.id}`)}>
        </TouchableOpacity>

        ))}
      </ScrollView>

    </View> 
  );
}

const styles = StyleSheet.create({
  
  body: {
  },

  containerbanda: {
    flexDirection: 'column',

    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',

    width: '100%',
    height: 200,

    borderTopWidth: 1,
    borderBottomWidth: 1,

    padding: 15
  },

});

