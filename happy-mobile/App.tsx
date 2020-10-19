import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import mapMaker from './src/images/map-maker.png';

import {useFonts} from 'expo-font';
import {Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold} from '@expo-google-fonts/nunito';

import Routes from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold, 
    Nunito_700Bold, 
    Nunito_800ExtraBold
  });

  if(!fontsLoaded){
    return null;
  }

  return (
    <Routes></Routes>
  );

};
