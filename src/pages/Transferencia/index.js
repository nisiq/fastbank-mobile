import { View, Text, StyleSheet } from 'react-native';

export default function Transferencia() {
    return (
        <View style={StyleSheet.container}>
            <Text>Pagina Transferencia</Text>
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