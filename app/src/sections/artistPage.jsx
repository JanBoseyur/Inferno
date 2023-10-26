
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, Pressable, Modal, Button } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { SearchBar } from 'react-native-elements';
import { db } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from 'react-native-progress/Bar';
import * as Animatable from 'react-native-animatable';

const SearchScreen = () => {
  const [artistas, setArtistas] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArtista, setSelectedArtista] = useState(null);

  const navigation = useNavigation();
  
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

  const closeArtistaDetails = () => {
    setModalVisible(false);
    setSelectedArtista(null);
  };


  return (
    <View style = {styles.container}>

      <SearchBar
        platform = "android"
        style = {styles.search}
        value = {searchQuery}
        placeholder = "Megadeth, Dio, Xentrix..."
        onChangeText = {(text) => setSearchQuery(text)}
      />

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

            <Modal visible = {modalVisible} transparent = {true} animationType = "fade" style = {{ borderRadius: 10, }}>
              <View style = {styles.modalArtist}>

                <ImageBackground source = {{ uri: selectedArtista ? selectedArtista.foto2 : '' }} resizeMode = "cover" style = {styles.imageArtistDetail}>
                  <Text style = {styles.artistaDetailsTitle}>{selectedArtista ? selectedArtista.nombre : ''}</Text>
                  <Text style = {styles.artistaDetailsRank}>{selectedArtista ? selectedArtista.rank : ''}</Text>
                  
                  <Animatable.View animation = "bounceInLeft" duration = {2000} iterationCount = {1}>
                    <ProgressBar progress = {selectedArtista ? selectedArtista.rank / 100 : 0} width = {200} height = {10} color = "white" style = {{ alignSelf: 'center', marginBottom: '5%' }}/>
                  </Animatable.View>
            
                  <Button title = "Cerrar" onPress = {closeArtistaDetails} color = "#424447" style = {{}}/>
                
                </ImageBackground>

              </View>
            </Modal>
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
    backgroundColor: '#676a6e'
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

  buttonSalir: {
    color: "#424447"
  },

  modalArtist: {
    flex: 1,
  },

  imageArtistDetail: {
    backgroundColor: 'black',
    padding: 16,
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