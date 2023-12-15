import { fighterService } from "../services/fighterService.js"

export const getAllFightersController = (req, res, next) => {
    const fighters = fighterService.getAllFighters()
    res.locals.queryResult = fighters
    next()
}


export const createFighterController = (req, res, next) => {
    const fighterDetails = req.body
    const fighter = fighterService.createFighter(fighterDetails)
    res.locals.queryResult = fighter
    next()
}