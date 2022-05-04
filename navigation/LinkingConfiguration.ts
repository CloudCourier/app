import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              MessageScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              UserScreen: 'two',
            },
          },
        },
      },
      Search: 'search',
      Login:'login',
      Register:'register',
      NotFound: '*',
    },
  },
};

export default linking;
