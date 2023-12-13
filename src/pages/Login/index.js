import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Animação
import * as Animatable from 'react-native-animatable';
//Navegação 
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Home from '../Home';


// Página 02 - Login

export default function Login() {
  const navigation = useNavigation(); //Navigation - Encaminhar para tela 02 (Login)

  const [password, setPassword] = useState('')
  const [cpf, setCpf] = useState('')

  const [passwordAttempts, setPasswordAttempts] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const showToast = () => {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Aviso',
      text2: 'Você excedeu o número de tentativas. Aguarde 1 minuto.',
    });
  };

  const logar = () => {
    try {
      if (isButtonDisabled) {
        // Se o botão estiver desativado, não faz nada
        return;
      }
      // Autenticação com o servidor
      axios
        .post('https://3a72-189-57-188-42.ngrok-free.app/api/token/', {
          password: password,
          cpf: cpf,
        })
        .then((res) => {
          if (res && res.data && res.data.access) {
            const { access: token } = res.data;
            console.log('Token obtido:', token);
  
            // Armazenar o token
            AsyncStorage.setItem('token', token);
  
            // Token como padrão para as futuras solicitações
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setPasswordAttempts(0);
            // Sucesso, navegar para a página inicial
            navigation.navigate('Main');
          }
        })
        .catch((err) => {
          console.error(err);
          // Incrementar o contador de tentativas
          const newAttempts = passwordAttempts + 1;
          setPasswordAttempts(newAttempts);
  
          // Se exceder 3 tentativas, bloquear o botão e exibir a notificação
          if (newAttempts >= 3) {
            setIsButtonDisabled(true);
            showToast(); // Exibir notificação
            setTimeout(() => {
              // Desbloquear o botão após 1 minuto
              setIsButtonDisabled(false);
              setPasswordAttempts(0); // Reiniciar o contador após o desbloqueio
            }, 60000); // 1 minuto em milissegundos
          }
        });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response.data);
      }
    }
  };


return (
  <View style={styles.container}>

    <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
      <Text style={styles.message}>Tela Login</Text>
      <Animatable.Image
        animation="flipInY" // Animação no Logo
        style={{ width: '100%' }}
        resizeMode="contain" // Mantém a proporção da imagem
      />
    </Animatable.View>

    <Animatable.View animation="fadeInUp" style={styles.containerForm}>



      <Text style={styles.title}>CPF</Text>
      <TextInput
        placeholder="Digite seu cpf"
        style={styles.input}
        onChangeText={(e) => setCpf(e)}
      />

      <Text style={styles.title}>Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        style={styles.input}
        onChangeText={(e) => setPassword(e)}
      />

      {/* Botão para Validar Acesso */}
      <TouchableOpacity style={styles.button} onPress={logar}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      {/* Botão para Criar uma Conta */}
      <TouchableOpacity style={styles.buttonRegistrar}
        onPress={() => navigation.navigate('Cadastro')}
        disabled={isButtonDisabled}
      >
        <Text style={styles.registerText}>Não Possui uma conta? Clique aqui</Text>
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

  buttonRegistrar: {
    marginTop: 14,
    alignSelf: 'center'
  },

  registerText: {
    color: '#a1a1a1',
    fontSize: 15,
  }
})