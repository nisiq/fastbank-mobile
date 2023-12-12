import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Cartao() {

  const [salario, setSalario] = useState('')

  const solicitarCartao = async () => {
    try {
      // token armazenado
      const token = await AsyncStorage.getItem('token');


      if (!token) {
        console.error('Token não encontrado')
        return;
      }

      // Decodificar o token para obter informações, como o ID do usuário
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;

      const url = `https://51ab-189-57-188-42.ngrok-free.app/api/v1/accounts/${id}/solicitar_cartao/`;
      console.log('URL da Transferência:', url);


      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Dados da transferência
      const data = {
        salario: salario,
      };

      console.log('Dados do emprestimo:', data);


      // solicitação de empréstimo
      const response = await axios.post(url, data, { headers });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Sucesso!',
        text2: 'Cartão solicitado com Sucesso',
      });

      // Manipular a resposta
      console.log(response.data); // Dados da resposta


    } catch (error) {
      // Lidar com erros
      console.error('Erro no empréstimo:', error.response.data);
    }
  };


return (
  <View style={styles.container}>


    <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
      <Text style={styles.message}>Transferencia</Text>
      <Animatable.Image
        animation="flipInY" // Animação no Logo
        style={{ width: '100%' }}
        resizeMode="contain" // Mantém a proporção da imagem
      />
    </Animatable.View>

    <Animatable.View animation="fadeInUp" style={styles.containerForm}>

      <Text style={styles.title}>Valor</Text>
      <TextInput
        placeholder="Digite seu salário atual"
        style={styles.input}
        onChangeText={(e) => setSalario(e)}
      />


      <TouchableOpacity style={styles.buttonTransfer}
        onPress={solicitarCartao}>
        <Text>Solicitar</Text>
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