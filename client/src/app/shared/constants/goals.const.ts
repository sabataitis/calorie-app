import {TextValue} from "../interfaces/text-value.interface";
import {GOALS} from "../enum/goals.enum";

export const GoalsConst: TextValue[] = [
  {text: 'Palaikyti svorį', value: GOALS.MAINTAIN},
  {text: 'Numesti svorio', value: GOALS.LOOSE},
  {text: 'Priaugti svorio', value: GOALS.GAIN},
];
