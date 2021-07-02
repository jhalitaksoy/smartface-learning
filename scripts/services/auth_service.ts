import sc, { post } from "./service-call";
import ServiceCall, { IRequestOptions } from "sf-extension-utils/lib/service-call";
import { LoginParameters } from "models/login-parameters";

export interface AuthService {
    login(loginParameters: LoginParameters): any
}

export class AuthServiceImpl implements AuthService {
    async login(loginParameters: LoginParameters){
        const response = post("/login", loginParameters)
        return response
    }
}