import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';



export default function Transferencia() {

  const [origem, setOrigem] = useState('')
  const [valor, setValor] = useState('')
  const [destino, setDestino] = useState('')


  const transferir = async () => {
    try {
      // Obter o token armazenado
      const token = await AsyncStorage.getItem('token');
      console.log('Token do AsyncStorage:', token);

  
      // Verificar se o token está presente
      if (!token) {
        console.error('Token não encontrado. Faça login para obter um token válido.');
        return;
      }
  
      // URL para a transferência
      const url = `https://cff7-179-125-150-230.ngrok-free.app/api/v1/accounts/${origem}/transferir/`;
      console.log('URL da Transferência:', url);

  
      // Configuração do cabeçalho com o token de autorização
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      // Dados da transferência
      const data = {
        conta_origem: origem,
        conta_destino: destino,
        valor: valor,
      };

      console.log('Dados da Transferência:', data);

  
      // Realizar a solicitação de transferência
      const response = await axios.post(url, data, { headers });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Sucesso!',
        text2: 'Transferência Realizada com Sucesso',
      });

      // Manipular a resposta
      console.log(response.data); // Dados da resposta

      
  
    } catch (error) {
      // Lidar com erros
      console.error('Erro na transferência:', error.response.data);
    }
  };


  return (
    <View style={styles.container}>


      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Transferencia</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.containerForm}>

        <Text style={styles.title}>Origem</Text>
        <TextInput
          placeholder="Digite id de sua conta"
          style={styles.input}
          onChangeText={(e) => setOrigem(e)}
        />

        <Text style={styles.title}>Valor</Text>
        <TextInput
          placeholder="Digite o valor"
          style={styles.input}
          onChangeText={(e) => setValor(e)}
        />

        <Text style={styles.title}>Destino</Text>
        <TextInput
          placeholder="Digite o id do destinatario"
          style={styles.input}
          onChangeText={(e) => setDestino(e)}
        />

        <TouchableOpacity style={styles.buttonTransfer}
          onPress={transferir}>
          <Text>Transferir</Text>
        </TouchableOpacity>


      </Animatable.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },

  containerHeader: {
    marginTop: '2%',
    paddingStart: '5%',
    marginBottom: '-2%'
  },

  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000'
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
    color: '#000'
  },

  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    color: '#000'
  },

  button: {
    backgroundColor: '#000',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },

  buttonTransfer: {
    marginTop: 14,
    alignSelf: 'center'
  },

  registerText: {
    color: '#a1a1a1',
    fontSize: 15,
  }
})