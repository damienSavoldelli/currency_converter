import React, { Component } from 'react';
import { Text, FlatList, View, StatusBar, ViewPropTypes } from 'react-native';
import { connect } from 'react-redux';


import { ListItem, Separator } from '../components/List';

import currencies from '../data/currencies';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';


TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
  static ViewPropTypes = {
    navigation: ViewPropTypes.object,
    dispatch:ViewPropTypes.func,
    baseCurrency: ViewPropTypes.string,
    quoteCurrency: ViewPropTypes.string,
    primaryColor: ViewPropTypes.string,
  };

  handlePress = (currency) => {
    const { type } = this.props.navigation.state.params;
    if (type == 'base') {
      this.props.dispatch(changeBaseCurrency(currency));
    } else if (type == 'quote') {
      this.props.dispatch(changeQuoteCurrency(currency));
    }
    this.props.navigation.goBack(null);
  };

  render() {
    let comparaisonCurrency = this.props.baseCurrency;

    if (this.props.navigation.state.params.type == 'quote')
      comparaisonCurrency = this.props.quoteCurrency;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="default" />
        <FlatList
          data={currencies}
          renderItem={ ({ item }) => (
            <ListItem
              text={item}
              selected={item == comparaisonCurrency}
              onPress={() => this.handlePress(item)}
              iconBackground= {this.props.primaryColor}
            />
          )}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

const mapStateToPorps = (state) => ({
  baseCurrency: state.currencies.baseCurrency,
  quoteCurrency: state.currencies.quoteCurrency,
  primaryColor: state.theme.primaryColor,
});


export default connect(mapStateToPorps)(CurrencyList);