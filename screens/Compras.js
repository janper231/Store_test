import React from 'react';
import { ScrollView, View, AsyncStorage } from 'react-native';
import { Content, Card, CardItem, Body, Text, Button, Icon, Left, Spinner, H1, Right, Fab } from 'native-base';
import { withNavigationFocus } from 'react-navigation';
import { EliminarCompra, EditarCompra, EliminarTodo, FinalizarCompra } from '../components/carrito';


class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      compras: [],
      infoAction: this.info.bind(this),
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    this.info()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.setState({ loading: true })
      this.info()
    }
  }

  async info() {
    await AsyncStorage.getItem("compra")
      .then(data => {
        this.setState({ loading: false, compras: JSON.parse(data) });
      })
  }

  render() {
    if (this.state.loading) {
      return (
        <Spinner color='blue' />
      )
    } else if (this.state.compras !== null) {
      return (
        <ScrollView>
          {
            this.state.compras.map((data, i) => {
              if (data !== null) {
                return (
                  <Content key={i}>
                    <Card>
                      <CardItem>
                        <Body>
                          <Text> Producto : {data.name} </Text>
                          <Text> Cantidad : {data.cantidad} Unidades. </Text>
                          <Text> Precio : {data.price}  </Text>
                        </Body>
                        <Button primary rounded onPress={() => { EditarCompra(data) }}>
                          <Icon name='md-create' />
                        </Button>
                        <Button danger rounded onPress={() => { EliminarCompra(data, this.state.infoAction) }}>
                          <Icon name='md-trash' />
                        </Button>
                      </CardItem>
                    </Card>
                  </Content>
                )
              }
            })
          }
          <Content >
            <Card>
              <Button danger onPress={() => { EliminarTodo(this.state.infoAction) }}>
                <Text>Borrar todo</Text>
                <Icon name='md-trash' />
              </Button>
              <Button success onPress={() => { FinalizarCompra(this.state.infoAction) }}>
                <Text>Finaliza compra</Text>
                <Icon name='md-card' />
              </Button>
            </Card>
          </Content>
        </ScrollView >
      )
    } else {
      return (
        <Content>
          <H1>No has agregado articulos al carrito, Vamos de compras! </H1>
        </Content>
      )
    }
  }
}

SettingsScreen.navigationOptions = {
  title: 'Compras',
};

export default withNavigationFocus(SettingsScreen);