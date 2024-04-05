import { GenericResponse } from '../models/GenericResponse';
import { Perticular } from '../models/Perticular';
export class PerticularResponse extends GenericResponse {
 itemsList!:string[];
categoryList:string[];
purchaseModeList:string[];
paymentModeList:string[];
perticulasList:Perticular[];
}
