import { Image, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Zocial } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  },[])

  const login = () => {
    signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
      console.log("user credential", userCredential);
      const  user = userCredential.user;
      console.log("user details", user);
    })
  }
  
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", padding: 10 }}>
      <KeyboardAvoidingView>
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}>
          <Text style={{ fontSize: 20, color: "green", fontWeight: "bold" }}>
            Sign In
          </Text>
          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>Sign In to your account</Text>
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

          -
          <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 10 }}>
            <Text style={{
              fontSize: 15,
              textAlign: "center",
              color: "gray",
              fontWeight: "500"
            }}>Don't have an account? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})
