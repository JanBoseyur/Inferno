
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value = {DefaultTheme}>
      
      <Stack screenOptions = {{
        headerStyle: { backgroundColor: 'black' },  
        headerTintColor: 'white',                   
        headerTitleAlign: 'center',
      }}>

        <Stack.Screen name = "(tabs)" options = {{ title: 'Inferno', headerTitleAlign: 'center' }}/>
        <Stack.Screen name = "+not-found" />
      </Stack>

      <StatusBar style = "dark" />
    </ThemeProvider>
  );
}
