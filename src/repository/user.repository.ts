import User from "../model/user.model";
import { BaseRepository } from "./base/base.repository";

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}
