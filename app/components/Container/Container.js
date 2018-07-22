import React from 'react';
import {
  View, ViewPropTypes, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import styles from './styles';

const Container = ({ children, backgroundColor }) => {
  const containerStyle = [styles.container];

  if (backgroundColor) { containerStyle.push({ backgroundColor }); }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={containerStyle}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

Container.ViewPropTypes = {
  children: ViewPropTypes.element,
  backgroundColor: ViewPropTypes.string,
};

export default Container;
