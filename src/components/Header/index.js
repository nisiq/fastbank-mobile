import React from "react";
import { View, StyleSheet, Text, StatusBar, TouchableOpacity} from 'react-native'
import { Feather } from '@expo/vector-icons'

//garantir o espacamento independente do tamanho da statusbar
//se estiver carregando esta no android, se nao ios = mais espacamento
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;
//name = receber o nome de index home
export default function Header({ name }){
    return(
        <View style={styles.container}>
            <View style={styles.content}>
            <Text style={styles.username}>Olá, {name}</Text>

            
            <TouchableOpacity activeOpacity={0.9} style={styles.buttonMenu}>
                <Feather name="menu" size={27} color="#FFF" />
            </TouchableOpacity>


            <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>
                <Feather name="user" size={27} color="#FFF" />
            </TouchableOpacity> 

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#000',
        paddingTop: statusBarHeight,
        flexDirection: 'row',
        paddingStart: 16,
        paddingEnd: 16,
        paddingBottom: 16,
    },
    content:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    username:{
        fontSize: 18,
        color: '#fff',
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',

    },
    buttonMenu:{
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20/2,
        left: 50,
        
    },
    buttonUser:{
        width: 44,
        height: 44,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20/2,
        right: 320,
        
    }
})