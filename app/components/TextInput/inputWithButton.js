import React from 'react';
import {
  View, ViewPropTypes, Text, TouchableHighlight, TextInput,
} from 'react-native';

import color from 'color';

import styles from './styles';

const InputWithButton = (props) => {
  const {
    onPress, buttonText, editable = true, textColor,
  } = props;

  const underlayColor = color(styles.$buttonBackgroundColorBase).darken(styles.$buttonBackgroundColorModifier);

  const containerStyles = [styles.container];
  if (editable === false) { containerStyles.push(styles.constainerDisabled); }

  const buttonTextStyles = [styles.buttonText];
  if (textColor) { buttonTextStyles.push({ color: textColor }); }

  return (
    <View style={containerStyles}>
      <TouchableHighlight
        underlayColor={underlayColor}
        style={styles.buttonContainer}
        onPress={onPress}
      >
        <Text style={buttonTextStyles}>
          {buttonText}
        </Text>
      </TouchableHighlight>

      <View style={styles.border} />
      <TextInput style={styles.input} underLineColorAndroid="transparent" {...props} />
    </View>
  );
};

InputWithButton.ViewPropTypes = {
  onPress: ViewPropTypes.func,
  buttonText: ViewPropTypes.string,
  editable: ViewPropTypes.bool,
  textColor: ViewPropTypes.string,
};


export default InputWithButton;
