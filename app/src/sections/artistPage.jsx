
import React from 'react';
import { View, Text } from 'react-native';

const ArtistPage = ({ route }) => {
  const { artista } = route.params;

  return (
    <View>
      <Text>Nombre: {artista.nombre}</Text>
      <Text>Formación: {artista.formacion}</Text>
      {/* Otros detalles del artista */}
    </View>
  );
};

export default ArtistPage;