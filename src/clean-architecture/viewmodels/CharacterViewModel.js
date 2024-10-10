// viewmodels/CharacterViewModel.js
import { useState, useEffect } from 'react';
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
            const charactersData = await characterService.getAllCharacters(nextPage);
            setCharacters(charactersData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCharacters();
    }, [nextPage]);

    return { characters, loading, error, setNextPage, nextPage };
};