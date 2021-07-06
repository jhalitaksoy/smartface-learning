import sc, { post } from "./service-call";
import ServiceCall, { IRequestOptions } from "@smartface/extension-utils/lib/service-call";
import { LoginParameters } from "models/login-parameters";
import { RegisterParameters } from "models/register-parameters";

export interface AuthService {
    login(loginParameters: LoginParameters): any
    register(registerParameters: RegisterParameters): any
}

export class AuthServiceImpl implements AuthService {
    async login(loginParameters: LoginParameters) {
        const response = post("/login", loginParameters)
        return response
    }

    async register(registerParameters: RegisterParameters) {
        const response = post("/register", registerParameters)
        return response
    }
}