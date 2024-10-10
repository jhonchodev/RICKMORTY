export class CharacterService {
    constructor(characterRepository) {
        this.characterRepository = characterRepository;
    }

    async getAllCharacters(nextPage) {
        let data = [];

        // Debe retornar un Array de objetos tipo Character
    }
}