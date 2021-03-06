import Data from "@smartface/native/global/data";
import Application from "@smartface/native/application";
import { config } from "settings.json";
import { clearCache, getCombinedStyle } from "@smartface/extension-utils/lib/getCombinedStyle";
import { createThemeContextBound } from "@smartface/contx/lib/styling/ThemeContext";
import { context } from "context";
import Color from "@smartface/native/ui/color";

const themeConfig = config.theme;
const theme =  context.settingsStore.getTheme() == "dark" ?  "darkTheme" : "myTheme" 
const currentTheme = theme || themeConfig.currentTheme;
const themeSources = themeConfig.themes
    .map(name => ({
        name,
        rawStyles: require(`./generated/themes/${name}`),
        isDefault: currentTheme === name
    }));
Application["theme"] = createThemeContextBound(themeSources);
type ThemeListener = (themeName: string) => void;

const themeListeners = new WeakMap<{}, ThemeListener>();
const themeListenerKeys:{}[] = [];
export const ThemeService = {
    onChange(listener: ThemeListener) {
        
        const key = {};
        themeListenerKeys.push(key)
        themeListeners.set(key, listener);
        const deletionIndex = themeListenerKeys.length - 1;
        //const { backgroundColor, itemColor } = getCombinedStyle(".tabs");
        //bottomTabBarRouter._renderer._rootController.tabBar.backgroundColor = Color.WHITE;
         //@ts-ignore 
        //bottomTabBarRouter._renderer._rootController.tabBar.itemColor = itemColor;
        return () => {
            if(themeListeners.has(key)){
                themeListeners.delete(key);
                themeListenerKeys.splice(deletionIndex, 1);
            }
        }
    },
    changeTheme(name: string) {
        Application["theme"]()({
            type: "changeTheme",
            theme: name
        });
        clearCache();
        themeListenerKeys.forEach((key) => {
            if(themeListeners.has(key)){
                themeListeners.get(key)(name);
            }
        })
    }
}
