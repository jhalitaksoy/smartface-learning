//import { Data } from "sf-core"; // bug ***
import Data = require('sf-core/global/data');

export interface UserStore {
    getUserName(): string
    deleteUserName()
    setUserName(userName: string)
}

const key  = "user_name_key"

export class UserStoreImpl implements UserStore {
    getUserName(): string {
        return Data.getStringVariable(key)
    }

    deleteUserName() {
        Data.removeVariable(key)
    }

    setUserName(userName: string) {
        Data.setStringVariable(key, userName)
    }
}