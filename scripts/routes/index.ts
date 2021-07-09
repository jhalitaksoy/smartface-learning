import buildExtender from "@smartface/extension-utils/lib/router/buildExtender";
import {
    NativeRouter as Router,
    NativeStackRouter as StackRouter,
    Route
} from "@smartface/router";
import BottomTabBarRouter from "@smartface/router/src/native/BottomTabBarRouter";
import * as Pages from 'pages';
import "@smartface/extension-utils/lib/router/goBack"; // Implements onBackButtonPressed
import Color = require("@smartface/native/ui/color");
import Image = require("@smartface/native/ui/image");
import { createBottomTabBarParams } from "core/factory/BottomTabBar";

const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/page1",
                    build: buildExtender({
                        getPageClass: () => Pages.Page1,
                        headerBarStyle: { visible: true }
                    })
                }),
                Route.of({
                    path: "/pages/page2",
                    build: buildExtender({
                        getPageClass: () => Pages.Page2,
                        headerBarStyle: { visible: true }
                    })
                }),
                BottomTabBarRouter.of({
                    path: "/pages/home",
                    to: "/pages/home/home",
                    tabbarParams: createBottomTabBarParams(),
                    items: () => [
                        { title: "Home", icon: Image.createFromFile("images://home.png")},
                        { title: "Profile", icon: Image.createFromFile("images://user.png") },
                        { title: "Settings", icon: Image.createFromFile("images://settings.png") }],
                    // tab1
                    routes: [
                        Route.of({
                            path: "/pages/home/home",
                            build: buildExtender({
                                getPageClass: () => Pages.Home,
                                headerBarStyle: { visible: true }
                            })
                        }),
                        Route.of({
                            path: "/pages/home/profile",
                            build: buildExtender({
                                getPageClass: () => Pages.Profile,
                                headerBarStyle: { visible: true }
                            })
                        }),
                        Route.of({
                            path: "/pages/home/settings",
                            build: buildExtender({
                                getPageClass: () => Pages.Settings,
                                headerBarStyle: { visible: true }
                            })
                        }),
                    ]
                }),
                StackRouter.of({
                    path: "/pages/auth",
                    to: "/pages/auth/register",
                    modal: true, // This is essential
                    routes: [
                        Route.of({
                            path: "/pages/auth/register",
                            build: buildExtender({
                                getPageClass: () => Pages.Register,
                                headerBarStyle: { visible: false }
                            })
                        })
                    ]
                }),
                /*StackRouter.of({
                    path: "/pages/modal",
                    to: "/pages/modal/settings",
                    modal: true, // This is essential
                    routes: [
                        Route.of({
                            path: "/pages/modal/settings",
                            build: buildExtender({
                                getPageClass: () => Pages.Settings,
                                headerBarStyle: { visible: false }
                            })
                        })
                    ]
                })*/
            ]
        })
    ]
});

export default router;
