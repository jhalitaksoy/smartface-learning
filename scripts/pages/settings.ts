import SettingsDesign from 'generated/pages/settings';
import addChild from "@smartface/contx/lib/smartface/action/addChild";
import Settings_drop_down from 'components/Settings_drop_down';
import { switchLanguage } from 'i18n/i18n';
import { context } from 'context';

export type SettingsItem = {
    title: string,
    selectedItem : string,
    values: Array<string>
    onSelected?: (value: string) => void
}

export default class Settings extends SettingsDesign {
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    onThemeSelected(theme: string) {
        context.settingsStore.setTheme(theme)
    }

    onLanguageChanged(language: string) {
        context.settingsStore.setLanguage(language)
    }

    initListView() {
        this.listView1.rowHeight = 50;

        const settingsItems: Array<SettingsItem> = [
            {
                title: lang["language"],
                values: ["en", "tr"],
                onSelected: this.onLanguageChanged,
                selectedItem : context.settingsStore.getLanguage() || "en",
            },
            {
                title: lang["theme"],
                values: ["light", "dark"],
                onSelected: this.onThemeSelected,
                selectedItem : context.settingsStore.getTheme() || "light",
            },
        ]

        this.listView1.itemCount = settingsItems.length;
        var itemIndex = -1;
        this.listView1.onRowCreate = () => {
            itemIndex++;
            const settingsItem = settingsItems[itemIndex]
            return this.createDropDown(itemIndex, settingsItem)
        }
    }

    createDropDown(itemIndex: number, settingsItem: SettingsItem) {
        var myListViewItem = new Settings_drop_down(this);
        myListViewItem.setModel(settingsItem)
        this.dispatch(addChild(`item${++itemIndex}`, myListViewItem));
        return myListViewItem
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
}
