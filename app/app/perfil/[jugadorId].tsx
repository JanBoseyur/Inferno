
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';

import CountryFlag from 'react-native-country-flag';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uxfgnnhbqutkuiedbrjx.supabase.co';
const supabaseAnonKey = 'sb_publishable_3jNniYefGMbf_lvEqf4Zgw_wK_uRBT_';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PerfilJugador() {
  const navigation = useNavigation();
  const route = useRoute();
  const { jugadorId } = route.params || {};

  const [jugador, setJugador] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    
    navigation.setOptions({
      title: 'Perfil',
      headerStyle: { backgroundColor: 'black' },
      headerTintColor: '#fff',
      headerTitleAlign: 'center',
    });

  }, [navigation]);

  useEffect(() => {
    const fetchJugador = async () => {
      if (!jugadorId) return;

      const { data, error } = await supabase
        .from('jugadores')
        .select('*', '') /// Consultas
        .eq('id', jugadorId)
        .single();

      if (!error) setJugador(data);
      setLoading(false);
    };

    fetchJugador();
  }, [jugadorId]);

  if (loading) return <ActivityIndicator size = "large" style = {{ marginTop: 50 }} />;
  if (!jugador) return <Text style = {{ marginTop: 50 }}>Jugador no encontrado</Text>;

  return (
    <View style = {styles.body}>

      <ScrollView>

        <Image source = {{ uri: jugador.foto2 }} style = {styles.fotoLogo}/>
        
        <View style = {{ alignItems: 'center', alignSelf: 'center', marginVertical: 20, borderBottomWidth: 1, width: '60%'}}>
          <Text style = {{ fontSize: 20, fontWeight: 'bold', marginBottom: 3 }}>{jugador.nombre}</Text>
        </View>

        <View style = {{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>    
          
          <TouchableOpacity style = {{ alignItems: 'center', alignSelf: 'center', justifyContent: 'center', height: 30, borderWidth: 2, flex: 1}}>
            <Text style = {{ fontWeight: 'bold' }}>Información</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {{ alignItems: 'center', alignSelf: 'center', justifyContent: 'center', height: 30, borderWidth: 2, flex: 1}}>
            <Text style = {{ fontWeight: 'bold' }}>Información</Text>
          </TouchableOpacity>
          
        </View>

        <View style = {{ flexDirection: 'column', padding: 20}}>    
          
          <View style = {{ flexDirection: 'row', borderWidth: 2, marginBottom: 10 }}>
            <Text style = {{ fontWeight: 'bold' }}>Edad: </Text>
            <Text style = {{}}>{ 2025 - (jugador.edad) }</Text>
          </View>

          <View style = {{ flexDirection: 'row', borderWidth: 2, marginBottom: 10 }}>
            <Text style = {{ fontWeight: 'bold' }}>Edad: </Text>
            <Text style = {{}}>{ 2025 - (jugador.edad) }</Text>
          </View>

        </View>

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  body: {
  },

  fotoLogo: {
    width: '100%',
    height: 300
  },

  boton: {
    backgroundColor: '#333',
    alignItems: 'center',
    alignSelf: 'center',

    width: '28%',
    
    paddingVertical: 12,
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 20,
  },

  botonTexto: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',

    fontSize: 16,
  },
});