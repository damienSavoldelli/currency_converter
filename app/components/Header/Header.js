import React from 'react';
import {
  View, ViewPropTypes, Image, TouchableOpacity,
} from 'react-native';

import styles from './styles';

const Header = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image
        resizeMode="contain"
        style={styles.icon}
        source={require('./images/gear.png')}
      />
    </TouchableOpacity>
  </View>
);

Header.ViewPropTypes = {
  onPress: ViewPropTypes.func,
};

export default Header;
