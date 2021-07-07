import Page1Design from 'generated/pages/page1';
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import PageTitleLayout from "components/PageTitleLayout";
import System from "@smartface/native/device/system";
import { Point2D } from '@smartface/native/primitive/point2d';
import { LoginParameters } from 'models/login-parameters';
import { context } from 'context';
import setupButtonActivity from "@smartface/extension-utils/lib/button-activity";
import HeaderBarItem from '@smartface/native/ui/headerbaritem';

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
    }

    setPageEnability(enability: boolean) {
        this.layout.touchEnabled = enability
        this.mtbUsername.touchEnabled = enability
        this.mtbPassword.touchEnabled = enability
        this.mtbUsername.materialTextBox.touchEnabled = enability
        this.mtbPassword.materialTextBox.touchEnabled = enability
        this.labelForgotPassword.touchEnabled = enability
        this.labelGotoRegister.touchEnabled = enability
    }

    onLoginTab = async (showIndicator, hideIndicator) => {
        showIndicator();
        this.setPageEnability(false)
        const loginParameters: LoginParameters = {
            name: this.mtbUsername.materialTextBox.text,
            password: this.mtbPassword.materialTextBox.text,
        }
        try {
            const res = await context.authService.login(loginParameters)
            const jwtToken = res.body
            context.jwtKeyStore.setJwtKey(jwtToken)
            this.router.push("/pages/home", { message: "Text" })
            context.userStore.setUserName(loginParameters.name)
            hideIndicator();
            this.setPageEnability(true)
        } catch (error) {
            hideIndicator();
            this.setPageEnability(true)
            if (error.statusCode == 409) {
                alert("Login Failed")
                return
            }
            alert("Unknown Error")
            console.log(error);
        }
        return {}
    }

    initMaterialTextBoxes() {
        this.mtbUsername.options = {
            hint: "Username"
        }
        this.mtbPassword.options = {
            hint: "Password"
        }
        this.mtbPassword.materialTextBox.isPassword = true;
    }

    handleUserName() {
        const userName = context.userStore.getUserName()
        if (userName) {
            this.mtbUsername.materialTextBox.text = userName
        }
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
    console.info('Onload page1');
    this.headerBar.leftItemEnabled = false;
    this.headerBar.titleLayout = new PageTitleLayout();
    componentContextPatch(this.headerBar.titleLayout, "titleLayout");
    if (System.OS === "Android") {
        this.headerBar.title = "";
    }
    this.initMaterialTextBoxes()
    this.handleUserName();

    this.myItem = new HeaderBarItem({
        title: "Done",
        android: {
            systemIcon: 17301577   // OR 'ic_dialog_email'
        },
        ios: {
            systemItem: HeaderBarItem.iOS.SystemItem.BOOKMARKS
        },
        onPress: function () {
            console.log("You pressed Done item!");
        }
    });
    this.headerBar.setItems([this.myItem]);
}
