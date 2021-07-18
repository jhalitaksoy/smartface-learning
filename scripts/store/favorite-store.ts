import Data = require('@smartface/native/global/data');

export interface FavoritesStore {
    getFavorites(): Array<string>
    addFavorite(id: string)
    deleteFavorite(id: string)
    deleteAllFavorites()
}

const key = "favorites_key"

export class FavoritesStoreImpl implements FavoritesStore {
    favoritesCache : Array<string>

    resetCache(){
        this.favoritesCache = undefined
    }

    getFavorites(): Array<string> {
        if(!this.favoritesCache){
            this.favoritesCache = convertStrToFavorites(Data.getStringVariable(key));
        }
        return this.favoritesCache
    }

    addFavorite(id: string) {
        this.deleteFavorite(id)
        const favorites = this.getFavorites()
        favorites.push(id)
        this.updateFavorites(favorites)
    }

    deleteFavorite(id: string) {
        const favorites = this.getFavorites()
        const newFavorites = favorites.filter((value: string) => value !== id)
        this.updateFavorites(newFavorites)
    }

    deleteAllFavorites() {
        this.updateFavorites([])
    }

    updateFavorites(favorites: Array<string>) {
        const str = convertFavoritesToStr(favorites)
        Data.setStringVariable(key, str)
        this.resetCache()
    }
}

function convertFavoritesToStr(favorites: Array<string>): string {
    if(!favorites) return ""

    let str = "";
    favorites.forEach((value: string, index: number) => {
        str += value + ","
    })
    return str
}

function convertStrToFavorites(str: string): Array<string> {
    if (!str) return new Array<string>()

    let favorites = new Array<string>()
    str.split(",").forEach((value: string, index: number) => {
        if (value) {
            favorites.push(value)
        }
    })
    return favorites
}