import MaterialTextBox = require("@smartface/native/ui/materialtextbox");
import { context } from "context";
import Color = require("@smartface/native/ui/color");

export function modifyMaterialTextBox(materialTextBox: MaterialTextBox) {
    const colorText = context.settingsStore.getTheme() == "dark" ? "#ffffff" : "#000000"
    const color = Color.create(colorText)
    materialTextBox.textColor = color
    materialTextBox.cursorColor = color
    materialTextBox.hintTextColor = color
    materialTextBox.lineColor = {
        normal: color,
        selected: color
    }
}