import React, {Component} from 'react';
import {Image, Text, View, StyleSheet, ScrollView} from 'react-native';
import Spinner from 'react-native-spinkit';

export default class FollowersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userName: this.props.route.params.userName,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    fetch(`https://api.github.com/users/${this.state.userName}/following`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({data: json});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    const {isLoading} = this.state;
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>{`${this.state.userName}'s Following`}</Text>
        {isLoading && (
          <View style={styles.spinner}>
            <Spinner
              size={40}
              color="#000"
              isVisible={isLoading}
              type="Bounce"
            />
          </View>
        )}
        {!isLoading && (
          <>
            <ScrollView style={styles.listView}>
              {this.state.data.map((item) => (
                <View style={styles.container} key={item.id}>
                  <Image style={styles.image} source={{uri: item.avatar_url}} />
                  <Text style={styles.textMedium}>
                    {item.login.toLowerCase()}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  listView: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#DDD',
    borderWidth: 1,
    padding: 10,
    marginVertical: 7.5,
    marginHorizontal: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textRegular: {
    fontFamily: 'Hind-Regular',
    fontSize: 16,
  },
  textMedium: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 18,
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 24,
    margin: 10,
  },
});
