import React, {Component} from 'react';
import {
  TextInput,
  Image,
  Text,
  ToastAndroid,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class InputScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userName: '',
      isLoading: false,
    };
  }

  handleSubmit = (text) => {
    if (this.state.userName.length === 0) {
      ToastAndroid.showWithGravity(
        'Please Enter Username',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } else {
      this.props.navigation.navigate('Profile', {
        userName: this.state.userName,
      });
    }
  };

  render() {
    const {data} = this.state;
    return (
      <View style={styles.screen}>
        <TextInput
          placeholder={'Search'}
          style={styles.input}
          onChangeText={(text) => this.setState({userName: text})}
          value={this.state.userName}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        {(data.name === null || data.message === 'Not Found') && (
          <Image
            style={styles.image}
            source={require('../../assets/404.png')}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 45,
    width: '75%',
    textAlign: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 20,
    fontFamily: 'Hind-Regular',
  },
  button: {
    width: '50%',
    backgroundColor: '#009688',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Hind-SemiBold',
  },
  spinner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
    backgroundColor: 'white',
  },
  userImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  details: {
    padding: 5,
    marginLeft: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 5,
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  grid: {
    width: '30%',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    elevation: 2,
    backgroundColor: 'white',
  },
  textRegular: {
    fontFamily: 'Hind-Regular',
    fontSize: 16,
  },
  textMedium: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 16,
  },
  textMediumLarge: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 24,
  },
  image: {
    width: '100%',
    height: 500,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
