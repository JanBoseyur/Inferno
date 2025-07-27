
import { Image } from 'expo-image';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function HomeScreen() {
  return (
    <KeyboardAvoidingView
      style = {{ flex: 1, backgroundColor: 'white' }}
      behavior = {Platform.OS === 'ios' ? 'padding' : 'position'}
      keyboardVerticalOffset = {Platform.OS === 'ios' ? 80 : 0}
    >
      <ScrollView contentContainerStyle = {{ flexGrow: 1 }} keyboardShouldPersistTaps = "handled">

        <View style = {styles.banner}>
    
          <View style = {styles.containerLogo}>
            
            <Image
              source = {require('@/assets/images/roger_login.png')}
              style = {styles.fondoLogo}
            />

          </View>

          <View style = {styles.containerTitulo}>
            <Text style = {styles.titulo}>Bolinha{'\n'}Backhand</Text>
          </View>
          
        </View>

        <View style = {styles.formContainer}>
          
          <Text style = {styles.formTitle}>Iniciar Sesión</Text>

          <Text style = {styles.label}>Correo electrónico</Text>
          
          <TextInput
            style = {styles.input}
            placeholder = "johnpork@gmail.com"
            placeholderTextColor = "#888"
            keyboardType = "email-address"
          />

          <Text style = {styles.label}>Contraseña</Text>
          
          <TextInput
            style = {styles.input}
            placeholder = "pork1010"
            placeholderTextColor = "#888"
            secureTextEntry
          />

          <TouchableOpacity style = {styles.boton}>
            <Text style = {styles.botonTexto}>Ingresar</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.ContainerRegistroTexto}>
            <Text style = {styles.registroTexto}>¿No tienes cuenta? Regístrate aquí</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },

  containerLogo: {
    width: '50%',
  },

  fondoLogo: {
    width: '100%',
    height: 240,
  },

  containerTitulo: {
    alignSelf: 'flex-end',
    
    width: '50%',
  },

  titulo: {
    fontWeight: 'bold',
    
    fontSize: 28,
  },

  formContainer: {
    backgroundColor: 'white',

    marginTop: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },

  formTitle: {
    fontWeight: 'bold',
    textAlign: 'center',

    fontSize: 22,
    marginBottom: 20,
  },

  label: {
    color: '#333',

    fontSize: 14,
    marginBottom: 5,
  },

  input: {
    borderBottomColor: 'black',
    color: 'black',

    borderBottomWidth: 1.5,
    height: 40,
    fontSize: 16,
    marginBottom: 20,
  },

  boton: {
    backgroundColor: '#333',

    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 20,
  },

  botonTexto: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',

    fontSize: 16,
  },

  ContainerRegistroTexto: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',

    width: '75%',
    height: 40,
    marginTop: 10,
  },

  registroTexto: {
    fontWeight: 'bold',
  },
});
