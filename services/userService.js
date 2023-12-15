import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  createUser(data) {
    const user = userRepository.create(data)
    return user
  }

  getAllUsers() {
    const users = userRepository.getAll()
    return users
  }

  deleteUser(id){
    const deletedUser = userRepository.delete(id)
    return deletedUser
  }


  updateUser(id, dataToUpdate){
    const patchedUser = userRepository.update(id,dataToUpdate)
    return patchedUser
  }
}

const userService = new UserService();

export { userService };
