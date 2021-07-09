import ProfileDesign from 'generated/pages/profile';
import { context } from 'context';

export default class Profile extends ProfileDesign {
    router: any
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnLogout.onTouch = () => {
            context.jwtKeyStore.deleteJwtKey();
            this.router.push("/pages/page1")
        }
        this.btnLogout.text = lang["logout"]
    }

    setupHeaderBar() {
        this.headerBar.leftItemEnabled = false;
        this.headerBar.title = lang["profile"]
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
    this.setupHeaderBar();
}
