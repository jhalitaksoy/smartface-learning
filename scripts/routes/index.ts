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
            path: "/auth",
            routes: [
                Route.of({
                    path: "/auth/login",
                    build: buildExtender({
                        getPageClass: () => Pages.Page1,
                        headerBarStyle: { visible: true }
                    })
                }),
                Route.of({
                    path: "/auth/forget_password",
                    build: buildExtender({
                        getPageClass: () => Pages.Page2,
                        headerBarStyle: { visible: true }
                    })
                }),
                StackRouter.of({
                    path: "/auth/stackmodel",
                    to: "/auth/stackmodel/register",
                    modal: true, // This is essential
                    routes: [
                        Route.of({
                            path: "/auth/stackmodel/register",
                            build: buildExtender({
                                getPageClass: () => Pages.Register,
                                headerBarStyle: { visible: true }
                            })
                        })
                    ]
                })
            ]
        }),

        BottomTabBarRouter.of({
            path: "/bottom",
            to: "/bottom/stackhome/home",
            tabbarParams: createBottomTabBarParams(),
            items: () => [
                { title: "Home", icon: Image.createFromFile("images://home.png") },
                { title: "Profile", icon: Image.createFromFile("images://user.png") },
                { title: "Settings", icon: Image.createFromFile("images://settings.png") }],
            // tab1
            routes: [
                StackRouter.of({
                    path: "/bottom/stackhome",
                    to: "/bottom/stackhome/home",
                    routes: [
                        Route.of({
                            path: "/bottom/stackhome/home",
                            build: buildExtender({
                                getPageClass: () => Pages.Home,
                                headerBarStyle: { visible: true }
                            })
                        }),
                        Route.of({
                            path: "/bottom/stackhome/details",
                            build: buildExtender({
                                getPageClass: () => Pages.Details,
                                headerBarStyle: { visible: true }
                            })
                        }),
                    ]
                }),
                StackRouter.of({
                    path: "/bottom/stackprofile",
                    to: "/bottom/stackprofile/profile",
                    routes: [
                        Route.of({
                            path: "/bottom/stackprofile/profile",
                            build: buildExtender({
                                getPageClass: () => Pages.Profile,
                                headerBarStyle: { visible: true }
                            })
                        }),
                    ]
                }),
                StackRouter.of({
                    path: "/bottom/stacksettings",
                    to: "/bottom/stacksettings/settings",
                    routes: [
                        Route.of({
                            path: "/bottom/stacksettings/settings",
                            build: buildExtender({
                                getPageClass: () => Pages.Settings,
                                headerBarStyle: { visible: true }
                            })
                        }),
                    ]
                }),
            ]
        }),
    ]
});

export default router;
