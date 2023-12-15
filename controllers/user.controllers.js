import { userService } from "../services/userService.js"

export const signUpController = (req, res, next) => {
    const newUser = userService.createUser(req.body)
    res.locals.queryResult = newUser
    next()
}