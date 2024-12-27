import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import logo from './assets/logo.jpeg'
export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ with: 100, height: 100 }}></Image>
      <Text>mawat</Text>
      <TextInput
        placeholder="Nombre"
        placeholderTextColor={'black'}
        required
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
