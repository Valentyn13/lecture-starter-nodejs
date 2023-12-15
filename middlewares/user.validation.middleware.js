import { USER_BODY } from "../models/user.js";
import { userService } from "../services/userService.js";

const userFieldsNumberValid = (obj,shema) => {
  const userKeys = Object.keys(shema);
  const allKeysExist = userKeys.every((key) => obj.hasOwnProperty(key));
  const noneExtraKeys = Object.keys(obj).every((key) => userKeys.includes(key));

  return allKeysExist && noneExtraKeys;
}

const emailValidator = (email) => {
  const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  return gmailRegex.test(email);
}

const phoneValidator = (phone) => {
  const ukrainianPhoneRegex = /^\+380\d{9}$/;
  return ukrainianPhoneRegex.test(phoneNumber);
}

const passwordValidator = (password) => {
 return password.trim().length > 3 ? true : false
}


const isUserInDatabase =  async (email,phone) => {
  const userByPhone = userService.search(phone)
  const userByEmail = userService.search(email)

  if (userByPhone || userByEmail) return true
  return false
}

const createUserValid = (req, res, next) => {
  const userDetail = req.body;

  const isUserExist = isUserInDatabase(userDetail.email, userDetail.phone)

  const fieldsNumberValid = userFieldsNumberValid(userDetail,USER_BODY)
  const isEmailValid = emailValidator(userDetail.email)
  const isPhoneValid = phoneValidator(userDetail.phone)
  const isPasswordValid = passwordValidator(userDetail.password)

  
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  next();
};

export { createUserValid, updateUserValid };
