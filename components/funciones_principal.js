import React from 'react';
import { Content, Card, CardItem, Body, Text, Button, Icon, Left, Segment, Header, Title, Right, ListItem, List } from 'native-base';
import { AsyncStorage } from 'react-native';
import { categoriasAll, subcategoria } from '../components/categorias';


export function Categorias(state) {
    if (state.level === null) {
        return categoriasAll(state)
    } else if (state.level.sublevels !== undefined) {
        return subcategoria(state);
    }
}

