import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { decrementQuantity, incrementQuantity, cleanCart } from '../cartReducer';
import { decrementQty, incrementQty } from '../ProductReducer';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const CartItem = ({ item, decrementQuantity, decrementQty, incrementQuantity, incrementQty }) => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 10 }}>
            <Text style={{ width: 100, fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>

            <Pressable
                style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    alignItems: "center",
                    borderColor: "#BEBEBE",
                    borderWidth: 0.5,
                    borderRadius: 10,
                }}>
                <Pressable onPress={() => {
                    decrementQuantity(item); //cart.
                    decrementQty(item);  //product.
                }}
                    style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        borderColor: "#E0E0E0",
                        justifyContent: "center",
                        alignContent: "center",
                    }}>
                    <Text style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                        textAlign: "center"
                    }}>-</Text>
                </Pressable>

                <Pressable>
                    <Text style={{
                        fontSize: 18,
                        color: "#088F8F",
                        paddingHorizontal: 8,
                        fontWeight: "600",
                    }}>{item.quantity}</Text>
                </Pressable>

                <Pressable onPress={() => {
                    incrementQuantity(item); //cart.
                    incrementQty(item);  //product.
                }}
                    style={{
                        width: 26,
                        height: 26,
                        borderRadius: 13,
                        borderColor: "#E0E0E0",
                        justifyContent: "center",
                        alignContent: "center",
                    }} >
                    <Text style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                        textAlign: "center"
                    }}>+</Text>

                </Pressable>

            </Pressable>


            <Text style={{ fontSize: 16, fontWeight: "bold" }}>₹{item.price * item.quantity}</Text>
        </View>
    );
};

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const total = useMemo(() => cart.map((item) => item.quantity * item.price).reduce((cur, prev) => cur + prev, 0), [cart]);
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const userUid = useMemo(() => auth.currentUser?.uid, []);
    const placeOrder = async () => {
        navigation.navigate("Order");
        dispatch(cleanCart());
        await setDoc(doc(db, "users", `${userUid}`), {
            orders: { ...cart },
            pickUpDetails: route.params
        },
            {
                merge: true,
            }
        );
    };

    const renderCartItems = () => {
        return cart.map((item, index) => (
            <CartItem
                key={index}
                item={item}
                decrementQuantity={decrementQuantity}
                decrementQty={decrementQty}
                incrementQuantity={incrementQuantity}
                incrementQty={incrementQty}
            />
        ));
    };

    return (
        <>
            <ScrollView style={{ marginTop: 50 }}>
                {total === 0 ? (
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
                    </View>
                ) : (
                    <>
                        <View style={{ padding: 10, flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                            <Ionicons onPress={() => navigation.goBack} name="arrow-back-circle" size={24} color="black" />
                            <Text>Your Bucket</Text>
                        </View>
                        <Pressable style={{ backgroundColor: "white", borderRadius: 12, marginLeft: 10, marginRight: 10, padding: 14 }}>
                            {renderCartItems()}
                        </Pressable>

                        <View style={{ marginHorizontal: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 25 }}>Billing details</Text>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>
                                <Text style={{ fonrSize: 18, fontWeight: "400", color: "gray" }}>
                                    Item Total
                                </Text>

                                <Text style={{ fontSize: 18, fontWeight: "400" }}>
                                    ₹{total}
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginVertical: 8,
                            }}>
                                <Text style={{ fonrSize: 18, fontWeight: "400", color: "gray" }}>
                                    Delivery Fee  |  1.2KM
                                </Text>

                                <Text style={{ fonrSize: 18, fontWeight: "400", color: "#088F8F" }}>
                                    FREE
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <Text style={{ fonrSize: 18, fontWeight: "400", color: "gray" }}>
                                    Free Delivery on your order
                                </Text>
                            </View>

                            <View style={{
                                borderColor: "gray",
                                height: 1,
                                borderWidth: 0.5,
                                marginTop: 10,
                            }} />

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginVertical: 10,
                            }}>
                                <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>
                                    Selected Date
                                </Text>

                                <Text style={{ fonrSize: 18, fontWeight: "400", color: "#088F8F" }}>

                                </Text>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>

                                <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>
                                    No of Days
                                </Text>

                                <Text style={{ fonrSize: 18, fontWeight: "400", color: "#088F8F" }}>
                                    {route.params.no_Of_Days}
                                </Text>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginVertical: 10,
                            }}>
                                <Text style={{ fontSize: 18, fontWeight: "500", color: "gray" }}>
                                    Selected Pick Up Time
                                </Text>

                                <Text style={{ fonrSize: 18, fontWeight: "400", color: "#088F8F" }}>
                                    {route.params.selectedTime}
                                </Text>
                            </View>

                            <View style={{
                                borderColor: "gray",
                                height: 1,
                                borderWidth: 0.5,
                                marginTop: 10,
                            }} />

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginVertical: 10,
                            }}>
                                <Text style={{ fonSize: 18, fontWeight: "bold" }}>
                                    To Pay
                                </Text>

                                <Text style={{ fonSize: 18, fontWeight: "bold" }}>
                                    {total + 95}
                                </Text>
                            </View>
                        </View>

                    </>
                )}

            </ScrollView>
            {total === 0 ? (
                null
            ) : (
                <Pressable style={{
                    backgroundColor: "#088F8F",
                    padding: 10,
                    marginBottom: 30,
                    marginTop: "auto",
                    margin: 15,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <View>
                        <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>{cart.length} items   |   ₹ {total}</Text>
                        <Text style={{ color: "white", fontSize: 12, fontWeight: "400", marginVertical: 5 }}>Extra charges might apply!</Text>
                    </View>

                    <Pressable onPress={placeOrder}>
                        <Text style={{ color: "white", fontSize: 17, fontWeight: "700" }}>Place Order</Text>
                    </Pressable>
                </Pressable>

            )}
        </>
    );
};

export default CartScreen;


const styles = StyleSheet.create({})
