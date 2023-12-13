import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function Extrato() {
  const [accountData, setAccountData] = useState({
    saldo: '',
  });

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        // Retrieve the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        console.log('Token do AsyncStorage:', token);

        if (!token) {
          console.error('Token não encontrado. Faça login para obter um token válido.');
          return;
        }

        // Decode the token to get user information, such as the user ID
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user_id;

        // URL for the account data
        const url = `https://3a72-189-57-188-42.ngrok-free.app/api/v1/accounts/${userId}/`;
        console.log('URL da Conta:', url);

        // Make a request to get the account data
        const accountResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Dados da Conta:', accountResponse.data);

        // Update the state with the fetched data
        setAccountData({
          saldo: accountResponse.data.saldo, // Assuming saldo is the correct property
        });
      } catch (error) {
        console.error('Erro ao obter dados da conta:', error);
      }
    };

    fetchAccountData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Saldo</Text>

        <View style={styles.content}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.balance}>{accountData.saldo}</Text>
        </View>
      </View>

      <View style={styles.item}>
        <Text style={styles.itemTitle}>Gastos</Text>

        <View style={styles.content}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.expenses}>120,00</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
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
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    currencySymbol:{
        color: '#000',
        marginRight: 6,
    },
    balance:{
        fontSize: 22,
        color: '#080'
    },
    expenses:{
        fontSize: 22,
        color: 'red'
    }


})