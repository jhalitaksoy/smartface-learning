import ListViewItem1Design from 'generated/my-components/ListViewItem1';
import Color = require('@smartface/native/ui/color');

export default class ListViewItem1 extends ListViewItem1Design {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    
    setTitle(title : string){
        this.title.text = title
    }

    setSubTitle(subTitle : string){
        this.subTitle.text = subTitle
    }

    setColor(color : string){
        this.title.textColor = Color.create(color)
        this.subTitle.textColor = Color.create(color)
    }
    
    static getHeight(): number {
        return 50; // Normally getCombinedStyle should be used
    }
}
