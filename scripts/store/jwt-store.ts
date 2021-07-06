//import { Data } from "@smartface/native"; // bug ***
import Data = require('@smartface/native/global/data');

export interface JwtKeyStore {
    getJwtKey(): string
    deleteJwtKey()
    setJwtKey(jwtKey: string)
}

const key  = "jwt_key"

export class JwtKeyStoreImpl implements JwtKeyStore {
    getJwtKey(): string {
        return Data.getStringVariable(key)
    }

    deleteJwtKey() {
        Data.removeVariable(key)
    }

    setJwtKey(jwtKey: string) {
        Data.setStringVariable(key, jwtKey)
    }
}