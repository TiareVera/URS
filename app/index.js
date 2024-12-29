import { StyleSheet } from "react-native";
import { Main } from "../components/main";
import { useFonts } from 'expo-font';

export default function Index() {
  const [fontsLoaded] = useFonts({
    'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
  });


  return (<Main></Main>);
}
