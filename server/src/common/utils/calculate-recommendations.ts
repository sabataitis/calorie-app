export function calculateRecommendations(age: number, calories): any{
  if(age > 2 && age <64){
    const p_from= (calories * (10/100)) /4;
    const p_to = (calories * (20/100)) /4;

    const c_from = (calories * (45/100)) /4;
    const c_to = (calories * (60/100)) /4;

    const f_from = (calories * (25/100)) /9;
    const f_to = (calories * (35/100)) /9;

    const proteins_from = Number(p_from.toString().split(".")[0]);
    const proteins_to = Number(p_to.toString().split(".")[0]);

    const carbs_from = Number(c_from.toString().split(".")[0]);
    const carbs_to = Number(c_to.toString().split(".")[0]);

    const fats_from = Number(f_from.toString().split(".")[0]);
    const fats_to = Number(f_to.toString().split(".")[0]);

    return {
      proteins: {
        from: proteins_from,
        to: proteins_to
      },
      carbs: {
        from: carbs_from,
        to: carbs_to
      },
      fats:{
        from: fats_from,
        to: fats_to
      }
    }
  }
}
