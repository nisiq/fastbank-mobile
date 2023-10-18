import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function Extrato() {
    return (
        <View style={styles.container}>

            <View style={styles.item}>
                <Text style={styles.itemTitle}>R$ 5.000,32</Text>
            </View>

            

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        borderRadius: 10/2,
        width: 210,
        justifyContent: 'center',
        left: 80

        
    },
    itemTitle:{
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        color: '#000',

    }
})