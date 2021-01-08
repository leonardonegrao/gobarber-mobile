import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  useFonts,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
} from '@expo-google-fonts/roboto-slab'

import AppProvider from './src/hooks'
import Routes from './src/routes'

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
  })

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fafafa' }}>Carregando...</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <AppProvider>
        <View style={{ backgroundColor: '#312e38', flex: 1 }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  )
}

// const styles = StyleSheet.create({
//   app: {
//     fontFamily:
//   }
// });

export default App
