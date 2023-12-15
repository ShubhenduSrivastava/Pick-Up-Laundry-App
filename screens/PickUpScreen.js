import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((cur, prev) => cur + prev, 0);
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tomorrow",
    },
  ];

  const times = [
    {
      id: "00",
      time: "11:00 AM",
    },
    {
      id: "10",
      time: "12:00 PM",
    },
    {
      id: "20",
      time: "01:00 PM",
    },
    {
      id: "30",
      time: "02:00 PM",
    },
    {
      id: "40",
      time: "03:00 PM",
    },
    {
      id: "50",
      time: "04:00 PM",
    },
  ];
  const navigation = useNavigation();
  const proceedToCart = () => {
        if(!selectedDate || !selectedTime || !delivery) {
          Alert.alert(
            "Empty or invalid",
            "Please select the fields",
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
        if(selectedDate && selectedTime && delivery) {
          navigation.replace("Cart",{
            pickUpDate:selectedDate,
            selectedTime:selectedTime,
            no_Of_Days:delivery
          })
        }
  }
  return (
    <>
    <SafeAreaView >
      <Text style={{ marginTop: 40, marginLeft: 5, fontSize: 20, fontWeight: "bold" }}>Pickup address</Text>
      <TextInput placeholder='Enter your address' style={{
        borderColor: "gray",
        margin: 10,
        padding: 40,
        borderWidth: 0.7,
        paddingVertical: 80,
        borderRadius: 9
      }} />
      <Text style={{
        marginLeft: 5,
        fontSize: 20,
        fontWeight: "bold"
      }}>Pickup Date</Text>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date('2023-06-01')}
        endDate={new Date('2023-06-31')}
        initialSelectedDate={new Date('2020-08-22')}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
        flatListContainerStyle={styles.flatListContainerStyle}
      />
      <Text style={{
        marginLeft: 5,
        fontSize: 20,
        fontWeight: "bold"
      }}>Select Time</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator = {false}>

        {times.map((item, index) => (
          <Pressable key={index} onPress={() => setSelectedTime (item.time)} 
          style={ 
            selectedTime.includes(item.time) ? {
              margin: 10,
              padding: 15,
              borderColor:"green",
              borderWidth:1.5,
              borderRadius:7,
            } : {
              margin: 10,
              padding: 15,
              borderColor:"gray",
              borderWidth:0.7,
              borderRadius:7,
            }
          }>
            <Text>
              {item.time}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <Text style={{
        marginLeft: 5,
        fontSize: 20,
        fontWeight: "bold"
      }}>Delivery Date</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator = {false}>
        {deliveryTime.map((item,i) => (
          <Pressable onPress={() => setDelivery (item.name)} key={i}
          style={ 
            delivery.includes(item.name) ? {
              margin: 10,
              padding: 15,
              borderColor:"green",
              borderWidth:1.5,
              borderRadius:7,
            } : {
              margin: 10,
              padding: 15,
              borderColor:"gray",
              borderWidth:0.7,
              borderRadius:7,
            }
          }>
            <Text>{item.name}</Text>
          </Pressable>
        ))}

      </ScrollView>
    </SafeAreaView>

    {total === 0 ? (
            null
        ):(
            <Pressable style={{
                backgroundColor:"#088F8F",
                padding: 10,
                marginBottom: 30,
                marginTop:"auto",
                margin: 15,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent:"space-between",
            }}>
                <View>
                    <Text style={{color:"white", fontSize:15, fontWeight:"700"}}>{cart.length} items   |   ₹ {total}</Text>
                    <Text style={{color:"white" ,fontSize:12, fontWeight:"400",marginVertical:5}}>Extra charges might apply!</Text>
                </View>
    
                <Pressable onPress={proceedToCart}>
                    <Text style={{color:"white", fontSize:17, fontWeight:"700"}}>Proceed to Cart</Text>
                </Pressable>
            </Pressable>

        )}
    </>
  )
}

export default PickUpScreen

const styles = StyleSheet.create({})
