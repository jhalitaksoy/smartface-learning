/* globals lang */
import "i18n/i18n"; // Generates global lang object
import Application from "@smartface/native/application";
import { errorStackBySourceMap } from "error-by-sourcemap";
import System from "@smartface/native/device/system";
import "theme";
import "@smartface/extension-utils";
import router from "routes";
import { context } from "context";

// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function (e: UnhandledError) {
    const error = errorStackBySourceMap(e);
    alert({
        title: e.type || lang.applicationError,
        message: System.OS === "Android" ? error.stack : (e.message + "\n\n*" + error.stack)
    });
};

const jwtKey = context.jwtKeyStore.getJwtKey()
if (jwtKey) {
    router.push("/bottom/stackhome/home");
} else {
    router.push("/auth/login");
}

Application.onApplicationCallReceived = e => {
    //@ts-ignore
    if (System.OS === System.OSType.ANDROID && e.url) {
      console.log(e)
    }
};
