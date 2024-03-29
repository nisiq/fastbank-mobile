import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons'
import Transferencia from '../../pages/Transferencia';
import { useNavigation } from '@react-navigation/native';


export default function Actions() {
    const navigation = useNavigation();

    const navigateToScreen = (screenName) => () => {
        navigation.navigate(screenName);
    };


    return (

        // Início do componente ScrollView horizontal com alguns estilos - carrossel options
        <ScrollView style={styles.container} horizontal={true} showHorizontalScrollIndicator={false} >

            <TouchableOpacity style={styles.actionButton} onPress={navigateToScreen('Transferencia')}>
                <View style={styles.areaButton}>
                    <AntDesign name="swap" size={26} color="#000" />
                </View>
                <Text style={styles.labelButton}>Transferencia</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.actionButton} onPress={navigateToScreen('Emprestimo')} >
                <View style={styles.areaButton}>
                    <AntDesign name="export" size={26} color="#000" />
                </View>
                <Text style={styles.labelButton}>Empréstimo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={navigateToScreen('Cartao')}>
                <View style={styles.areaButton}>
                    <AntDesign name="creditcard" size={26} color="#000" />
                </View>
                <Text style={styles.labelButton}>Solic. Cartão</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.areaButton}>
                    <AntDesign name="barcode" size={26} color="#000" />
                </View>
                <Text style={styles.labelButton}>Boletos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
                <View style={styles.areaButton}>
                    <AntDesign name="setting" size={26} color="#000" />
                </View>
                <Text style={styles.labelButton}>Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={navigateToScreen('Perfil')}>
                <View style={styles.areaButton}>
                    <Feather name="user" size={26} color="#000" />
                </View>
                <Text style={styles.labelButton}>Perfil</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        maxHeight: 84,
        marginBottom: 14,
        marginTop: 18,
        paddingEnd: 14,
        paddingStart: 14
    },
    actionButton: {
        alignItems: 'center',
        marginRight: 32
    },
    areaButton: {
        backgroundColor: '#fff',
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelButton: {
        marginTop: 4,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff'
    }
})