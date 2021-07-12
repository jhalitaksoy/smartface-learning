import Page1Design from 'generated/pages/page1';
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import PageTitleLayout from "components/PageTitleLayout";
import System from "@smartface/native/device/system";
import { Point2D } from '@smartface/native/primitive/point2d';
import { LoginParameters } from 'models/login-parameters';
import { context } from 'context';
import setupButtonActivity from "@smartface/extension-utils/lib/button-activity";
import HeaderBarItem from '@smartface/native/ui/headerbaritem';
import { modifyMaterialTextBox } from 'core/factory/MaterialTextBoxFactory';
import Color from '@smartface/native/ui/color';
import TextBox from '@smartface/native/ui/textbox';
import { createSettingsButton } from 'core/factory/HeaderBarItemFactory';

export default class Page1 extends Page1Design {
    router: any;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        //this.button1.onPress = () => {
        //    this.router.push("/pages/page2", { message: "Hello World!" });
        //}
        this.labelForgotPassword.onTouch = (point2d: Point2D) => {
            this.router.push("/pages/page2", { message: "Text" })
        }

        this.labelGotoRegister.onTouch = (point2d: Point2D) => {
            this.router.push("/pages/auth/register")
        }

        setupButtonActivity(this.buttonLogin, this.activityIndicator1, this.onLoginTab);

        this.lblTitle.text = lang["login"]
        this.labelForgotPassword.text = lang["password-forget"]
        this.labelGotoRegister.text = lang["goto-register"]
        this.buttonLogin.text = lang["login"]
    }

    setPageEnable(enable: boolean) {
        this.layout.touchEnabled = enable
        this.mtbUsername.touchEnabled = enable
        this.mtbPassword.touchEnabled = enable
        this.mtbUsername.materialTextBox.touchEnabled = enable
        this.mtbPassword.materialTextBox.touchEnabled = enable
        this.labelForgotPassword.touchEnabled = enable
        this.labelGotoRegister.touchEnabled = enable
    }

    onLoginTab = async (showIndicator, hideIndicator) => {
        const loginParameters: LoginParameters = {
            name: this.mtbUsername.materialTextBox.text,
            password: this.mtbPassword.materialTextBox.text,
        }
        if(!loginParameters.name){
            this.setErrorMessages(lang["cannotBeEmty"], undefined)
            return;
        }

          if(!loginParameters.password){
            this.setErrorMessages(undefined, lang["cannotBeEmty"])
            return;
        }

        showIndicator();
        this.setPageEnable(false)
        try {
            const res = await context.authService.login(loginParameters)
            const jwtToken = res.body
            context.jwtKeyStore.setJwtKey(jwtToken)
            this.router.push("/pages/home/home", { message: "Text" })
            context.userStore.setUserName(loginParameters.name)
            hideIndicator();
            this.setPageEnable(true)
        } catch (error) {
            hideIndicator();
            this.setPageEnable(true)
            if (error.statusCode == 409) {
                this.setErrorMessages(lang["loginFailed"], lang["loginFailed"])
                return
            }
            alert(lang["applicationError"])
            console.log(error);
        }
        return {}
    }

    initMaterialTextBoxes() {
        this.mtbUsername.options = {
            hint: lang["username"],
        }
        this.mtbPassword.options = {
            hint: lang["password"],
        }
        this.mtbPassword.materialTextBox.isPassword = true;

        modifyMaterialTextBox(this.mtbUsername.materialTextBox)
        modifyMaterialTextBox(this.mtbPassword.materialTextBox)

        this.mtbUsername.materialTextBox.onTextChanged = () => {
            this.resetErrorMessages()
        }
        this.mtbPassword.materialTextBox.onTextChanged = () => {
            this.resetErrorMessages()
        }
    }

    resetErrorMessages() {
        this.setErrorMessages(undefined, undefined)
    }

    setErrorMessages(
        userNameErrorMessage: string,
        passwordErrorMessage: string) {
        this.mtbUsername.materialTextBox.errorMessage = userNameErrorMessage
        this.mtbPassword.materialTextBox.errorMessage = passwordErrorMessage
    }

    handleUserName() {
        const userName = context.userStore.getUserName()
        if (userName) {
            this.mtbUsername.materialTextBox.text = userName
        }
    }

    setupHeaderBar() {
        //const router = this.router;
        //this.headerBar.setItems([createSettingsButton(router)])
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 */
function onShow(superOnShow: () => void) {
    superOnShow();
    this.headerBar.titleLayout.applyLayout();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.headerBar.leftItemEnabled = false;
    this.headerBar.titleLayout = new PageTitleLayout();
    componentContextPatch(this.headerBar.titleLayout, "titleLayout");
    if (System.OS === "Android") {
        this.headerBar.title = "";
    }
    this.initMaterialTextBoxes()
    this.handleUserName();
    this.setupHeaderBar();

}
