import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';

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
    });

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                console.log('Token do AsyncStorage:', token);

                if (!token) {
                    console.error('Token não encontrado. Faça login para obter um token válido.');
                    return;
                }

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.user_id;

                const userUrl = `https://3a72-189-57-188-42.ngrok-free.app/api/v1/user/me/`;
                const accountUrl = `https://3a72-189-57-188-42.ngrok-free.app/api/v1/accounts/${userId}/`;

                const headers = {
                    Authorization: `Bearer ${token}`,
                    "ngrok-skip-browser-warning": "69420",
                };

                await axios.get(userUrl, { headers })
                .then((resp) => {
                     setUserData({
                    first_name: resp.data.first_name,
                    last_name: resp.data.last_name,
                    cpf: resp.data.cpf,
                    email: resp.data.email,
                    url_imagem: resp.data.url_imagem,
                });
                })
                .catch((err) => {
                    console.log("erro: " + err)   
                })
                const accountResponse = await axios.get(accountUrl, { headers });
                setUserAccount({
                    agencia: accountResponse.data.agencia,
                    numero: accountResponse.data.numero,
                });
            } catch (error) {
                console.error('Erro ao carregar dados do perfil:', error);
            }
        };

        carregarDados();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleUpdatePic = async () => {
        try {
            const formData = new FormData();
            formData.append("url_imagem", {
                uri: selectedImage,
                name: "photo.jpg",
                type: "image/jpg",
            });

            const token = await AsyncStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.user_id;

            const url = `https://3a72-189-57-188-42.ngrok-free.app/api/v1/user/me/`;

            await axios.patch(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },

            });

            console.log("Imagem enviada com sucesso");
        } catch (error) {
            console.error("Erro ao enviar imagem:", error.toJSON());
        }
    };

    useEffect(() => {
        if (selectedImage) {
            handleUpdatePic();
        }
    }, [selectedImage]);

    return (
        <View style={styles.container}>
            <Text>Perfil</Text>

            {!userData.url_imagem && (
                <Pressable onPress={pickImage}>
                    <FontAwesome5 name="user-circle" size={70} color="#c0c0c0" />
                </Pressable>
            )}
            {userData.url_imagem && (
                <Pressable onPress={pickImage}>
                    <Image source={{ uri: userData.url_imagem }} style={{ width: 100, height: 100 }} />
                </Pressable>
            )}

            <Text>Nome: {userData.first_name}</Text>
            <Text>Sobrenome: {userData.last_name}</Text>
            <Text>CPF: {userData.cpf}</Text>
            <Text>Email: {userData.email}</Text>

            <Text>Agência: {userAccount.agencia}</Text>
            <Text>Número: {userAccount.numero}</Text>
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
