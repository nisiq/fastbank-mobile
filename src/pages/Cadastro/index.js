import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';


export default function Cadastro() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [first_name, setFirst_name] = useState('')
  const [last_name, setLast_name] = useState('')
  const [cpf, setCpf] = useState('')


  const cadastrar = () => {
    axios.post('https://c54c-179-125-150-107.ngrok-free.app/api/v1/user/create',
      {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        cpf: cpf,
      },
      {}
    ).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.error(err)
    })
  }

  return (

    <ScrollView style={styles.container}>
      <View style={styles.container}>

        <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
          <Text style={styles.message}>Tela Login</Text>
          <Animatable.Image
            animation="flipInY" // Animação no Logo
            source={('../../assets/panda-senha2.png')}
            style={{ width: '100%' }}
            resizeMode="contain" // Mantém a proporção da imagem
          />
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style={styles.containerForm}>

          {/* Campos Obrigatórios de Login (Email e Senha) */}

          <Text style={styles.title}>Email</Text>
          <TextInput
            placeholder="Digite um email"
            style={styles.input}
            onChangeText={(e) => setEmail(e)}
          />

          <Text style={styles.title}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(e) => setPassword(e)}
          />

          <Text style={styles.title}>Nome</Text>
          <TextInput
            placeholder="Digite um email"
            style={styles.input}
            onChangeText={(e) => setFirst_name(e)}
          />

          <Text style={styles.title}>Sobrenome</Text>
          <TextInput
            placeholder="Digite um email"
            style={styles.input}
            onChangeText={(e) => setLast_name(e)}

          />

          <Text style={styles.title}>CPF</Text>
          <TextInput
            placeholder="Digite seu cpf"
            style={styles.input}
            onChangeText={(e) => setCpf(e)}
          />


          {/* Botão para Validar Acesso */}
          <TouchableOpacity onPress={cadastrar}
            style={styles.button}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>

        </Animatable.View>


        {/* Botão Acessar - Ir até a pagina de Login */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')} >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>


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

  buttonRegistrar: {
    marginTop: 14,
    alignSelf: 'center'
  },

  registerText: {
    color: '#a1a1a1',
    fontSize: 15,
  }
})