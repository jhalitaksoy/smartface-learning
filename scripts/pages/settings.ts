import SettingsDesign from 'generated/pages/settings';
import addChild from "@smartface/contx/lib/smartface/action/addChild";
import { context } from 'context';
import { ThemeService } from 'theme';
import Image = require('@smartface/native/ui/image');
import Settings_item from 'components/Settings_item';
import Settings_item_ThemeSwitch from 'components/settings_items/SettingsItemThemeSwitch';
import { clearCache } from '@smartface/extension-utils/lib/getCombinedStyle';
import Settings_item_DropDown from 'components/settings_items/Settings_item_DropDown';

export type SettingsItem = {
    icon: Image,
    title: string,
    view: Settings_item
}

export default class Settings extends SettingsDesign {
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    onThemeSelected(theme: "light" | "dark") {
        context.settingsStore.setTheme(theme)
        const nextTheme = theme == "light" ? "myTheme" : "darkTheme"
        clearCache()
        ThemeService.changeTheme(nextTheme);
        //Application.restart()
    }

    onLanguageChanged(language: string) {
        context.settingsStore.setLanguage(language)
    }

    getTheme() : "light" | "dark"{
        const themeStr = context.settingsStore.getTheme()
        return themeStr == "dark" ? "dark" : "light"
    }

    initListView() {
        this.listView1.rowHeight = 50;

        const settingsItems: Array<SettingsItem> = [
            {
                icon: Image.createFromFile("images://language.png", 40, 40),
                title: lang["language"],
                view: new Settings_item_DropDown(
                    this, context.settingsStore.getLanguage() || "en", ["en", "tr"], lang["language"], this.onLanguageChanged)
                /*values: ["en", "tr"],
                onSelected: this.onLanguageChanged,
                selectedItem: context.settingsStore.getLanguage() || "en",*/
            },
            {
                icon: Image.createFromFile("images://darkMode.png"/*, 40, 40*/),
                title: lang["theme"],
                view: new Settings_item_ThemeSwitch(this.getTheme(), this.onThemeSelected, this)
            },
        ]

        this.listView1.height = settingsItems.length * this.listView1.rowHeight + 10
        this.listView1.itemCount = settingsItems.length;
        var itemIndex = -1;
        this.listView1.onRowCreate = () => {
            itemIndex++;
            const settingsItem = settingsItems[itemIndex]
            this.dispatch(addChild(`item${itemIndex}`, settingsItem.view));
            return settingsItem.view
        }

        this.listView1.onRowBind = (item : Settings_item, index : number) => {
            const model = settingsItems[index]
            item.setIcon(model.icon)
            item.setTitle(model.title)
            item.fireOnCustomViewCreate()
        }
    }

    setupHeaderBar() {
        this.headerBar.leftItemEnabled = false;
        this.headerBar.title = lang["settings"]
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initListView();
    this.setupHeaderBar();
}
