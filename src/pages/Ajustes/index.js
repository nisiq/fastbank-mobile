import { View, Text, StyleSheet } from 'react-native';

export default function Ajustes() {
    return (
        <View style={StyleSheet.container}>
            <Text>Pagina Ajustes</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})