import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

export default function Cartao() {
  const [salario, setSalario] = useState('');
  const [cardData, setCardData] = useState({});

  const generateCardData = () => {
    const cardNumber = Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
    const cvv = Math.floor(100 + Math.random() * 900).toString();
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 3);

    const formattedExpirationDate =
      `${('0' + (expirationDate.getMonth() + 1)).slice(-2)}/${expirationDate.getFullYear().toString().substr(-2)}`;

    return {
      cardNumber,
      cvv,
      expirationDate: formattedExpirationDate,
      limit: 1000,
    };
  };

  const solicitarCartao = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;

      const url = `https://2096-179-125-150-230.ngrok-free.app/api/v1/accounts/${userId}/solicitar_cartao/`;
      console.log('URL da Transferência:', url);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const data = {
        salario: salario,
      };

      console.log('Dados do empréstimo:', data);

      const response = await axios.post(url, data, { headers });

      if (salario > 1500) {
        const newCardData = generateCardData();
        console.log('Dados do cartão:', newCardData);

        // Atualiza o estado para exibir os dados do cartão
        setCardData(newCardData);

        // Manipular a resposta
        console.log(response.data); // Dados da resposta

        // Exibir uma mensagem de sucesso
      } else {
        // Exibir um aviso se o salário não for aceito
        console.log('Salário não aceito');
        setCardData({});
      }
    } catch (error) {
      // Lidar com erros
      if (axios.isAxiosError(error) && error.response) {
        console.error('Erro no empréstimo:', error.response.data);
      } else {
        console.error('Erro desconhecido:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Transferencia</Text>
        <Animatable.Image
          animation="flipInY"
          style={{ width: '100%' }}
          resizeMode="contain"
        />
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Valor</Text>
        <TextInput
          placeholder="Digite seu salário atual"
          style={styles.input}
          onChangeText={(e) => setSalario(e)}
        />

        <TouchableOpacity style={styles.buttonTransfer} onPress={solicitarCartao}>
          <Text>Solicitar</Text>
        </TouchableOpacity>

        {cardData.cardNumber && (
          <View style={styles.cardDataContainer}>
            <Text>Número: {cardData.cardNumber}</Text>
            <Text>CVV: {cardData.cvv}</Text>
            <Text>Vencimento: {cardData.expirationDate}</Text>
            <Text>Limite: {cardData.limit}</Text>
          </View>
        )}
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  containerHeader: {
    marginTop: '2%',
    paddingStart: '5%',
    marginBottom: '-2%',
  },

  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },

  containerForm: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },

  title: {
    fontSize: 20,
    marginTop: 28,
    color: '#000',
  },

  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    color: '#000',
  },

  buttonTransfer: {
    marginTop: 14,
    alignSelf: 'center',
  },

  cardDataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
});
