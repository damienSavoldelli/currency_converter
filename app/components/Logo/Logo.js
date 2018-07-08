import React, { Component } from 'react';
import { View, ImageBackground, Text, Keyboard, Animated, Platform, ViewPropTypes } from 'react-native';

import styles from './styles';

const ANIMATION_DURATION = 250;

class Logo extends Component {
  static ViewPropTypes = {
    tintColor: ViewPropTypes.string,
  }
  constructor(props) {
    super(props);

    this.containerImageWidth = new Animated.Value(styles.$largeContainerSize);
    this.imageWidth = new Animated.Value(styles.$largeImageSize);
  }
  componentDidMount() {
    let showListener = (Platform.OS != 'android') ? 'keyboardWillShow' : 'keyboardDidShow';
    let hideListener = (Platform.OS != 'android') ? 'keyboardWillHide' : 'keyboardDidHide';

    this.keyboardShowListener = Keyboard.addListener(showListener, this._keyboardShow);
    this.keyboardHideListener = Keyboard.addListener(hideListener, this._keyboardHide);
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  _keyboardShow = () => {
    Animated.parallel([
      Animated.timing(this.containerImageWidth, {
        toValue: styles.$smallContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.imageWidth, {
        toValue: styles.$smallImageSize,
        duration: ANIMATION_DURATION,
      })
    ]).start();
  }

  _keyboardHide = () => {
    Animated.parallel([
      Animated.timing(this.containerImageWidth, {
        toValue: styles.$largeContainerSize,
        duration: ANIMATION_DURATION,
      }),
      Animated.timing(this.imageWidth, {
        toValue: styles.$largeImageSize,
        duration: ANIMATION_DURATION,
      })
    ]).start();
  }

  render() {
    const containerImageStyle = [
      styles.containerImage,
      {width: this.containerImageWidth, height: this.containerImageWidth},
    ];

    const imageStyle = [
      styles.image,
      {width: this.imageWidth, height: this.imageWidth},
      this.props.tintColor ? { tintColor:this.props.tintColor } : null,
    ];
    return (
      <View style={styles.container}>
        <Animated.View style={containerImageStyle}>
          <ImageBackground
            resizeMode = "contain"
            style      = {styles.backgroundImage}
            source     = {require('./images/background.png')}
          >
            <Animated.Image resizeMode = "contain" style={imageStyle} source={require('./images/logo.png')} />
          </ImageBackground>
        </Animated.View>
        <Text style={styles.text}>
          Currency Converter
        </Text>
      </View>
    );
  }
}

export default Logo;
