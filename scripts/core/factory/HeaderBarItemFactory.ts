import HeaderBarItem = require("@smartface/native/ui/headerbaritem");

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