import { JwtKeyStore, JwtKeyStoreImpl } from "store/jwt-store";
import { AuthServiceImpl, AuthService } from "services/auth_service";
import { UserStore, UserStoreImpl } from "store/user-store";

type Context = {
    jwtKeyStore : JwtKeyStore,
    authService : AuthService,
    userStore : UserStore
}

export const context : Context = {
    jwtKeyStore : new JwtKeyStoreImpl(),
    authService : new AuthServiceImpl(),
    userStore : new UserStoreImpl(),
}