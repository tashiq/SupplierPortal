import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native'

// import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'
// import Checkbox from 'expo-checkbox'
import { Pressable } from 'react-native'
// import 'react-native-url-polyfill/auto'
// import { createClient } from '@supabase/supabase-js'

export default function LogIn({ navigation }) {





    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, seterrorMessage] = useState('')
    const [loading, setloading] = useState(false)
    const [loggedInStatus, setloggedInStatus] = useState(false)
    const [welcomeUserName, setwelcomeUserName] = useState('')
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);


    /*
    function signIn(email, password) {
    const { user, session, error } = await supabase.auth.signIn({
        email: email,
        password: password
    });

    if (error) {
        console.error('Error signing in:', error.message);
        return;
    }

    console.log('User signed in successfully:', user);
}
    
    */

    const loginUser = async () => {
        setloading(true)
        setEmail(email.trim())

        const data = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (data.error) {
            console.error('Error signing in:', data.error.message);
            return;
        }

        // console.log('User signed in successfully:', data.user);
        console.log(data)

        setloading(false)
    };

    const onLoginPress = () => {
        loginUser()
    }
    useEffect(() => {
        const checkLoggedIn = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const parsedUserData = JSON.parse(userData);
                update_user_info(parsedUserData)
                navigation.replace('HomeScreen')
            } else {
            }
        };
        checkLoggedIn()
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Image
                style={styles.logo}
            // source={require('../../assets/icon.png')}
            />
            <TextInput
                style={styles.input} placeholder='E-mail' placeholderTextColor="#aaaaaa"
                onChangeText={(text) => { setEmail(text); seterrorMessage(''); }} value={email}
                underlineColorAndroid="transparent" autoCapitalize="none"
            />
            <TextInput
                style={styles.input} placeholderTextColor="#aaaaaa" secureTextEntry placeholder='Password'
                onChangeText={(text) => { setPassword(text); seterrorMessage('') }} value={password}
                underlineColorAndroid="transparent" autoCapitalize="none"
            />

            {/* <Pressable style={styles.checkboxContainer} onPress={() => setIsRememberMeChecked(!isRememberMeChecked)}>
                <Checkbox
                    style={styles.checkbox}
                    value={isRememberMeChecked}
                    onValueChange={() => setIsRememberMeChecked(!isRememberMeChecked)}
                    color={isRememberMeChecked ? '#e80909' : undefined}
                />
                <Text style={styles.checkboxLabel}>Keep me logged in</Text>
            </Pressable> */}

            {errorMessage.length > 0 && <Text style={{ color: 'red', textAlign: 'center' }}>*{errorMessage}*</Text>}
            <TouchableOpacity
                disabled={password.length == 0 || email.length == 0}
                style={styles.button}
                onPress={onLoginPress}>
                <Text style={styles.buttonTitle}>
                    {loading ? <ActivityIndicator size={18} color={"#fff"} /> : "Log in"}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={loggedInStatus}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Ionicons name="md-person" size={64} color="#e80505" />
                        <Text style={styles.welcomeText}>
                            Welcome, <Text style={styles.usernameText}>{welcomeUserName}</Text>
                        </Text>
                        <TouchableOpacity style={styles.cancelButton}
                            onPress={() => {
                                setloggedInStatus(false);
                                navigation.replace('HomeScreen');
                            }}
                        >
                            <Text style={styles.cancelButtonText}>Enter the Arena</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        paddingTop: 30
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        fontStyle: 'italic',
        marginBottom: 20
    },
    logo: {
        alignSelf: 'center',
        height: 150,
        width: 150,
        marginBottom: 50
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        color: '#5591ad',
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 15,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#e80505',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#e80505",
        fontWeight: "bold",
        fontSize: 16
    },


    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '90%'
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    usernameText: {
        color: '#e80505',
    },
    cancelButton: {
        marginTop: 20,
        backgroundColor: '#e80505',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        width: '80%'
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginHorizontal: 15,
        width: '50%'
    },
    checkbox: {
        alignSelf: 'center',

    },
    checkboxLabel: {
        margin: 8,
    },
})