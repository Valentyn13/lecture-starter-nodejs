import { USER_BODY } from "../models/user.js";
import { userService } from "../services/userService.js";

const userFieldsNumberValid = (obj,shema) => {
  const userKeys = Object.keys(shema);
  const allKeysExist = userKeys.every((key) => obj.hasOwnProperty(key));
  const noneExtraKeys = Object.keys(obj).every((key) => userKeys.includes(key));

  return allKeysExist && noneExtraKeys;
}

const userFieldsPutValidator = (obj, shema) => {
  const userKeys = Object.keys(shema)
  const noneExtraKeys = Object.keys(obj).every((key) => userKeys.includes(key));
  const atLeastOneKeyExist = userKeys.reduce((acc,curr) =>{
    if (Object.keys(obj).includes(curr)){
      acc.exist = true
    }
    return acc
  },{exist: false})
  return noneExtraKeys && atLeastOneKeyExist.exist
}

const emailValidator = (email) => {
  const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  return gmailRegex.test(email);
}

const phoneValidator = (phone) => {
  const ukrainianPhoneRegex = /^\+380\d{9}$/;
  return ukrainianPhoneRegex.test(phone);
}

const passwordValidator = (password) => {
 return password.trim().length > 3 ? true : false
}

const isUserInDatabase = (email,phone) => {
  const userByPhone = userService.search({'phoneNumber':phone})
  const userByEmail = userService.search({'email':email})
 if (userByPhone || userByEmail) return true
  return false
}

const createUserValid = (req, res, next) => {
  try {
    const userDetail = req.body;
    const isUserExist = isUserInDatabase(userDetail.email, userDetail.phoneNumber)
  
    const fieldsNumberValid = userFieldsNumberValid(userDetail,USER_BODY)
    const isEmailValid = emailValidator(userDetail.email)
    const isPhoneValid = phoneValidator(userDetail.phoneNumber)
    const isPasswordValid = passwordValidator(userDetail.password)

    if (isUserExist){
      throw new Error('User already exist in database')
    } 

    if (
       !fieldsNumberValid ||
       !isEmailValid||
       !isPhoneValid||
       !isPasswordValid) {
        throw new Error('User body validation error')
       }

    next(); 
  } catch (error) {
    next(error.message)
  }

};

export const isUserExist = (req,res,next) => {
  try {
    const id = req.params
    const user = userService.search(id)
    if (!user) {
      throw new Error('User not found')
    }
    next()
  } catch (error) {
    next(error.message)
  }

}

const updateUserValid = (req, res, next) => {
  try {
    const isBodyValid = userFieldsPutValidator(req.body, USER_BODY)
    if (!isBodyValid){
      throw new Error('Invalid body for put request')
    }
    next();
  } catch (error) {
    next(error.message)
  }
};

export { createUserValid, updateUserValid };
