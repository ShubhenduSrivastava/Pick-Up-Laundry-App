import { ScrollView, StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'


const Services = () => {
    const services = [
        {
            id: "0",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQymsqoLa5nOL1qNX-MaFm1SLdGrIFCPohZxA&usqp=CAU",
            name: "Washing",
        },
        {
            id: "11",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFrRDH_1XIeBKcluUAcil7uqSduDdwsx667A&usqp=CAU",
            name: "Laundry",
        },
        {
            id: "12",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9uyw9Q8XirfCKApq852XlXLA29ZITVHkPzg&usqp=CAU",
            name: "Wash & Iron",
        },
        {
            id: "13",
            image: "https://www.kindpng.com/picc/m/56-562327_cleaning-services-images-png-transparent-png.png",
            name: "Dry Cleaning",
        },
    ];
    return (
        <View style={{padding:10}}>
            <Text style={{fontSize:16, fontWeight:"500"}}>Services Available</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator>
                {services.map((service, index) => (
                    <Pressable style={{margin:10, backgroundColor:"#F8F8F8", padding:20, borderRadius:10}} key={index}>
                      <Image source={{uri:service.image}} style={{height:70, width:70}} />
                      <Text style={{textAlign:"center",marginTop:5, fontWeight:"700"}}>{service.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    )
}

export default Services

const styles = StyleSheet.create({})
