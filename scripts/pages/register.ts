import RegisterDesign from 'generated/pages/register';
import { Point2D } from 'sf-core/primitive/point2d';
import setupButtonActivity from 'sf-extension-utils/lib/button-activity';
import { RegisterParameters } from 'models/register-parameters';
import { context } from 'context';

export default class Register extends RegisterDesign {
    router: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.labelGotoLogin.onTouch = (point2d: Point2D) => {
            this.router.dismiss()
        }
        setupButtonActivity(this.buttonRegisterSubmit, this.activityIndicator1, this.onRegisterTab)
    }

    setPageEnability(enability: boolean) {
        this.layout.touchEnabled = enability
        this.labelGotoLogin.touchEnabled = enability
        this.mtbPassword1.touchEnabled = enability
        this.mtbPassword2.touchEnabled = enability
        this.mtbPassword1.materialTextBox.touchEnabled = enability
        this.mtbPassword2.materialTextBox.touchEnabled = enability
        this.labelGotoLogin.touchEnabled = enability
    }

    onRegisterTab = async (showIndicator, hideIndicator) => {
        showIndicator();
        this.setPageEnability(false)

        const password1 = this.mtbPassword1.materialTextBox.text
        const password2 = this.mtbPassword2.materialTextBox.text

        if (password1 != password2) {
            hideIndicator();
            this.setPageEnability(true)
            alert("Passwords does not match!")
            return
        }

        const registerParameters: RegisterParameters = {
            name: this.mtbUserName.materialTextBox.text,
            password: password1,
        }
        try {
            const res = await context.authService.register(registerParameters)
            context.userStore.setUserName(registerParameters.name)
            hideIndicator();
            this.setPageEnability(true)
            this.router.dismiss()
        } catch (error) {
            hideIndicator();
            this.setPageEnability(true)
            if (error.statusCode == 409) {
                alert("Try different user name")
                return
            }
            alert("Unknown Error")
            console.log(error);
        }
        return {}
    }

    initMaterialTextBoxes() {
        this.mtbUserName.options = {
            hint: "Username"
        }

        this.mtbPassword1.options = {
            hint: "Password"
        }
        this.mtbPassword1.materialTextBox.isPassword = true;

        this.mtbPassword2.options = {
            hint: "Password Again"
        }
        this.mtbPassword2.materialTextBox.isPassword = true;
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
    this.initMaterialTextBoxes()
}
