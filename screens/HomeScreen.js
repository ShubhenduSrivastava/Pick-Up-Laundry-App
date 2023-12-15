import { StyleSheet, Text, SafeAreaView, View, Alert, Image, Pressable, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location"
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase";

/*Code for the location permission.*/
const HomeScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const [items,setItems] = useState([]);
    const total = cart.map((item) => item.quantity * item.price).reduce((cur, prev) => cur + prev, 0);
    const navigation = useNavigation();
    const [displayCurrentAddress, setdisplayCurrentAddress] = useState("We are loading your location");
    const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, []);
    const checkIfLocationEnabled = async () => {
        let enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert(
                "Locatrion services not enabled",
                "Please enable the location services",
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
        } else {
            setlocationServicesEnabled(enabled)
        }
    }
    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            Alert.alert(
                "Permission Denied",
                "allow teh app to use the location services",
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
        };

        const { coords } = await Location.getCurrentPositionAsync();
        // console.log(coords);
        if (coords) {
            const { latitude, longitude } = coords;

            let response = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            // console.log(response)

            for (let item of response) {
                let address = `${item.name} ${item.city} ${item.region} ${item.postalCode}`
                setdisplayCurrentAddress(address);
            }
        }
    };
    const product = useSelector((state) => state.product.product);
    const dispatch = useDispatch();
    useEffect(() => {
        if (product.length > 0) return;

        const fetchProducts = async () => {
            const colRef = collection(db,"types");
            const docsSnap = await getDocs(colRef);
            docsSnap.forEach((doc) => {
             items.push(doc.data());
            });
            items?.map((services) => dispatch(getProduct(services)));
        }
        fetchProducts();


    }, []);
    console.log(product);


    const services = [
        {
            id: "0",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Z0kukcrJ6A2fraqle_yAqEU5e35fQ96PUbvOhgnGcNzRRKbwLXC17KA5Oov9wbykOrk&usqp=CAU",
            name: "Shirts",
            quantity: 0,
            price: 15,
        },
        {
            id: "11",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ16Vd2e8UnIZQrxqo8y6BiVvBrwfjW3KRWinhwFuT9BbAOcoMit9l5Ac0jStvoIlqvPg&usqp=CAU",
            name: "T-shirts",
            quantity: 0,
            price: 10,
        },
        {
            id: "12",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScNDm372TkkPmoIj0eJ0DJ01t832GyAjWVqg&usqp=CAU",
            name: "Dresses",
            quantity: 0,
            price: 20,
        },
        {
            id: "13",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVcdP7Wfzc3yxbaCajoBdZzHp53Haph0lObA&usqp=CAU",
            name: "Jeans",
            quantity: 0,
            price: 15,
        },
        {
            id: "14",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIGEZmEeM_aEyAPX6sz75KC4KsZV4R2oSswg&usqp=CAU",
            name: "Sweaters",
            quantity: 0,
            price: 20,
        },
        {
            id: "15",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxb9uVJsuhxD65uA2FIM2X0MZuQdNPA6f2QQ&usqp=CAU",
            name: "Shorts",
            quantity: 0,
            price: 5,
        },
        {
            id: "16",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5BrJiTh49EMEWIPArZn-gF8ir35OJ0UAsqA&usqp=CAU",
            name: "Sleeveless",
            quantity: 0,
            price: 5,
        },
    ];

    return (
        
        /* LOCATION & PROFILE */
        <>
        <ScrollView >
            <View style={{ padding: 10, marginTop: 35, flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="location-pin" size={27} color="red" />
                <View>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>Home</Text>
                    <Text>{displayCurrentAddress}</Text>
                </View>

                <Pressable style={{ marginLeft: "auto", marginRight: 3 }}>
                    <Image style={{ width: 40, height: 40, borderRadius: 20 }}
                        source={{
                            uri: "https://yt3.ggpht.com/yti/AHXOFjUfjZ1nSP_-vWucUzJMlXNkV8ODswd5u_6Vc_FOMQ=s88-c-k-c0x00ffffff-no-rj-mo"
                        }}
                    />
                </Pressable>
            </View>


            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                margin: 10,
                borderWidth: 0.8,
                borderRadius: 10,
                borderColor: "#888888"
            }}>
                <TextInput placeholder='Search for items' />
                <Feather name="search" size={24} color="pink" />
            </View>

            <Carousel />

            <Services />

            {product.map((item, index) => (
                <DressItem item={item} key={index} />
            )
            )}
        </ScrollView>

        {total === 0 ? (
            null
        ):(
            <Pressable style={{
                backgroundColor:"#088F8F",
                padding: 10,
                marginBottom: 30,
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
    
                <Pressable onPress={() => navigation.navigate("PickUp")}>
                    <Text style={{color:"white", fontSize:17, fontWeight:"700"}}>Proceed to pickup</Text>
                </Pressable>
            </Pressable>

        )}

        
        </>
    );
};

export default HomeScreen

const styles = StyleSheet.create({})
