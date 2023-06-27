import AsyncStorage from '@react-native-async-storage/async-storage';
import { ResultType } from '../util/Result';
import { sleep } from '../util/Delay';

type LoggedInValue = 'loggedIn' | 'notLoggedIn';

const IS_LOGGED_IN_KEY: string = 'IsLoggedIn';

export const logIn = async () => authenticationHelper('loggedIn');

export const logOut = async () => authenticationHelper('notLoggedIn');

export const isLoggedIn = async () => {
  try {
    const value = await AsyncStorage.getItem(IS_LOGGED_IN_KEY);
    return value !== null && value === 'loggedIn';
  } catch (e) {
    return false;
  }
};

const authenticationHelper = async (isLoggedIn: LoggedInValue) => {
  console.log(`isLoggedIn: ${isLoggedIn}`);
  try {
    await AsyncStorage.setItem(IS_LOGGED_IN_KEY, isLoggedIn);
    await sleep(1000); // Sleep for 1000 milliseconds
    return { kind: ResultType.Success };
  } catch (error: any) {
    return {
      kind: ResultType.Failure,
      errorMessage: 'AsyncStorage setItem error',
    };
  }
};
