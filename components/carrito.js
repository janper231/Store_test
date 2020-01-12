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

export async function EditarCompra(data, infoAction, option) {
    if (option === "add") {
        await AgregarCompra(data)
            .then(() => {
                infoAction();
            })
    } else {
        if (data.cantidad > 1) {
            var value = await AsyncStorage.getItem('compra');
            value = JSON.parse(value)
            value = value.map(compra => {
                if (compra.id === data.id) {
                    compra.cantidad -= 1;
                }
                return compra;
            });
            await AsyncStorage.setItem('compra', JSON.stringify(value));
            infoAction();
        } else {
            EliminarCompra(data, infoAction);
        }
    }
}

export async function EliminarTodo(infoAction) {
    AsyncStorage.removeItem("compra");
    Toast.show({ text: "Se eliminaron todos los productos del carrito!", type: "success" })
    infoAction();
}

export async function FinalizarCompra(infoAction) {
    let datos = await AsyncStorage.getItem("compra");
    let historial = await AsyncStorage.getItem("historial_compras");
    datos = JSON.parse(datos);
    let new_data = [
        {
            fecha: new Date(),
            compra: datos
        }
    ];
    if (historial !== null) {
        new_data.push(JSON.parse(historial));
    }
    await AsyncStorage.setItem('historial_compras', JSON.stringify(new_data))
    await AsyncStorage.removeItem("compra");
    Toast.show({ text: "Gracias por su compra!", type: "success" })
    infoAction();
}