export function BMRFormula(gender: string, weight: number, height: number, age:number){
    switch(gender){
      case "Vyras":
        return 65.4 + (13.7 * weight) + (5 * height) - (6.8 * age);
      case "Moteris":
        return 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }
}
