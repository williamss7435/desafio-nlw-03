import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import mapMaker from '../images/map-marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import happyService from '../services/HappyService';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap(){
    const navigation = useNavigation();

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useFocusEffect(() => {

      ( async () => {
        const response = await happyService.get('orphanages');
        setOrphanages(response.data);
      })();
      
    });


    function handleNavigateToOrphanageDetails(id: number){
      navigation.navigate('OrphanageDetails', {id});
    }

    function handleNavigateToCreateOrphanage(){
      navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
          
          <MapView provider={PROVIDER_GOOGLE} style={styles.mapStyle} initialRegion={{
            latitude: -23.4520576,
            longitude: -46.4060416,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
          }}
          >
           
           {orphanages.map(orphanage => {
             return (
              <Marker
                key={orphanage.id} 
                icon={mapMaker} 
                coordinate={{
                  latitude: orphanage.latitude,
                  longitude: orphanage.longitude,
                }} 
                calloutAnchor={{
                  x: 2.7,
                  y: 0.8
                }}
              >
              <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
              </Marker>
             );

           })}
    
          </MapView>
    
          <View style={styles.footer}>
            <Text style={styles.footerText}>{`${orphanages.length} orfanatos encontrados`}</Text>
    
            <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
              <Feather name="plus" size={20} color="#FFF"/>
            </RectButton>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
      elevation: 3,
    },
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 20,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 40,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    footerText: {
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold',
    },
    createOrphanageButton: {
      width: 40,
      height: 40,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    }
  
  
  });
  