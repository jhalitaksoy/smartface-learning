import sc, { post } from "./service-call";
import ServiceCall, { IRequestOptions } from "sf-extension-utils/lib/service-call";
import { LoginParameters } from "models/login-parameters";

export const login = async (loginParameters : LoginParameters) => {
    const response = post("/login", loginParameters)
    return response
}