import RegisterDesign from 'generated/pages/register';
import { Point2D } from '@smartface/native/primitive/point2d';
import setupButtonActivity from '@smartface/extension-utils/lib/button-activity';
import { RegisterParameters } from 'models/register-parameters';
import { context } from 'context';
import { modifyMaterialTextBox } from 'core/factory/MaterialTextBoxFactory';
import { createSettingsButton } from 'core/factory/HeaderBarItemFactory';
import Color = require('@smartface/native/ui/color');
import System = require('@smartface/native/device/system');
import HeaderBarItem = require('@smartface/native/ui/headerbaritem');
import Image = require('@smartface/native/ui/image');
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';

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

        this.headerBar.title = lang["register"]
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
        const userName = this.mtbUserName.materialTextBox.text
        const password1 = this.mtbPassword1.materialTextBox.text
        const password2 = this.mtbPassword2.materialTextBox.text

        const registerParameters: RegisterParameters = {
            name: userName,
            password: password1,
        }

        if (!registerParameters.name) {
            this.setErrorMessages(lang["cannotBeEmty"], undefined, undefined)
            return;
        }

        if (!registerParameters.password) {
            this.setErrorMessages(undefined, lang["cannotBeEmty"], undefined)
            return;
        }

        if (!password2) {
            this.setErrorMessages(undefined, undefined, lang["cannotBeEmty"])
            return;
        }

        if (password1 != password2) {
            this.setErrorMessages(undefined, lang["passwordsDoNotMatch"], lang["passwordsDoNotMatch"])
            return
        }

        showIndicator();
        this.setPageEnability(false)

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
                this.setErrorMessages(lang["tryDifferentUserName"], undefined, undefined)
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
        this.mtbPassword2.options = {
            hint: lang["password-repeat"]
        }

        this.mtbPassword1.materialTextBox.isPassword = true;
        this.mtbPassword2.materialTextBox.isPassword = true;

        modifyMaterialTextBox(this.mtbUserName.materialTextBox)
        modifyMaterialTextBox(this.mtbPassword1.materialTextBox)
        modifyMaterialTextBox(this.mtbPassword2.materialTextBox)

        this.mtbUserName.materialTextBox.onTextChanged = () => {
            this.resetErrorMessages()
        }
        this.mtbPassword1.materialTextBox.onTextChanged = () => {
            this.resetErrorMessages()
        }
        this.mtbPassword2.materialTextBox.onTextChanged = () => {
            this.resetErrorMessages()
        }
    }

    resetErrorMessages() {
        this.setErrorMessages(undefined, undefined, undefined)
    }

    setErrorMessages(
        userNameErrorMessage: string,
        password1ErrorMessage: string,
        password2ErrorMessage: string) {
        this.mtbUserName.materialTextBox.errorMessage = userNameErrorMessage
        this.mtbPassword1.materialTextBox.errorMessage = password1ErrorMessage
        this.mtbPassword2.materialTextBox.errorMessage = password2ErrorMessage
    }

    setupHeaderBar() {
        const theme = getCombinedStyle(".my-label")
        console.log(theme);
        //todo use getCombinedStyle
        if (System.OS === "Android") {
            const headerBar = this.headerBar;
            headerBar.setLeftItem(new HeaderBarItem({
                onPress: () => {
                    this.router.dismiss();
                },
                image: Image.createFromFile("images://close.png", 32, 32),
                color : Color.create("#ffffff")
            }));
        }
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
