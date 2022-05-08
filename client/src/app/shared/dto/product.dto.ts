export interface ProductDTO extends Record <string, any>{
  "_id": string,
  "name": string,
  "category": string,
  "nutrients":{
    "calories": number,
    "proteins": number,
    "carbs": number,
    "fats": number
  },
  "quantities":{
    "quantity_g"?: number
    "unit_g"?: number
  }
}

