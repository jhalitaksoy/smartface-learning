import Settings_itemDesign from 'generated/my-components/Settings_item';
import Image = require('@smartface/native/ui/image');
import ImageView = require('@smartface/native/ui/imageview');
import View = require('@smartface/native/ui/view');
import Settings_item from 'components/Settings_item';
import Label = require('@smartface/native/ui/label');

export default class Settings_item_ThemeSwitch extends Settings_item {

    
    constructor(props?: any, pageName?: string) {
        super(props, pageName);
    }

    onCustomViewCreate() : View{
        /*const imageLeft = Image.createFromFile("images://user.png", 30, 30)
        const imageRight = Image.createFromFile("images://user.png", 30, 30)
        const iconSwitch = new IconSwitch(/*imageLeft, imageRight);
        /*return iconSwitch*/
        return undefined
    }
}
