// viewmodels/CharacterViewModel.js
import { useState } from 'react';
import { CharacterRepository } from '../infraestructure/CharacterRepository';
import { CharacterService } from '../application/CharacterService';

export const useCharacterViewModel = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextPage, setNextPage] = useState(1);


    const characterService = new CharacterService(new CharacterRepository());

    const loadCharacters = async () => {
        try {
          // Invoca el llamado de todos los personajes según la página
        } catch (err) {
            // Setear el error
        } finally {
            // Setear la finalización de la ejecución indepedendiente del resultado
        }
    };

    // Cada cambio de página debe generar la ejecución de cargar todos los personajes
   
    return { characters, loading, error, setNextPage, nextPage };
};