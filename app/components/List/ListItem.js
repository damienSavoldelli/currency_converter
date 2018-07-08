import React from 'react';
import { View, Text, TouchableHighlight, ViewPropTypes } from 'react-native';

import styles from './styles';
import Icon from './Icon';


const ListItem = ({ text, onPress, selected = false, checkmark= true, visible = true, customIcon = null, iconBackground, }) => (
  <TouchableHighlight onPress={onPress} underlayColor={styles.$underlayColor}>
    <View style={styles.row}>
      <Text style={styles.text}>
        {text}
      </Text>
      {selected ? <Icon checkmark={checkmark} visible={visible} iconBackground={iconBackground} /> : <Icon />}
      {customIcon}
    </View>
  </TouchableHighlight>
);

ListItem.ViewPropTypes = {
  text:      ViewPropTypes.string,
  onPress:   ViewPropTypes.func,
  selected:  ViewPropTypes.bool,
  checkmark: ViewPropTypes.bool,
  visible:   ViewPropTypes.bool,
  customIcon:   ViewPropTypes.element,
  iconBackground:   ViewPropTypes.string,
}

export default ListItem;
