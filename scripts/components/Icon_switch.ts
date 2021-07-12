import Icon_switchDesign from 'generated/my-components/Icon_switch';
import Image = require('@smartface/native/ui/image');
import Color = require('@smartface/native/ui/color');

export default class Icon_switch extends Icon_switchDesign {
    pageName?: string | undefined;
    state : "left" | "right"

    onChange : (state : "left" | "right") => void

	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
        this.pageName = pageName;
        this.state = "left";
        this.updateUI();
        this.imageViewLeft.onTouch = ()=>{
            this.switchState();
            this.updateUI();
        }
        this.imageViewRight.onTouch = ()=>{
            this.switchState();
            this.updateUI();
        }
    }
    
    setLeftIcon(icon : Image){
        this.imageViewLeft.image = icon
    }

    setRightIcon(icon : Image){
        this.imageViewRight.image = icon
    }

    updateUI(){
        if(this.state == "left"){
            this.imageViewLeft.backgroundColor = Color.BLACK
            this.imageViewLeft.tintColor = Color.WHITE

            this.imageViewRight.backgroundColor = Color.WHITE
            this.imageViewRight.tintColor = Color.BLACK
        }else{
            this.imageViewLeft.backgroundColor = Color.WHITE
            this.imageViewLeft.tintColor = Color.BLACK

            this.imageViewRight.backgroundColor = Color.BLACK
            this.imageViewRight.tintColor = Color.WHITE
        }
    }

    switchState(){
        if(this.state == "left"){
            this.state = "right"
        }else{
            this.state = "left"
        }
        if(this.onChange){
            this.onChange(this.state)
        }
    }
}
