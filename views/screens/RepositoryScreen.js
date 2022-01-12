import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import Spinner from 'react-native-spinkit';

export default class RepositoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      userName: this.props.route.params.userName,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.onLoadData();
    });
  }

  componentWillUnmount() {
    if (this.focusListener && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }

  onLoadData = () => {
    this.setState({isLoading: true});
    fetch(`https://api.github.com/users/${this.state.userName}/repos`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({data: json});
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  render() {
    const {isLoading} = this.state;
    return (
      <View style={styles.screen}>
        <Text
          style={styles.title}>{`${this.state.userName}'s Repositories`}</Text>
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
                  <Text style={styles.textMedium}>
                    {item.name.toLowerCase()}
                  </Text>
                  {item.description && (
                    <Text style={styles.textRegular}>{item.description}</Text>
                  )}
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
    borderRadius: 10,
    borderColor: '#DDD',
    borderWidth: 1,
    padding: 10,
    marginVertical: 7.5,
    marginHorizontal: 15,
  },
  textRegular: {
    fontFamily: 'Hind-Regular',
    fontSize: 16,
  },
  textMedium: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 16,
  },
  title: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 24,
    margin: 10,
  },
});
