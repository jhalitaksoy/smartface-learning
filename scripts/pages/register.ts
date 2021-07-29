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
import MaterialTextBox = require('@smartface/native/ui/materialtextbox');
import { LoginHelper } from 'core/helper/login-helper';


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

    checkRegisterParametersIsValid(registerParameters: RegisterParameters, password2 : string): boolean {
        this.resetTextBoxErrorMessages();

        const validResultUserName = LoginHelper.checkUserNameIsValid(registerParameters.name);
        if (!validResultUserName.valid) {
            this.setUserNameTextBoxErrorMessage(validResultUserName.inValidMessage);
            return false;
        }

        const validResultPassword1 = LoginHelper.checkPasswordIsValid(registerParameters.password);
        if (!validResultPassword1.valid) {
            this.setPassword1TextBoxErrorMessage(validResultPassword1.inValidMessage);
            return false;
        }

        const validResultPassword2 = LoginHelper.checkPasswordIsValid(password2);
        if (!validResultPassword2.valid) {
            this.setPassword1TextBoxErrorMessage(validResultPassword2.inValidMessage);
            return false;
        }

        if (registerParameters.password != password2) {
            this.setPassword1TextBoxErrorMessage(lang["passwordsDoNotMatch"] )
            this.setPassword2TextBoxErrorMessage(lang["passwordsDoNotMatch"] )
            return
        }

        return true;
    }

    onRegisterTab = async (showIndicator, hideIndicator) => {
        const userName = this.mtbUserName.materialTextBox.text
        const password1 = this.mtbPassword1.materialTextBox.text
        const password2 = this.mtbPassword2.materialTextBox.text

        const registerParameters: RegisterParameters = {
            name: userName,
            password: password1,
        }

        if (!this.checkRegisterParametersIsValid(registerParameters, password2)) return;

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
                this.setUserNameTextBoxErrorMessage(lang["tryDifferentUserName"]);
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
            this.resetTextBoxErrorMessages()
        }
        this.mtbPassword1.materialTextBox.onTextChanged = () => {
            this.resetTextBoxErrorMessages()
        }
        this.mtbPassword2.materialTextBox.onTextChanged = () => {
            this.resetTextBoxErrorMessages()
        }
    }

    resetTextBoxErrorMessages() {
        this.setUserNameTextBoxErrorMessage(undefined)
        this.setPassword1TextBoxErrorMessage(undefined)
        this.setPassword2TextBoxErrorMessage(undefined)
    }

    setUserNameTextBoxErrorMessage(errorMessage: string) {
        this.setTextBoxErrorMessage(this.mtbUserName.materialTextBox, errorMessage);
    }

    setPassword1TextBoxErrorMessage(errorMessage: string) {
        this.setTextBoxErrorMessage(this.mtbPassword1.materialTextBox, errorMessage);
    }

    setPassword2TextBoxErrorMessage(errorMessage: string) {
        this.setTextBoxErrorMessage(this.mtbPassword2.materialTextBox, errorMessage);
    }

    setTextBoxErrorMessage(materialTextBox: MaterialTextBox, errorMessage: string) {
        materialTextBox.errorMessage = errorMessage;
    }

    setupHeaderBar() {
        const theme = getCombinedStyle(".my-label")
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
