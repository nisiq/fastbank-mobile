import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function Extrato({saldo, gastos}) {
    return (
        <View style={styles.container}>

            <View style={styles.item}>
                <Text style={styles.itemTitle}>Saldo</Text>

                <View style={styles.content}>
                    <Text style={styles.currencySymbol}>R$</Text>
                    <Text style={styles.balance}>{saldo}</Text>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.itemTitle}>Gastos</Text>

                <View style={styles.content}>
                    <Text style={styles.currencySymbol}>R$</Text>
                    <Text style={styles.expenses}>{gastos}</Text>
                </View>
            </View>



        </View>    

    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingStart: 18,
        paddingEnd: 18,
        marginTop: -24,
        marginStart: 14,
        marginEnd: 14,
        borderRadius: 4,
        paddingTop: 22,
        paddingBottom: 22,
        zIndex: 99,
    
    },
    itemTitle:{
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        color: '#fff',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    currencySymbol:{
        color: '#fff',
        marginRight: 6,
    },
    balance:{
        fontSize: 22,
        color: '#2ecc'
    },
    expenses:{
        fontSize: 22,
        color: '#e74c3c'
    }


})