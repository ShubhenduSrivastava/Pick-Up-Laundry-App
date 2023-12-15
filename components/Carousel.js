import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
    const images = [
        "https://media.istockphoto.com/id/1148658976/vector/laundry-and-dry-cleaning-clothes-service-steps-illustration-vector-flat-cartoon-graphic.jpg?s=612x612&w=0&k=20&c=KHzTLuVYSc7fNudEBfE3hqJCy668PkFF3LHxbw0-5NY=",
        "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
        "https://media.istockphoto.com/id/1283415220/vector/industrial-or-domestic-launderette-cleaning-service-female-character-in-public-laundry.jpg?s=612x612&w=0&k=20&c=VNE1QUXUAV6ENN235MYF0reZadYLqnvG0VJfjm5SSjk=",
        "https://media.istockphoto.com/id/1263322530/vector/woman-doing-laundry.jpg?s=612x612&w=0&k=20&c=SeAR-5kPwCsqqVGyDU7hAr64o3ylr1HK-4a5Sjk9Jy8=",
        "https://media.istockphoto.com/id/1337144361/vector/laundrette-company-or-hotel-service-female-character-employee-of-professional-maid-working.jpg?s=612x612&w=0&k=20&c=zBhPPPASKRBr2ArdcTzlN-a88cO47iZ4OnuKRdriRbo=",
    ];
    return ( 
        <View>
           <SliderBox
           images={images}
           autoPlay
           horizontal={true}
           circleLoop={true}
           dotColor={"#13274F"}
           inactiveDotColor="#90A4AE"
           ImageComponentStyle={{
            borderRadius:6,
            width:"94%",
           }}
           />
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({})
