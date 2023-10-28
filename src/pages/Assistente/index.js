import { View, Text, StyleSheet } from 'react-native';

export default function Assistente() {
    return (
        <View style={StyleSheet.container}>
            <Text>Pagina Money</Text>
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