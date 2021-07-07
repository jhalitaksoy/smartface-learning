import Settings_drop_downDesign from 'generated/my-components/Settings_drop_down';
import { Point2D } from '@smartface/native/primitive/point2d';
import Menu from '@smartface/native/ui/menu';
import MenuItem from '@smartface/native/ui/menuitem';
import Page from '@smartface/native/ui/page';
import Settings, { SettingsItem } from 'pages/settings';

export default class Settings_drop_down extends Settings_drop_downDesign {
    pageName?: string | undefined;

    selectedValue: string
    settingsItem: SettingsItem
    myMenu: Menu;

    constructor(page: Page, props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
        this.lblValue.onTouch = (point: Point2D) => {
            this.myMenu.show(page);
        }
    }

    onMenuItemSelected(value: string) {
        this.updatedSelectedValue(value)
        if (this.settingsItem.onSelected) {
            this.settingsItem.onSelected(value)
        }
    }

    createMenu() {
        this.myMenu = new Menu();
        this.myMenu.headerTitle = this.settingsItem.title;

        const menuItems = this.settingsItem.values.map((value) => {
            return new MenuItem({
                title: value,
                onSelected: () => this.onMenuItemSelected(value)
            });
        })

        this.myMenu.items = menuItems
    }

    setModel(settingsItem: SettingsItem) {
        this.settingsItem = settingsItem;
        this.lblTitle.text = this.settingsItem.title
        this.selectedValue = settingsItem.values[0]
        this.updatedSelectedValue(settingsItem.values[0])
        this.createMenu()
    }

    updatedSelectedValue(value: string) {
        this.selectedValue = value;
        this.lblValue.text = this.selectedValue;
    }
}
