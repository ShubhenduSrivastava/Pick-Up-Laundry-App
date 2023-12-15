import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import LottieView from "lottie-react-native";

const OrderScreen = () => {
    return (
        <SafeAreaView style={{flex:1, alignSelf: "center", justifyContent: "center" }} >
            <LottieView source={require("../assets/thumbs.json")} styles={{ height: 360, width: 300}}
            autoPlay
            loop={false}
            speed={0.7}
            />
            <Text style={{marginTop:250,fontSize:19, fontWeight:"700", textAlign:"center"}}>Your order has been placed</Text>

            <LottieView source={require("../assets/sparkle.json")}  style={{height:300, position:"absolute", top:100, width:300,alignSelf:"center"}}
            autoPlay
            loop={false}
            speed={0.7}
            />
        </SafeAreaView >
    )
}

export default OrderScreen

const styles = StyleSheet.create({})
