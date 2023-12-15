import { FIGHTER_BODY } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";

const fighterFieldsNamesValidator = (obj,shema) => {
  const fighterKeys = Object.keys(shema);
  const allKeysExist = fighterKeys.every((key) => obj.hasOwnProperty(key));
  const noneExtraKeys = Object.keys(obj).every((key) => fighterKeys.includes(key));

  return allKeysExist && noneExtraKeys;
}

const powerValidator = (power) => power >= 1 && power <= 100 ? true : false
const defenseValidator = (defense) => defense >= 1 && defense <=10 ? true : false
const healthValidator = (health) => health >=80 && health <=120 ? true : false

const isFighterInDatabase = (name) => {
 const isFighterExist = fighterService.search({'name':name})
 if (isFighterExist) return true
 return false
}
const createFighterValid = (req, res, next) => {
  try {
    req.body.health = 100
    const fighterBody = req.body
    console.log(fighterBody)
    const isFighterExist = isFighterInDatabase(fighterBody.name)

    const isFieldsValid = fighterFieldsNamesValidator(req.body,FIGHTER_BODY)
    const isPowerValid = powerValidator(fighterBody.power)
    const isDefenseValid = defenseValidator(fighterBody.defense)
    const isHealtValid = healthValidator(fighterBody.health)

    if(isFighterExist){
      throw new Error('Fighter with this name already exist in database')
    }

    if(!isFieldsValid||!isPowerValid||!isDefenseValid||!isHealtValid){
      throw new Error('Fighter properties are invalid')
    }
    next();
  } catch (error) {
    next(error.message)
  }
  
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  next();
};

export { createFighterValid, updateFighterValid };
