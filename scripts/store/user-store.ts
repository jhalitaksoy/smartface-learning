//import { Data } from "@smartface/native"; // bug ***
import Data = require('@smartface/native/global/data');

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