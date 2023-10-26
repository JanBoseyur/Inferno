
import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import { db } from './firebaseConfig';
import { Button } from '@rneui/themed';

const NovedadesScreen = () => {
  const [artistas, setArtistas] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); 

  const toggleInfo = async () => {

    try {

      const artistasCollectionRef = collection(db, 'albumes');
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

  return (
    <View style = {styles.container}>
      <View style = {styles.buttons}>

        <Button
          title = "Albumes"
          onPress = {toggleInfo}
          iconContainerStyle = {styles.iconContainerStyle}
          titleStyle = {styles.titleStyle}
          buttonStyle = {styles.buttonStyle}
          containerStyle = {styles.containerStyle}
        />
      
      </View>

      <View>
        <Text style = {styles.titulo}>Albumes</Text>
      </View>

      <View style = {styles.content}>

        <View style = {styles.content2}>
          {toggleInfo && (
            
            <FlatList
              data = {artistas}
              horizontal = {true} 
              keyExtractor ={(item) => item.id}
              renderItem = {({ item }) => (
                
                <View style = {styles.content3}>
                  <Image source ={{ uri: item.foto }} style = {styles.imageStyle} />
                  <Text style = {styles.infoText}>{item.nombre}</Text>
                </View>
              )}
            />
          )}
        </View>
        
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

    container: {
      marginTop: 50,
    },

    buttons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    titulo: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
    },

    content: {
      flex: 1,
      backgroundColor: 'red',
      marginTop: 20,
      flexDirection: 'column'
    },

    content2: {
    }, 
    
    content3: {
      margin: 10
    },

    infoText: {
      fontSize: 6,
      fontWeight: 'normal',
      marginTop: 5,
      alignContent: 'center',
      alignSelf: 'center'
    },

    imageStyle: {
      width: 150,
      height: 150,
    },

    titleStyle: {
      fontWeight: '500',
    },

    buttonStyle: {
      backgroundColor: '#5b5e62',
      borderColor: 'transparent',
      borderWidth: 0,
      borderRadius: 30,
    },

    containerStyle: {
      width: 90,
    },

  });

export default NovedadesScreen;
