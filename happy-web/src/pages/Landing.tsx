import React from 'react';

import {Link} from 'react-router-dom';
import {FiArrowRight} from 'react-icons/fi';

import '../styles/landing-page.css';

import logoImg from '../images/logo.svg';


export default function Landing(){
    return (
        <div id="page-landing">
          
          <div className="content-wrapper">
            <img src={logoImg} alt="Happy"/>
    
            <main>
              <h1>Leve felicidade para o mundo</h1>
              <p>Visite orfanatos e mude o dia de muitas crianças.</p>
            </main>
    
    
            <div className="location">
              <strong>São Paulo - SP</strong>
            </div>
            <Link to="/app" className="enter-app">
                <FiArrowRight size="26" color="rgba(0, 0, 0, 0.6)"/>
            </Link>
          </div>
        </div>
      );
}