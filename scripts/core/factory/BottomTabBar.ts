import Color = require("@smartface/native/ui/color");
import { context } from "context";
import { getCombinedStyle } from "@smartface/extension-utils/lib/getCombinedStyle";

export function createBottomTabBarParams() {
    return () => {
        const theme = getCombinedStyle(".mybottomtabbar")
        
        const color = Color.create(theme.selectedColor)
        const colorNormal = Color.create(theme.normalColor)
        const colorBg = Color.create(theme.bgColor)
        return ({
            ios: { visible: false },
            itemColor: {
                normal: colorNormal,
                selected: color
            },
            backgroundColor: colorBg
        });
    }
}