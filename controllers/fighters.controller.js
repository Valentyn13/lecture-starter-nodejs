import { fighterService } from "../services/fighterService.js"

export const getAllFightersController = (req, res, next) => {
    const fighters = fighterService.getAllFighters()
    console.log(fighters)
    res.locals.queryResult = fighters
    next()
}