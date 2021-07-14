import Settings_itemDesign from 'generated/my-components/Settings_item';
import Image = require('@smartface/native/ui/image');
import ImageView = require('@smartface/native/ui/imageview');
import View = require('@smartface/native/ui/view');
import Settings_item from 'components/Settings_item';
import Label = require('@smartface/native/ui/label');
import Icon_switch from 'components/Icon_switch';
import Menu = require('@smartface/native/ui/menu');
import MenuItem = require('@smartface/native/ui/menuitem');
import Page = require('@smartface/native/ui/page');
import FlexLayout = require('@smartface/native/ui/flexlayout');
import Color = require('@smartface/native/ui/color');
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import Font = require('@smartface/native/ui/font');

export default class Settings_item_DropDown extends Settings_item {

    page: Page

    label: Label

    myMenu: Menu

    selectedValue: string

    values: Array<string>

    title: string

    onValueChange: (value: string) => void

    constructor(
        page: Page, selectedValue: string, values: Array<string>, title: string,
        onValueChange: (value: string) => void, props?: any, pageName?: string) {
        super(props, pageName);
        this.page = page;
        this.values = values;
        this.title = title;
        this.selectedValue = selectedValue;
        this.onValueChange = onValueChange;
        this.createMenu()
    }

    onCustomViewCreate(): View {
        let titleLayout = new FlexLayout();
        titleLayout.flexDirection = FlexLayout.FlexDirection.ROW
        //titleLayout.backgroundColor = Color.WHITE
        this.label = new Label()
        this.label.onTouch = () => {
            this.myMenu.show(this.page)
        }
        this.label.text = this.selectedValue;
        //@ts-ignore
        titleLayout.addChild(this.label, `labelLang`, ".sf-label .my-label", {
            flexGrow: 1,
        });
        const theme = getCombinedStyle(".my-label")
        this.label.textColor = theme.textColor;
        this.label.font = Font.create("Arial", 18) ;
        this.label.paddingRight = 15;
       return titleLayout
    }

    fireOnValueChange(value: string) {
        if (this.onValueChange) {
            this.onValueChange(value);
        }
    }

    onMenuItemSelected(value: string) {
        this.updatedSelectedValue(value)
        this.fireOnValueChange(value)
    }

    createMenu() {
        this.myMenu = new Menu();
        this.myMenu.headerTitle = this.title;

        const menuItems = this.values.map((value) => {
            return new MenuItem({
                title: value,
                onSelected: () => this.onMenuItemSelected(value)
            });
        })

        this.myMenu.items = menuItems
    }

    /*setModel(settingsItem: SettingsItem) {
        this.settingsItem = settingsItem;
        this.lblTitle.text = this.settingsItem.title
        this.updatedSelectedValue(settingsItem.selectedItem)
        this.createMenu()
    }*/

    updatedSelectedValue(value: string) {
        this.selectedValue = value
        this.label.text = this.selectedValue;
    }
}
