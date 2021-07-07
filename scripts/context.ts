import { JwtKeyStore, JwtKeyStoreImpl } from "store/jwt-store";
import { AuthServiceImpl, AuthService } from "services/auth_service";
import { UserStore, UserStoreImpl } from "store/user-store";
import { ResourceService, ResourceServiceImpl } from "services/resource-service";
import { SettingsStore, SettingsStoreImpl } from "store/settings";

type Context = {
    jwtKeyStore : JwtKeyStore,
    authService : AuthService,
    resourceService : ResourceService
    userStore : UserStore,
    settingsStore : SettingsStore
}

export const context : Context = {
    jwtKeyStore : new JwtKeyStoreImpl(),
    authService : new AuthServiceImpl(),
    userStore : new UserStoreImpl(),
    resourceService : new ResourceServiceImpl(),
    settingsStore : new SettingsStoreImpl(),
}