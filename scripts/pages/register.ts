import RegisterDesign from 'generated/pages/register';
import { Point2D } from '@smartface/native/primitive/point2d';
import setupButtonActivity from '@smartface/extension-utils/lib/button-activity';
import { RegisterParameters } from 'models/register-parameters';
import { context } from 'context';
import { modifyMaterialTextBox } from 'core/factory/MaterialTextBoxFactory';
import { createSettingsButton } from 'core/factory/HeaderBarItemFactory';

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

        this.labelRegisterTittle.text = lang["register"]
        this.buttonRegisterSubmit.text = lang["register"]
        this.labelGotoLogin.text = lang["goto-login"]
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
            alert(lang["passwordsDoNotMatch"])
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
                alert(lang["tryDifferentUserName"])
                return
            }
            alert(lang["applicationError"])
            console.log(error);
        }
        return {}
    }

    initMaterialTextBoxes() {
        this.mtbUserName.options = {
            hint: lang["username"]
        }

        this.mtbPassword1.options = {
            hint: lang["password"]
        }
        this.mtbPassword1.materialTextBox.isPassword = true;

        this.mtbPassword2.options = {
            hint: lang["password-repeat"]
        }
        this.mtbPassword2.materialTextBox.isPassword = true;
        modifyMaterialTextBox(this.mtbUserName.materialTextBox)
        modifyMaterialTextBox(this.mtbPassword1.materialTextBox)
        modifyMaterialTextBox(this.mtbPassword2.materialTextBox)
    }

    setupHeaderBar() {
        const router = this.router;
        this.headerBar.setItems([createSettingsButton(router)])
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
    this.setupHeaderBar()
}
