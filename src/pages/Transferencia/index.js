import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { TextInputMask } from 'react-native-masked-text';



export default function Transferencia() {

  const [origem, setOrigem] = useState('')
  const [valor, setValor] = useState('')
  const [destino, setDestino] = useState('')

  const transferir = () => {
    const url = `http://127.0.0.1:8000/api/v1/accounts/${origem}/transferir/`;

    axios.post(url, {
      origem: origem,
      valor: valor,
      destino: destino,
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.error(err);
    });
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
          Transferir
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