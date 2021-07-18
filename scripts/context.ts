import { JwtKeyStore, JwtKeyStoreImpl } from "store/jwt-store";
import { AuthServiceImpl, AuthService } from "services/auth_service";
import { UserStore, UserStoreImpl } from "store/user-store";
import { ResourceService, ResourceServiceImpl } from "services/resource-service";
import { SettingsStore, SettingsStoreImpl } from "store/settings";
import { PassengerService, PassengerServiceImpl } from "services/passengers-service";
import { FavoritesStore, FavoritesStoreImpl } from "store/favorite-store";

type Context = {
    jwtKeyStore : JwtKeyStore,
    authService : AuthService,
    resourceService : ResourceService
    passengerService : PassengerService
    userStore : UserStore,
    settingsStore : SettingsStore
    favoritesStore : FavoritesStore
}

export const context : Context = {
    jwtKeyStore : new JwtKeyStoreImpl(),
    authService : new AuthServiceImpl(),
    userStore : new UserStoreImpl(),
    resourceService : new ResourceServiceImpl(),
    passengerService : new PassengerServiceImpl(),
    settingsStore : new SettingsStoreImpl(),
    favoritesStore : new FavoritesStoreImpl(),
}