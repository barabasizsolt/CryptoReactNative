import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Result, ResultType } from '../util/Result';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Platform } from 'react-native';
import firebase, { ReactNativeFirebase } from '@react-native-firebase/app';
import { Environment } from '../../environment';

export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<Result<FirebaseAuthTypes.User>> => {
  try {
    const result: FirebaseAuthTypes.UserCredential =
      await auth().signInWithEmailAndPassword(email, password);
    return { kind: ResultType.Success, data: result.user };
  } catch (error: any) {
    if ('code' in error) {
      switch (error.code) {
        case 'auth/invalid-email':
          return {
            kind: ResultType.Failure,
            errorMessage: 'Invalid email. Please enter a valid email address.',
          };
        case 'auth/user-disabled':
          return {
            kind: ResultType.Failure,
            errorMessage:
              'User account is disabled. Please contact support for assistance.',
          };
        case 'auth/user-not-found':
          return {
            kind: ResultType.Failure,
            errorMessage:
              'User not found. Please check your email or sign up for a new account.',
          };
        case 'auth/wrong-password':
          return {
            kind: ResultType.Failure,
            errorMessage:
              'Wrong password. Please enter the correct password for your account.',
          };
        default:
          return {
            kind: ResultType.Failure,
            errorMessage: 'Something went wrong',
          };
      }
    } else {
      return { kind: ResultType.Failure, errorMessage: 'Something went wrong' };
    }
  }
};

export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<Result<FirebaseAuthTypes.User>> => {
  try {
    const result: FirebaseAuthTypes.UserCredential =
      await auth().createUserWithEmailAndPassword(email, password);
    return { kind: ResultType.Success, data: result.user };
  } catch (error: any) {
    if ('code' in error) {
      switch (error.code) {
        case 'auth/invalid-email':
          return {
            kind: ResultType.Failure,
            errorMessage: 'Invalid email. Please enter a valid email address.',
          };
        case 'auth/email-already-in-use':
          return {
            kind: ResultType.Failure,
            errorMessage:
              'Email already in use. Please choose a different email address.',
          };
        case 'auth/operation-not-allowed':
          return {
            kind: ResultType.Failure,
            errorMessage:
              'Operation not allowed. Please contact support for assistance.',
          };
        case 'auth/weak-password':
          return {
            kind: ResultType.Failure,
            errorMessage:
              'Password is too weak. Please choose a stronger password.',
          };
        default:
          return {
            kind: ResultType.Failure,
            errorMessage: 'Something went wrong',
          };
      }
    } else {
      return { kind: ResultType.Failure, errorMessage: 'Something went wrong' };
    }
  }
};

export const logOut = async (): Promise<Result<void>> => {
  try {
    await auth().signOut();
    return { kind: ResultType.Success };
  } catch (error: any) {
    return { kind: ResultType.Failure, errorMessage: 'Could not log out.' };
  }
};

export const useAuthStateChange = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /* Workaround: Firebase initialization for IOS */
  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (firebase.apps.length === 0) {
        firebase.initializeApp({
          apiKey: Environment.iosApiKey,
          appId: Environment.iosAppId,
          projectId: Environment.projectId,
          storageBucket: '',
          databaseURL: '',
          messagingSenderId: '',
        } as ReactNativeFirebase.FirebaseAppOptions);
      }
    }
  }, []);

  useEffect(() => {
    auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      setIsLoading(false);
      dispatch({ type: user ? 'LOG_IN' : 'LOG_OUT' });
    });
  }, [dispatch]);

  return { isLoading };
};
