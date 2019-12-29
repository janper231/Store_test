import React from 'react';
import { AsyncStorage } from 'react-native';
import { Toast } from 'native-base';

export async function AgregarCompra(data) {
    var value = await AsyncStorage.getItem('compra');
    data.cantidad = 1;
    if (value === null) {
        await AsyncStorage.setItem('compra', JSON.stringify([data]));
    } else {
        value = JSON.parse(value)
        var flag = false;
        value = value.map(compras => {
            if (compras.id == data.id) {
                compras.cantidad += 1;
                flag = true;
            }
            return compras;
        });
        if (!flag) value.push(data);
        await AsyncStorage.setItem('compra', JSON.stringify(value));
    }
    Toast.show({ text: "Se agrego al carrito!", type: "success" })
}

export async function EliminarCompra(data, infoAction) {
    var value = await AsyncStorage.getItem('compra');
    value = JSON.parse(value)
    let new_value = [];
    value.map(compra => {
        if (compra.id !== data.id) {
            new_value.push(compra);
        }
    });
    if (new_value[0] === undefined) {
        await AsyncStorage.removeItem("compra");
    } else {
        await AsyncStorage.setItem('compra', JSON.stringify(new_value));
    }
    infoAction();
}

export function EditarCompra(data) {
    console.log(data);
}

export async function EliminarTodo(infoAction) {
    AsyncStorage.removeItem("compra");
    Toast.show({ text: "Se eliminaron todos los productos del carrito!", type: "success" })
    infoAction();
}

export async function FinalizarCompra() {
    alert("Gracias por su compra");
    let datos = await AsyncStorage.getItem("compra");
    datos = JSON.parse(datos);
    datos['fecha'] = Date.now();
    console.log(datos);
    //AsyncStorage.removeItem("compra");
}