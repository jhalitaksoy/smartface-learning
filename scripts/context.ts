import { JwtKeyStore, JwtKeyStoreImpl } from "store/jwt-store";
import { AuthServiceImpl, AuthService } from "services/auth_service";

type Context = {
    jwtKeyStore : JwtKeyStore,
    authService : AuthService,
}

export const context : Context = {
    jwtKeyStore : new JwtKeyStoreImpl(),
    authService : new AuthServiceImpl()
}