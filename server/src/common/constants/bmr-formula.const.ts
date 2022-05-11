export function HarrisBenedictFormula(gender: string, weight: number, height: number, age:number){
    switch(gender){
      case "Vyras":
        return 65.4 + (13.7 * weight) + (5 * height) - (6.8 * age);
      case "Moteris":
        return 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
    }
}

export function MiffinStJeorDFormula(gender: string, weight: number, height: number, age:number){
  switch(gender){
    case "Vyras":
      return (10 * weight) + (6.25 * height) - (5 * age)+5;
    case "Moteris":
      return (10 * weight) + (6.25 * height) - (5 * age)-161;
  }
}
