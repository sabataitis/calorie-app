export interface ProductDTO extends Record <string, any>{
  "_id": string,
  "name": string,
  "calories_100g": number,
  "proteins_100g": number,
  "carbs_100g": number,
  "fats_100g": number,
  "category": string,
  "quantities":{
    "quantity_g"?: number
    "unit_g"?: number
  }
}

