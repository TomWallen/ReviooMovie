import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Image} from 'react-native';
import theme from '../../resources/styles/theme';
import PropTypes from 'prop-types';


class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/revioomovielogo.png')}  style={styles.logo}/>
        {this.props.loading && <ActivityIndicator color={theme.colors.white} size="large" />}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    aspectRatio:3,
    height:100,
  },
});

export default SplashScreen;

SplashScreen.propTypes = {
    loading: PropTypes.bool.isRequired,
};
