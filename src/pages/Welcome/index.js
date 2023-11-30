import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Animação
import * as Animatable from 'react-native-animatable'

// Navegação
import { useNavigation } from '@react-navigation/native';

// Página 01 - Bem Vindo

export default function Welcome() {
  const navigation = useNavigation(); //Navigation - Encaminhar para tela 02 (Login)
 return (

   <View style={styles.container}>

    {/* Logo */}
    <View style={styles.containerLogo}>
      <Animatable.Image
        animation="flipInY" // Animação no Logo
        source={('../../assets/pandas-bank-welcome.png')}
        style={{ width: '100%' }}
        resizeMode="contain" // Mantém a proporção da imagem
      />

    </View>

    {/* Animação no Form */}
    <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}> 
      <Text style={styles.title}>OLÁ</Text>
      <Text style={styles.text}>Pronto para uma experiência única, em um banco completo?</Text>

    {/* Botão Acessar - Ir até a pagina de Login */}
      <TouchableOpacity style={styles.button} onPress={ () => navigation.navigate('Login')} >
        <Text style={styles.buttonText}>Pronto</Text>
      </TouchableOpacity>

    </Animatable.View>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, // Pegar tamanho inteiro da tela
    backgroundColor: '#000'
  },
  containerLogo:{
    flex: 2,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
    textAlign: 'center'
  },
  text: {
    color: '#a1a1a1',
    textAlign: 'center',
    fontSize: 15,
    top: 20,

  },
  button: {
    position: 'absolute',
    backgroundColor: '#000',
    borderRadius: 50,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  }

})