import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';

import OrphanageData from './pages/createOrphanages/OrphanageData';
import SelectMapPosition from './pages/createOrphanages/SelectMapPosition';
import Header from './components/Header';

export default function Routes(){
    const {Navigator, Screen} = createStackNavigator();

    return (
        <NavigationContainer>
            <Navigator 
                screenOptions={{
                    headerShown: false,
                    cardStyle: {backgroundColor: '#f2f3f5'}
                }}
            >
                <Screen name="OrphanagesMap" component={OrphanagesMap}/>
                <Screen 
                    name="OrphanageDetails" 
                    component={OrphanageDetails}
                    options={{
                        headerShown: true,
                        header: () => <Header showCancel={false} title="Orfanato"/>
                    }}
                />

                <Screen 
                    name="OrphanageData" 
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Informe Os Dados"/>
                    }}
                />
                <Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{
                        headerShown: true,
                        header: () => <Header title="Selecione No Mapa"/>
                    }}
                />
            </Navigator>

        </NavigationContainer>

    );

}