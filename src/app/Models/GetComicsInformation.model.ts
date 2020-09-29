import { Comic } from 'src/app/Models/Comic.model';

export class GetComicsInformation {
    offset: number
    limit: number
    total: number
    count: number
    comics: [Comic]
}