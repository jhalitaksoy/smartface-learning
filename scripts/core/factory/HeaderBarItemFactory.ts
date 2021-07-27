import HeaderBarItem = require("@smartface/native/ui/headerbaritem");
import Image = require("@smartface/native/ui/image");

export function createSettingsButton(router: any): HeaderBarItem {
    const myItem = new HeaderBarItem({
        android: {
            systemIcon: 17301577   // OR 'ic_dialog_email'
        },
        ios: {
            systemItem: HeaderBarItem.iOS.SystemItem.BOOKMARKS
        },
        onPress: function () {
            router.push("/pages/modal/settings")
        }
    });
    return myItem
}

export function createBackButton(router: any): HeaderBarItem {
    const myItem = new HeaderBarItem({
        onPress: () => {
            router.goBack();
        },
        image: Image.createFromFile("images://arrow_back.png")
    })
    return myItem
}