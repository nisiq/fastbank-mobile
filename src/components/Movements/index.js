import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Movements({ data }) {
    const [showValue, setShowValue] = useState(false)

    return (
        <TouchableOpacity style={styles.container} onPress={ () => setShowValue(!showValue)}>
            <Text style={styles.date}>{data.date}</Text>

            <View style={styles.content}>
                <Text style={styles.label}>{data.label}</Text>

                { showValue ? (
                        /* Verificao se e uma despesa ou receita, exibir cor vermelha ou verde*/
                    <Text style={data.type === 1 ? styles.value : styles.espenses}
                    >  
                    {/* Verificao entrada ou saida (-) */}
                        {data.type === 1 ? `R$ ${data.value}` : `R$ -${data.value}`}
                    </Text>
                    ) : (
                    <View style={styles.skeleton}>
                        </View>
                    )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginBottom: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: '#000'
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8,
    },
    date: {
        color: '#000',
        fontWeight: 'bold',
    },
    label:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    value: {
        fontSize: 16,
        color: '#2ecc71',
        fontWeight: 'bold'
    },
    espenses: {
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: 'bold'
    },
    skeleton:{
        marginTop: 6,
        width: 80,
        height: 10,
        backgroundColor: '#dadada',
        borderRadius: 8,
    }
})