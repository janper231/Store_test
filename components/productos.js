import React from 'react';
import { Content, Card, CardItem, Body, Text, Button, Icon, Left } from 'native-base';
import productos from '../data/products.json';
import { AgregarCompra } from './carrito';

export function ListaProductos(level) {
    return (
        Object.values(productos.products).map((data, i) => {
            if (data.quantity > 0 && data.sublevel_id === level.id) {
                return (
                    <Content key={i}>
                        <Card>
                            <CardItem>
                                <Body>
                                    <Text>
                                        Producto : {data['name']}
                                    </Text>
                                    <Text>
                                        Disponible : {data['quantity']} Unidades.
                                            </Text>
                                    <Text>
                                        Precio : {data['price']} Pesos Cop.
                                            </Text>
                                </Body>
                                <Left>
                                    <Button success onPress={() => { AgregarCompra(data) }}>
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
}
