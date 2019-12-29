import React from 'react';
import { Content, List, ListItem, Left, Text, Right, Icon } from "native-base"
import categorias from '../data/categories.json';
import { ListaProductos } from './productos';

export function categoriasAll(state) {
    return (
        <Content>
            <List>
                {
                    Object.values(categorias.categories).map((data, i) => {
                        return (
                            <ListItem key={i} onPress={() => { state.categoria(data, true) }}>
                                <Left>
                                    <Text>{data.name}</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        )
                    })
                }
            </List>
        </Content>
    )
}

export function subcategoria(state) {
    return (
        <Content>
            <List>
                {
                    state.level.sublevels.map((data, i) => {
                        return (
                            < ListItem key={i} onPress={() => { state.categoria(data) }}>
                                <Left>
                                    <Text>{data.name}</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        )
                    })
                }
            </List>
            {ListaProductos(state.level)}
        </Content >
    )
}