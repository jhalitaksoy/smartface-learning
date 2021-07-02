import Page1Design from 'generated/pages/page1';
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import PageTitleLayout from "components/PageTitleLayout";
import System from "sf-core/device/system";
import { Point2D } from 'sf-core/primitive/point2d';
import { LoginParameters } from 'models/login-parameters';
import { context } from 'context';

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
        this.buttonLogin.onPress = async () => {
            const loginParameters: LoginParameters = {
                name: this.mtbUsername.materialTextBox.text,
                password: this.mtbPassword.materialTextBox.text,
            }
            try {
                const res = await context.authService.login(loginParameters)
                const jwtToken = res.body
                context.jwtKeyStore.setJwtKey(jwtToken)
                console.log(jwtToken);
                this.router.push("/pages/home", { message: "Text" })
            } catch (error) {
                if (error.statusCode == 409) {
                    alert("Login Failed")
                    return
                }
                alert("Unknown Error")
                console.log(error);
            }
        }
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
}
