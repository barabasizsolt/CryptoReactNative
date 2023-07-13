import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Result, ResultType } from '../util/Result';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Platform } from 'react-native';
import firebase, { ReactNativeFirebase } from '@react-native-firebase/app';
import { Environment } from '../../environment';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
            errorMessage: 'Something went wrong.',
          };
      }
    } else {
      return {
        kind: ResultType.Failure,
        errorMessage: 'Something went wrong.',
      };
    }
  }
};

/* TODO: Could be refactored with .then .catch */
export const authenticateWithGoogle = async (): Promise<
  Result<FirebaseAuthTypes.User>
> => {
  try {
    const hasPlayService = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    if (!hasPlayService) {
      return {
        kind: ResultType.Failure,
        errorMessage: 'Google Play Services are not available.',
      };
    }
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      try {
        const result = await auth().signInWithCredential(googleCredential);
        return { kind: ResultType.Success, data: result.user };
      } catch (error: any) {
        return {
          kind: ResultType.Failure,
          errorMessage: 'Google Sign In failed.',
        };
      }
    } catch (error: any) {
      return {
        kind: ResultType.Failure,
        errorMessage: 'Google Sign In failed.',
      };
    }
  } catch (error: any) {
    return {
      kind: ResultType.Failure,
      errorMessage: 'Could not authenticate with Google.',
    };
  }
};

export const logOut = async (): Promise<Result<void>> => {
  try {
    await auth().signOut();
    await GoogleSignin.signOut();
    return { kind: ResultType.Success };
  } catch (error: any) {
    return { kind: ResultType.Failure, errorMessage: 'Could not sign out.' };
  }
};

/* Observes authentication changes(signIn/signOut) & Initialize Social Auth */
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

  /* Initialize Google Sign In */
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Environment.webClientId,
    });
  }, []);

  /* Observes autentication changes & updates the store accordingly */
  useEffect(() => {
    auth().onAuthStateChanged((user: FirebaseAuthTypes.User | null) => {
      setIsLoading(false);
      dispatch({ type: user ? 'LOG_IN' : 'LOG_OUT' });
    });
  }, [dispatch]);

  return { isLoading };
};
