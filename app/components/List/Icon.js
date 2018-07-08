import React from 'react';

import { View, Image, ViewPropTypes } from 'react-native';

import styles from './styles';


const Icon = ({ checkmark, visible, iconBackground }) => {
  const iconStyles = [styles.icon];

  if (visible)
    iconStyles.push(styles.iconVisible);
  
  if (iconBackground)
  iconStyles.push({ backgroundColor: iconBackground });

  return  (
    <View style={iconStyles}>
      {checkmark ? <Image style={styles.checkmark} resizeMode = "contain" source={ require('./images/check.png') } /> : null}
    </View>
  );
};

Icon.ViewPropTypes = {
  checkmark: ViewPropTypes.bool,
  visible:   ViewPropTypes.bool,
  iconBackground:   ViewPropTypes.string,
}

export default Icon;
