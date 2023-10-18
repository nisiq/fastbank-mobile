import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header'
import Extrato from '../../components/Extrato';

export default function Home() {
  return (
    <View style={styles.container}>
        <Header name="Nicole Siqueira"/>

        <Extrato/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
