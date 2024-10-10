import { useCallApi } from "../../services/Functions/useCallApi";
import { API_ROUTES } from "../../utils/Routes";

export class CharacterRepository {
    constructor() {
    }

    async fetchAll(nextPage) {
        const response = await fetch(`${API_ROUTES.CHARACTERS_ROUTE}?page=${nextPage}`);
        const data = await response.json();
        return data;
    }
}