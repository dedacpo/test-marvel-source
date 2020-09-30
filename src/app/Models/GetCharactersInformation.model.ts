import { Character } from 'src/app/Models/Character.model';

export class GetCharactersInformation {
    offset: number
    limit: number
    total: number
    count: number
    characters: Character[]
}