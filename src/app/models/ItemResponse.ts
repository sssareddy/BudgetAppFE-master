import { Item } from '../models/Item';
import { GenericResponse } from '../models/GenericResponse';

export class ItemResponse extends GenericResponse {
  itemsList!:Item[];
  totalSum!:number;
}
