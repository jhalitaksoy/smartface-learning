import Color = require("@smartface/native/ui/color");
import { context } from "context";

export function createBottomTabBarParams() {
    const colorText = context.settingsStore.getTheme() == "dark" ? "#ffffff" : "#5EA35D"
    const color = Color.create(colorText)

    const colorNormalText = context.settingsStore.getTheme() == "dark" ? "#736e63" : "#000000"
    const colorNormal = Color.create("#736e63")

    const colorBgText = context.settingsStore.getTheme() == "dark" ? "#473029" : "#ffffff"
    const colorBg = Color.create(colorBgText)
    return () => ({
        ios: { visible: false },
        itemColor: {
            normal: colorNormal,
            selected: color
        },
        backgroundColor: colorBg
    })
}