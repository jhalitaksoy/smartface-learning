import Settings_itemDesign from 'generated/my-components/Settings_item';
import Image = require('@smartface/native/ui/image');
import ImageView = require('@smartface/native/ui/imageview');
import View = require('@smartface/native/ui/view');
import Settings_item from 'components/Settings_item';
import Label = require('@smartface/native/ui/label');
import Icon_switch from 'components/Icon_switch';

export default class Settings_item_ThemeSwitch extends Settings_item {

    iconSwitch: Icon_switch

    onThemeChange: (theme: "light" | "dark") => void

    theme: "light" | "dark"

    constructor(theme: "light" | "dark", onThemeChange: (theme: "light" | "dark") => void, props?: any, pageName?: string) {
        super(props, pageName);
        this.theme = theme
        this.onThemeChange = onThemeChange
    }

    onCustomViewCreate(): View {
        const imageLeft = Image.createFromFile("images://sun.png", 30, 30)
        const imageRight = Image.createFromFile("images://moon.png", 30, 30)
        this.iconSwitch = new Icon_switch();
        this.iconSwitch.state = this.theme == "light" ? "left" : "right"
        const _this = this
        this.iconSwitch.onChange = (state) => this.onStateChange(_this, state)
        this.iconSwitch.setLeftIcon(imageLeft)
        this.iconSwitch.setRightIcon(imageRight)
        return this.iconSwitch
    }

    onStateChange(_this: Settings_item_ThemeSwitch, state: "left" | "right") {
        this.fireOnThemeChange(state == "left" ? "light" : "dark")

    }

    fireOnThemeChange(theme: "light" | "dark") {
        if (this.onThemeChange) {
            this.onThemeChange(theme);
        }
    }
}
