import React, { Component } from 'react';
import { StatusBar, KeyboardAvoidingView, ViewPropTypes, NetInfo } from 'react-native';
import { connect } from 'react-redux';

import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInput';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Text';
import { Header } from '../components/Header';
import { connectAlert } from '../components/Alert';

import { swapCurrency, changeCurrencyAmount, getInitialConversion } from '../actions/currencies';
import {changeNetworkStatus} from '../actions/network';

class Home extends Component {
  static ViewPropTypes = {
    navigation: ViewPropTypes.object,
    dispatch: ViewPropTypes.func,
    baseCurrency: ViewPropTypes.string,
    quoteCurrency: ViewPropTypes.string,
    amount: ViewPropTypes.number,
    conversionRate: ViewPropTypes.number,
    isFetching: ViewPropTypes.bool,
    LastConvertedDate: ViewPropTypes.object,
    primaryColor:ViewPropTypes.string,
    alertWithType: ViewPropTypes.func,
    currencyError: ViewPropTypes.string,
  }

  componentWillMount() {
    this.props.dispatch(getInitialConversion());
  }

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleNetworkChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currencyError && nextProps.currencyError !== this.props.currencyError)
      this.props.alertWithType('error', 'erreur', nextProps.currencyError);
  }
  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleNetworkChange);
  }

  handleNetworkChange = (info) => {
    this.props.dispatch(changeNetworkStatus(info.type))
  }

  handlPressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' });
  }

  handlPressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' });
  }

  handleChangeText = (amount) => {
    this.props.dispatch(changeCurrencyAmount(amount));
  }

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  }

  handleOptionPress = () => {
    this.props.navigation.navigate('Options');
  }

  handleDisconnectPress = () => {
    this.props.alertWithType(
      'error', 
      'Not connected to internet', 
      "Juste a heads up that you're not connected to the internet - som features may not work"
    );
  }

  render() {
    let quotePrice = (this.props.isFetching) ? '...' : (this.props.amount * this.props.conversionRate).toFixed(2);

    return (
      <Container backgroundColor={this.props.primaryColor} >
        <StatusBar translucent={false} barStyle="light-content" />
        <Header
          onPress={this.handleOptionPress}
          isConnected={this.props.isConnected}
          onWarningPress={this.handleDisconnectPress}
        />
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor={this.props.primaryColor} />
          <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlPressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleChangeText}
            textColor={this.props.primaryColor}
           />
          <InputWithButton
            onPress={this.handlPressQuoteCurrency}
            buttonText={this.props.quoteCurrency}
            editable={false}
            value={quotePrice}
            textColor={this.props.primaryColor}
          />
          <LastConverted
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            date={this.props.LastConvertedDate}
            conversionRate={this.props.conversionRate}
          />

          <ClearButton
            text="Reverse Currencies"
            onPress= {this.handleSwapCurrency}
          />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};

  return{
    baseCurrency,
    quoteCurrency,
    amount: state.currencies.amount,
    conversionRate: rates[quoteCurrency] || 0,
    isFetching: conversionSelector.isFetching,
    LastConvertedDate: conversionSelector.date ? new Date(conversionSelector.date) : new Date(),
    primaryColor: state.theme.primaryColor,
    currencyError: state.currencies.error,
    isConnected: state.network.connected,
  }
};

export default connect(mapStateToProps)(connectAlert(Home));
