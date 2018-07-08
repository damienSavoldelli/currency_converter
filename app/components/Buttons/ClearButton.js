import React from 'react';
import { View, Image, Text, ViewPropTypes, TouchableOpacity } from 'react-native';

import styles from './styles';

const ClearButton = ({ text, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.wrapper}>
      <Image
        resizeMode = "contain"
        style={styles.icon}
        source={require('./images/icon.png')}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

ClearButton.ViewPropTypes = {
  text : ViewPropTypes.string,
  onPress : ViewPropTypes.func,
}

export default ClearButton;
