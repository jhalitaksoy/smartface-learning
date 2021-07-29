export const userNameMinSize = 5
export const passwordMinSize = 4

type ValidResult = { valid: boolean, inValidMessage: string }

function createValidResult(valid: boolean, inValidMessage : string): ValidResult {
    return { valid : valid, inValidMessage : inValidMessage }
}

export class LoginHelper {
    static checkUserNameIsValid(userName: string): ValidResult {
        if (!userName) {
            return createValidResult(false, lang["cannotBeEmty"])
        }
        if (userName.length < userNameMinSize) {
            return createValidResult(false, lang["userNameTooShort"])
        }
        return createValidResult(true, "")
    }

    static checkPasswordIsValid(password: string): ValidResult {
        if (!password) {
            return createValidResult(false, lang["cannotBeEmty"])
        }
        if (password.length < passwordMinSize) {
            return createValidResult(false, lang["passwordTooShort"])
        }
        return createValidResult(true, "")
    }
}