import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const signOutUser = () => {
   signOut(auth).then(() => {
    navigation.replace("Login");
   }).catch(err => {
    console.log(err);
   });
  }
  return (
    <SafeAreaView style = {{flex:1, justifyContent:"center", alignItems:"center"}}>
      <Pressable>
          <Text style={{fontSize:20}}>Welcome {user.email}</Text>
      </Pressable>

      <Pressable onPress={signOutUser}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              margin: 50,
              backgroundColor: "green",
              width: 200,
              padding: 15,
              borderRadius: 10
            }}>
        <Text style={{fontWeight:"bold",fontSize:18,textAlign: "center", color:"white"}}>Sign Out</Text>
      </Pressable>
      
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
