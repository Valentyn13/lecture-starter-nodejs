import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAllFighters() {
    const fighters = fighterRepository.getAll()
    return fighters
  }

  createFighter(data) {
    const fighter = fighterRepository.create(data)
    return fighter
  }

  search(search){
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };
