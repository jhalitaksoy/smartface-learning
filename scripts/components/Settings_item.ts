import Settings_itemDesign from 'generated/my-components/Settings_item';
import Image = require('@smartface/native/ui/image');
import ImageView = require('@smartface/native/ui/imageview');
import View = require('@smartface/native/ui/view');
import Color = require('@smartface/native/ui/color');

export default class Settings_item extends Settings_itemDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }

    setIcon(image: Image) {
        this.imageView1.image = image;
    }

    setTitle(title: string) {
        this.labelTitle.text = title;
    }

    onCustomViewCreate(): View {
        return undefined;
    }

    fireOnCustomViewCreate() {
        const view = this.onCustomViewCreate();
        if (view) {
            this.flexLayout1.addChild(view, "iconSwitch2", ".sf-flexLayout")
        }else{
            
            //this.flexLayout1.removeChild();
        }
    }
}
