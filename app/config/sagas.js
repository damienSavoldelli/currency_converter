import { takeEvery, select, call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// 1. Swap currency
// 2. Change base currency
// 3 intial state currency
import { SWAP_CURRENCY, CHANGE_BASE_CURRENCY, GET_INITIAL_CONVERSION, CONVERSION_RESULT, CONVERSION_ERROR } from '../actions/currencies';

const getLatestRate = currency => fetch(`https://fixer.handlebarlabs.com/latest?base=${currency}`);

function* fetchLatestConversionRate(action) {

  const { connected, hasCheckedStatus } = yield select(state => state.network);
  yield put({ type: CONVERSION_ERROR, error:null });
  if (connected && hasCheckedStatus) {
    yield put({
      type: CONVERSION_ERROR,
      error: 'Not connected to the internet. conversion reate may be outdated or unvailable'
    });
    return;
  }

  try {
    let currency = action.currency;

    if (currency == undefined)
      currency = yield select(state => state.currencies.baseCurrency);

    const response = yield call(getLatestRate, currency);
    const result = yield response.json();

    if (result.error) {
      yield put({ type: CONVERSION_ERROR, error: result.error });
    } else {
      yield put({ type: CONVERSION_RESULT, result });
    }
  } catch (e) {
    yield put({ type: CONVERSION_ERROR, error: e.message });

    if (process.env.NODE_ENV == 'development')
      console.log('Saga error', e);    
  }
};

const clearConversionError = function* () {
  const DELAY_SECONDS = 4;
  const error = yield select(state => state.currencies.error);

  if (error) {
    yield delay(DELAY_SECONDS * 1000);
    yield push({ type: CONVERSION_ERROR, error:null });
  }
};

export default function* rootSaga() {
  yield takeEvery(GET_INITIAL_CONVERSION, fetchLatestConversionRate);
  yield takeEvery(CHANGE_BASE_CURRENCY, fetchLatestConversionRate);
  yield takeEvery(SWAP_CURRENCY, fetchLatestConversionRate);
}