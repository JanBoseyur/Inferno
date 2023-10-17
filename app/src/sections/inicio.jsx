
import { View, Text, FlatList, StyleSheet, TextInput, ImageBackground, ScrollView } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import React, { useState, useEffect } from 'react';

const SearchScreen = () => {

    const [artista, setArtista] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const fetchArtistaData = async () => {

        try {
          const artistaCollectionRef = collection(db, 'artistas');
          const artistaQuery = query(
            artistaCollectionRef,
            where('nombre', '>=', searchQuery),
            where('nombre', '<=', searchQuery + '\uf8ff'),
          );
  
          const querySnapshot = await getDocs(artistaQuery);
  
          const artistaData = [];
  
          querySnapshot.forEach((doc) => {
            const data = {
              id: doc.id,
              ...doc.data(),
            };
            artistaData.push(data);
          });
  
          setArtista(artistaData);
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
  
      fetchArtistaData();
    }, [searchQuery]);
  
    const openArtistaDetails = (resource) => {
      setSelectedArtista(resource);
    };
  
    const closeArtistaDetails = () => {
      setSelectedArtista(null);
    };

    return (

      <View style = {styles.container}>
        <ScrollView>

          <FlatList data = {artista} keyExtractor = {(item) => item.id} renderItem = {({ item }) => (
              <ImageBackground source = {item.foto1} resizeMode = "cover" style = {styles.image}>
                  <View style = {styles.cuadro}>

                      <View style = {{ flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                          <Text style = {styles.textoNombre}>{item.nombre}</Text>
                      </View>

                  </View>
              </ImageBackground>
          )}/>

        </ScrollView>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      textAlign: 'center',
    },
  
    search: {
      margin: '10%',
    },
  
    cuadro: {
      flex: 1,
      padding: '20%',
      width: '100%',
      flexDirection: 'row',
      textAlign: 'center',
    },
  
    titulo: {
      flex: 1,
      fontWeight: 'bold'
    },
  
    image: {
      opacity: 0.9,
    },
  
    textoNombre: {
      fontSize: 24, 
      fontWeight: 'bold',
      color: 'white',
    }
  });

export default SearchScreen;
