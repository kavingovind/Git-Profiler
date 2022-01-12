import React, {Component} from 'react';
import {
  TextInput,
  Image,
  Text,
  ToastAndroid,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-spinkit';

export default class ProfileScreen extends Component {
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
    fetch(`https://api.github.com/users/${this.state.userName.trim()}`)
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
    const {data, isLoading} = this.state;
    const date = new Date(data.created_at);
    return (
      <View style={styles.screen}>
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
        {!isLoading &&
          data != '' &&
          data.name != null &&
          data.message !== 'Not Found' && (
            <>
              <View style={styles.header}>
                <Image
                  style={styles.userImage}
                  source={{uri: data.avatar_url}}
                />
                <View style={styles.details}>
                  <Text>
                    <Text style={styles.textMedium}>
                      {`@${data.login.toLowerCase()}`}
                    </Text>
                    <Text style={styles.textRegular}>
                      {data.name ? ` (${data.name})` : ''}
                    </Text>
                  </Text>
                  {data.location && (
                    <View style={styles.row}>
                      <Image
                        style={styles.icon}
                        source={require('../../assets/location-pin.png')}
                      />
                      <Text style={styles.textRegular}>{data.location}</Text>
                    </View>
                  )}
                  <View style={styles.row}>
                    <Image
                      style={styles.icon}
                      source={require('../../assets/calendar.png')}
                    />
                    <Text style={styles.textRegular}>
                      {`Joined: ${date.toLocaleDateString()}`}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.gridRow}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Repository', {
                      userName: this.state.userName,
                    })
                  }
                  style={styles.grid}>
                  <Text style={styles.textMediumLarge}>
                    {data.public_repos}
                  </Text>
                  <Text style={styles.textRegular}>Repositories</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Following', {
                      userName: this.state.userName,
                    })
                  }
                  style={styles.grid}>
                  <Text style={styles.textMediumLarge}>{data.following}</Text>
                  <Text style={styles.textRegular}>Following</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Followers', {
                      userName: this.state.userName,
                    })
                  }
                  style={styles.grid}>
                  <Text style={styles.textMediumLarge}>{data.followers}</Text>
                  <Text style={styles.textRegular}>Followers</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
  },
  spinner: {
    flex: 1,
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
