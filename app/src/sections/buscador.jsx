
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Pressable, Modal, Button } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { SearchBar } from 'react-native-elements';
import { db } from './firebaseConfig';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const SearchScreen = () => {
  const [artistas, setArtistas] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  
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
    setSelectedArtista(artista);
    setModalVisible(true);
  };

  return (
  
    <View style = {styles.container}>

      <View style = {styles.barraSearch}>
        <SearchBar
          platform = "android"
          containerStyle = {styles.searchContainer} 
          inputContainerStyle = {styles.inputContainer} 
          inputStyle = {styles.input}
          value = {searchQuery}
          placeholder = "Megadeth, Dio, Xentrix..."
          onChangeText = {(text) => setSearchQuery(text)}
        />
      </View>

      <FlatList
        data = {artistas}
        keyExtractor = {(item) => item.id}
        renderItem = {({ item }) => (

          <Pressable onPress = {() => openArtistaDetails(item)}>

            <ImageBackground source = {{ uri: item.foto1 }} resizeMode = "cover" style = {styles.image}>
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
    backgroundColor: '#595c61'
  },

  title: {
    margin: '4%',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  barraSearch: {
    margin: '2%',
    borderRadius: 20
  },

  searchContainer: {
    borderRadius: 30, 
    backgroundColor: 'lightgray', 
    padding: 5, 
    margin: 10, 
  },

  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 40, 
  },

  input: {
    
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

  buttonSalir: {
    color: "#424447"
  },

  modalArtist: {
    marginTop: '15%',
    marginRight: '10%',
    marginLeft: '10%',
  },

  imageArtistDetail: {
    backgroundColor: 'black',
    padding: 16,
  },

  iconMusic: {
    backgroundColor: 'black',
    padding: 40,
  },

  artistaDetailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: '20%'  
  },

  artistaDetailsTitle2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  artistaDetailsRank: {
    fontSize: 90,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: '5%',  
  },

  artistaDetailsDescription: {
    fontSize: 16,
    borderRadius: 10
  },

  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

});

export default SearchScreen;