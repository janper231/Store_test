import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';

import { Content, Card, CardItem, Body, Text, Button, Icon, Left } from 'native-base';
import productos from '../data/products.json';
import { styles } from '../assets/css/principal';

import { AsyncStorage } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, color: "black", textAlign: "center", fontWeight: "bold" }}>Productos</Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View>
          <ListaProductos />
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function ListaProductos() {
  return (
    Object.values(productos).map(data => {
      return (
        data.map((mdata, i) => {
          if (mdata['quantity'] > 0) {
            return (
              <Content key={i}>
                <Card>
                  <CardItem>
                    <Body>
                      <Text>
                        Producto : {mdata['name']}
                      </Text>
                      <Text>
                        Disponible : {mdata['quantity']} Unidades.
                        </Text>
                      <Text>
                        Precio : {mdata['price']} Pesos Cop.
                        </Text>
                    </Body>
                    <Left>
                      <Button success onPress={() => { AgregarCompra(mdata) }}>
                        <Icon name='md-cart' />
                        <Text> Agregar </Text>
                      </Button>
                    </Left>
                  </CardItem>
                </Card>
              </Content>
            )
          }
        })
      )
    })
  )
}

async function AgregarCompra(data) {
  var value = await AsyncStorage.getItem('compra');
  value = [value];
  value.push(data);
  console.log(data);
  await AsyncStorage.setItem('compra', [data]);
  var value = await AsyncStorage.getItem('compra');
  console.log(value);
  alert("llego");
}