import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import Productos from '../screens/Productos';
import Compras from '../screens/Compras';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const opcion1 = createStackNavigator(
  {
    Productos: Productos,
  },
  config
);

opcion1.navigationOptions = {
  tabBarLabel: 'Productos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

opcion1.path = '';

const opcion2 = createStackNavigator(
  {
    Compras: Compras,
  },
  config
);

opcion2.navigationOptions = {
  tabBarLabel: 'Compras',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
    />
  ),
};

opcion2.path = '';

const tabNavigator = createBottomTabNavigator({
  opcion1,
  opcion2,
});

tabNavigator.path = '';

export default tabNavigator;
