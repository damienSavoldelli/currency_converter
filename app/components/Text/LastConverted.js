import React from 'react';
import { Text, ViewPropTypes } from 'react-native';
import moment from 'moment';

import styles from './styles';

const LastConverted = ({
  date, base, quote, conversionRate,
}) => (
  <Text style={styles.text}>
    1
    {' '}
    {base}
    {' '}
=
    {' '}
    {conversionRate}
    {' '}
    {quote}
    {' '}
as of
    {' '}
    {moment(date).format('MMMM D, YYYY')}
  </Text>
);

LastConverted.ViewPropTypes = {
  date: ViewPropTypes.object,
  base: ViewPropTypes.string,
  quote: ViewPropTypes.string,
  conversionRate: ViewPropTypes.number,
};
export default LastConverted;
