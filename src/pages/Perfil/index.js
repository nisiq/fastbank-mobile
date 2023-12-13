import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Perfil = () => {
    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        cpf: '',
        email: '',
        url_imagem: '',
    });

    const [userAccount, setUserAccount] = useState({
        agencia: '',
        numero: '',
        // Adicione outros campos conforme necessário
    });

    useEffect(() => {
        const carregarDados = async () => {
            try {
                // Obter o token do AsyncStorage
                const token = await AsyncStorage.getItem('token');
                console.log('Token do AsyncStorage:', token);

                if (!token) {
                    console.error('Token não encontrado. Faça login para obter um token válido.');
                    return;
                }

                // Decodificar o token para obter informações, como o ID do usuário
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.user_id;

                // URL para obter os dados do usuário
                const userUrl = `http://127.0.0.1:8000/api/v1/user/me/`;
                // URL para obter os dados da conta
                const accountUrl = `http://127.0.0.1:8000/api/v1/accounts/${userId}/`;

                // Cabeçalho com o token
                const headers = {
                    Authorization: `Bearer ${token}`,
                };

                // Obter dados do usuário
                const userResponse = await axios.get(userUrl, { headers });
                // Obter dados da conta
                const accountResponse = await axios.get(accountUrl, { headers });

                // Atualizar o estado com os dados obtidos
                setUserData({
                    first_name: userResponse.data.first_name,
                    last_name: userResponse.data.last_name,
                    cpf: userResponse.data.cpf,
                    email: userResponse.data.email,
                    url_imagem: userResponse.data.url_imagem,
                    // Adicione outros campos conforme necessário
                });

                // Atualizar o estado dos dados da conta
                setUserAccount({
                    agencia: accountResponse.data.agencia,
                    numero: accountResponse.data.numero,
                    // Adicione outros campos conforme necessário
                });
            } catch (error) {
                console.error('Erro ao carregar dados do perfil:', error);
            }
        };

        carregarDados();
    }, []); // O segundo argumento vazio faz com que o useEffect execute apenas uma vez no carregamento do componente

    return (
        <View style={styles.container}>
            <Text>Perfil</Text>
            {/* Renderizar os dados do usuário aqui */}
            <Text>Nome: {userData.first_name}</Text>
            <Text>Sobrenome: {userData.last_name}</Text>
            <Text>CPF: {userData.cpf}</Text>
            <Text>Email: {userData.email}</Text>
            {/* Adicione outros campos conforme necessário */}

            {/* Renderizar os dados da conta aqui */}
            <Text>Agência: {userAccount.agencia}</Text>
            <Text>Número: {userAccount.numero}</Text>
            {/* Adicione outros campos conforme necessário */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Perfil;
