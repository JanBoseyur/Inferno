
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { SearchBar } from 'react-native-elements';
import { db } from './firebaseConfig';

const HomeScreen = () => {
  const [artistas, setArtistas] = useState([]); // Para almacenar los datos de Firestore
  const [searchQuery, setSearchQuery] = useState(''); // Para el valor de búsqueda
  const [selectedArtista, setSelectedArtista] = useState(null);

  useEffect(() => {
    const fetchArtistasData = async () => {
      try {
        const artistasCollectionRef = collection(db, 'artistas');
        const artistasQuery = query(
          artistasCollectionRef,
          where('nombre', '>=', searchQuery),
          where('nombre', '<=', searchQuery + '\uf8ff'),
        );

        const querySnapshot = await getDocs(artistasQuery);

        const artistasData = [];

        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
          };
          artistasData.push(data);
        });

        setArtistas(artistasData);

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchArtistasData();
  }, [searchQuery]);

  const openArtistaDetails = (artista) => {
    console.log('Detalles del artista seleccionado:', artista);
    setSelectedArtista(artista);
  };


  return (
    <View style = {styles.container}>

      <SearchBar
        platform = "android"
        style = {styles.search}
        value = {searchQuery}
        placeholder = "Buscar salas..."
        onChangeText = {(text) => setSearchQuery(text)}
      />

      <FlatList
        data = {artistas}
        keyExtractor = {(item) => item.id}
        renderItem = {({ item }) => (

          <Pressable onPress = {() => openArtistaDetails(item)}>

            <ImageBackground source = {{ uri: item.foto1 }} resizeMode="cover" style={styles.image}>
              <View style = {styles.cuadro}>
                
                <View style = {{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <Text style = {styles.textoNombre}>{item.nombre}</Text>
                </View>

              </View>
            </ImageBackground>

          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    textAlign: 'center',
  },

  title: {
    margin: '4%',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  search: {
    margin: '1%',
  },

  cuadro: {
    flex: 1,
    padding: '20%',
    width: '100%',
    flexDirection: 'row',
    textAlign: 'center',
  },

  image: {
    opacity: 0.9,
  },

  textoNombre: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

  artistaDetails: {
    backgroundColor: 'white',
    padding: 16,
  },

  artistaDetailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  artistaDetailsDescription: {
    fontSize: 16,
    marginBottom: 16,
  },

  closeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'center',
  },

  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});

export default HomeScreen;