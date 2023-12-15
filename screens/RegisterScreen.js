import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, Alert } from 'react-native'
import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Zocial } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from "../firebase";
import { doc, setDoc } from 'firebase/firestore';


const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigation = useNavigation();
    const register = () => {
        if(email ==="" || password ==="" || phone ===""){
            Alert.alert(
                "Invalid Details",
                "Please fill the details",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ],
                { cancelable: false }
              );
        }
       createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        console.log("user credential", userCredential);
        const user = userCredential._tokenResponse.email;
        const myUserUid = auth.currentUser.uid;

        setDoc(doc(db,"users",`${myUserUid}`),{
            email:user,
            phone:phone
        })
       })
    }
    return (
        <SafeAreaView style={{ flex: 1, alignItems: "center", padding: 10 }}>
            <KeyboardAvoidingView>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
                    <Text style={{ fontSize: 20, color: "green", fontWeight: "bold" }}>
                        Register
                    </Text>
                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>Create a new account</Text>
                </View>
                <View style={{ marginTop: 50 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Zocial name="email" size={24} color="black" />
                        <TextInput placeholder="Email"
                            placeholderTextColor="gray"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            style={{
                                borderBottomWidth: 1,
                                fontSize: 15,
                                width: 250,
                                marginLeft: 10,
                                borderBottomColor: "gray",
                                marginVertical: 10,

                            }} />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="key-sharp" size={24} color="black" />
                        <TextInput placeholder="Password"
                            placeholderTextColor="gray"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            style={{
                                borderBottomWidth: 1,
                                fontSize: 15,
                                width: 250,
                                marginLeft: 10,
                                borderBottomColor: "gray",
                                marginVertical: 20,

                            }} />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialIcons name="phone-android" size={24} color="black" />
                        <TextInput placeholder="Phone No."
                            placeholderTextColor="gray"
                             value={phone}
                             onChangeText={(text) => setPhone(text)}
                            style={{
                                borderBottomWidth: 1,
                                fontSize: 15,
                                width: 250,
                                marginLeft: 10,
                                borderBottomColor: "gray",
                                marginVertical: 20,

                            }} />
                    </View>

                    <Pressable onPress={register} style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        margin: 50,
                        backgroundColor: "green",
                        width: 200,
                        padding: 15,
                        borderRadius: 10
                    }}>
                        <Text style={{
                            fontSize: 18,
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "white"
                        }}>Register</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.goBack()} style={{ marginTop:5 }}>
                        <Text style={{
                            fontSize: 15,
                            textAlign: "center",
                            color: "gray",
                            fontWeight: "500"
                        }}>Already have an account? Sign In</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen


const styles = StyleSheet.create({})
