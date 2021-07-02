//import { Data } from "sf-core"; // bug ***
import Data = require('sf-core/global/data');

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