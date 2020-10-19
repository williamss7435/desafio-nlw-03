import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import Leaftlet, {  } from 'leaflet';

import { FiPlus, FiArrowRight } from 'react-icons/fi';

import happyServices from '../services/happyServices';
import mapMarkerImg from '../images/map-marker.svg';
import '../styles/orphanages-map.css';

interface Orphanages{
    id: number,
    latitude: number;
    longitude: number;
    name: string;
}

export default function OrphanagesMap(){
    const mapIcon = Leaftlet.icon({
        iconUrl: mapMarkerImg,
        iconSize: [58, 68],
        iconAnchor: [29, 68],
        popupAnchor: [170, 2]
    });

    const [orphanages, setOrphanages] = useState<Orphanages[]>([]);

    useEffect(() => {
        (async () => {
            const response = await happyServices.get('orphanages')
            console.log(response.data)
            setOrphanages(response.data);
        })();
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>São Paulo</strong>
                </footer>
            </aside>

            <Map center={[-23.4520576,-46.4060416]} zoom={15} style={{ width: '100%', height: '100%', }}>
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer> */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}></TileLayer>
                
                {orphanages.map(orphanage => {
                    return (
                        <Marker icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} key={orphanage.id}>
                            <Popup closeButton={false} minWidth={240} maxHeight={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}><FiArrowRight size={20} color="#FFF"/></Link>
                            </Popup>
                        </Marker>
                    );
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size="32" color="#FFF"></FiPlus>
            </Link>
        </div>
    );
}