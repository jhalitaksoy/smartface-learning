//import { Data } from "@smartface/native"; // bug ***
import Data from '@smartface/native/global/data';

type OnLanguageChangeCallback = (value : string | undefined) => any

export interface SettingsStore {
    getLanguage(): string
    deleteLanguage()
    setLanguage(language: string)
    listenLanguageChange(onChange : OnLanguageChangeCallback)
    getTheme() : string
    deleteTheme()
    setTheme(theme: string)
}

const keyLanguage  = "settings_language"
const keyTheme  = "settings_theme"

export class SettingsStoreImpl implements SettingsStore {
    
    onLanguageChange : OnLanguageChangeCallback

    listenLanguageChange(onChange: OnLanguageChangeCallback) {
        this.onLanguageChange = onChange
    }

    fireOnLanguageChange(language: string){
        if(this.onLanguageChange){
            this.onLanguageChange(language)
        }
    }

    getLanguage() : string {
        return Data.getStringVariable(keyLanguage)
    }

    deleteLanguage() {
        Data.removeVariable(keyLanguage)
        this.fireOnLanguageChange(undefined)
    }

    setLanguage(language: string) {
         Data.setStringVariable(keyLanguage, language)
         this.fireOnLanguageChange(language)
    }

    getTheme() : string {
        return Data.getStringVariable(keyTheme)
    }

    deleteTheme() {
        Data.removeVariable(keyTheme)
    }

    setTheme(theme: string) {
         Data.setStringVariable(keyTheme, theme)
    }
}