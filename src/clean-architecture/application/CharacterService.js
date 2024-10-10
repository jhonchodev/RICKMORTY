import Character from "../domain/Character";

export class CharacterService {
    constructor(characterRepository) {
        this.characterRepository = characterRepository;
    }

    async getAllCharacters(nextPage) {
        let data = [];
        const response = await this.characterRepository.fetchAll(nextPage);

        data = response.results;
        return data.map(c => new Character(c.id, c.name, c.status, c.species, c.gender, c.origin, c.location, c.image));
    }
}