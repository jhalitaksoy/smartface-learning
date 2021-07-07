import SettingsDesign from 'generated/pages/settings';
import addChild from "@smartface/contx/lib/smartface/action/addChild";
import Settings_drop_down from 'components/Settings_drop_down';

export type SettingsItem = {
    title: string,
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


    }

    onLanguageChanged(language: string) {
        
    }

    initListView() {
        this.listView1.rowHeight = 50;

        const settingsItems: Array<SettingsItem> = [
            {
                title: "Language",
                values: ["en", "tr"],
                onSelected: this.onLanguageChanged,
            },
            {
                title: "Theme",
                values: ["light", "dark"],
                onSelected: this.onThemeSelected,
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
