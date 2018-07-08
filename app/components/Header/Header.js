import React from 'react';
import { View, ViewPropTypes, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

const Header = ({ onPress, isConnected, onWarningPress }) => (
    <View style={styles.container}>
      
      {!isConnected ? (
        <TouchableOpacity style={styles.button} onPress={onWarningPress}>
        <Image
          resizeMode = "contain"
          style={styles.icon}
          source={require('./images/warning.png')}
        />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity style={[styles.button, styles.buttonRight]} onPress={onPress}>
      <Image
        resizeMode = "contain"
        style={styles.icon}
        source={require('./images/gear.png')}
      />
      </TouchableOpacity>
    </View>
);

Header.ViewPropTypes = {
  onPress : ViewPropTypes.func,
}

export default Header;
