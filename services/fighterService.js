import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAllFighters () {
    const fighters = fighterRepository.getAll()
    return fighters
  }
}

const fighterService = new FighterService();

export { fighterService };
