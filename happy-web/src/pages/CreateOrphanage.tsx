import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from "react-icons/fi";

import '../styles/create-orphanage.css';
import Sidebar from "../components/Sidebar";

import happyMapIcon from '../utils/mapIcon';
import happyService from '../services/happyServices';
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
  const history = useHistory();
  const [position, setPosition] = useState({latitude: 0 , longitude: 0});

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  function handlerMapClick(event: LeafletMouseEvent){
    const {lat, lng} = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    event.stopPropagation();

    const {latitude, longitude} = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    
    images.forEach(image => {
      data.append('images', image);
    })

    await happyService.post('orphanages', data);

    alert("Cadastro Realizado Com Sucesso!!");

    history.push('/app');
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
    if(!event.target.files) return;

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    });

    setImagesPreview(selectedImagesPreview);
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar/>

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-23.4520576,-46.4060416]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handlerMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                position.latitude !== 0 &&
                <Marker interactive={false} icon={happyMapIcon} position={[position.latitude,position.longitude]} />
              }

              {/* <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052,-49.6401092]} /> */}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={(event) => setName(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300}
                value={about} 
                onChange={(event) => setAbout(event.target.value)}  
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {imagesPreview.map((image, index) => {
                  return (
                    <img key={index} src={image} alt={name}/>
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

                <input onChange={handleSelectImages}  hidden type="file" multiple id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions"
                value={instructions} 
                onChange={(event) => setInstructions(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours"
                value={opening_hours} 
                onChange={(event) => setOpeningHours(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" onClick={() => setOpenOnWeekends(true)} className={open_on_weekends ? 'active' : ''}>Sim</button>
                <button type="button" onClick={() => setOpenOnWeekends(false)} className={!open_on_weekends ? 'active' : ''}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
