import { FIGHTER_BODY } from "../models/fighter.js";
import CustomError from "../services/errorService.js";
import { dbAdapter } from "../config/db.js";
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


const insensetiveFighterSearch = (name) => {
    const fighters = dbAdapter.get('fighters').value()
    const isFighterExist = fighters.reduce((acc, curr)=>{
      if(curr.name.toLowerCase() === name.toLowerCase()) acc.exist = true
      return acc
    },{exist:false})
    return isFighterExist.exist
}

const createFighterValid = (req, res, next) => {
  try {
    if(!req.body.health)req.body.health = 100
    const fighterBody = req.body
    const isFighterExist = insensetiveFighterSearch(fighterBody.name)
    const isFieldsValid = fighterFieldsNamesValidator(req.body,FIGHTER_BODY)
    const isPowerValid = powerValidator(fighterBody.power)
    const isDefenseValid = defenseValidator(fighterBody.defense)
    const isHealtValid = healthValidator(fighterBody.health)

    if(isFighterExist){
      throw new CustomError(400,'Fighter with this name already exist in database')
    }

    if(!isFieldsValid||!isPowerValid||!isDefenseValid||!isHealtValid){
      throw new CustomError(400, 'Fighter properties are invalid')
    }
    next();
  } catch (error) {
    next(error)
  }
  
};

const fighterFieldsPutValidator = (obj, shema) => {
  const fighterKeys = Object.keys(shema)
  const noneExtraKeys = Object.keys(obj).every((key) => fighterKeys.includes(key));
  const atLeastOneKeyExist = fighterKeys.reduce((acc,curr) =>{
    if (Object.keys(obj).includes(curr)){
      acc.exist = true
    }
    return acc
  },{exist: false})
  return noneExtraKeys && atLeastOneKeyExist.exist
}

export const isFighterExist = (req,res,next) => {
  try {
    const id = req.params
    const user = fighterService.search(id)
    if (!user) {
      throw new CustomError(404,'Fighter not found')
    }
    next()
  } catch (error) {
    next(error)
  }
}

const updateFighterValid = (req, res, next) => {
  try {
    const isBodyValid = fighterFieldsPutValidator(req.body, FIGHTER_BODY)
    if (!isBodyValid){
      throw new CustomError(400,'Invalid fighter data for updating')
    }
    if(req.body.name){
      const isFighterExist = insensetiveFighterSearch(req.body.name)
      if(isFighterExist) throw new CustomError(400,'Fighter with this name exis in database')
    }
    if(req.body.power){
      const isPowerValid = powerValidator(req.body.power)
      if(!isPowerValid) throw new CustomError(400,'Invalid power data')
    }
    if(req.body.defense){
      const isDefenseValid = defenseValidator(req.body.defense)
      if(!isDefenseValid) throw new CustomError('Invalid defense data')
    }
    if(req.body.health){
      const isHealtValid = healthValidator(req.body.health)
      if(!isHealtValid) throw new CustomError(400, 'Invalid healt number')
    }
    
    next();
  } catch (error) {
    next(error)
  }
};

export { createFighterValid, updateFighterValid };
