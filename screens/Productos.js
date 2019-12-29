import React from 'react';
import { ScrollView, View, } from 'react-native';
import { styles } from '../assets/css/general';
import { Spinner } from 'native-base';
import { Categorias } from '../components/funciones_principal';
import { withNavigationFocus } from 'react-navigation';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      isReady: false,
      headlevel: null,
      level: null,
      categoria: this.categoria.bind(this),
    }
  }

  componentDidMount() {
    if (this.state.level === null)
      this.setState({ isReady: true })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.setState({ isReady: this.props.isFocused, level: null, headlevel: null })
    }
  }

  categoria(data, head = false) {
    if (head) {
      this.setState({ level: data, headlevel: data })
    } else {
      this.setState({ level: data })
    }

  }

  render() {
    if (!this.state.isReady) {
      return <Spinner color='blue' />;
    }
    return (
      <View>
        <ScrollView
          contentContainerStyle={styles.contentContainer}>
          {Categorias(this.state)}
        </ScrollView>
      </View>
    )
  }
}

Home.navigationOptions = {
  title: 'Productos',
};


export default withNavigationFocus(Home);