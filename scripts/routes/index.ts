import buildExtender from "sf-extension-utils/lib/router/buildExtender";
import {
    NativeRouter as Router,
    NativeStackRouter as StackRouter,
    Route
} from "@smartface/router";
import * as Pages from 'pages';
import "sf-extension-utils/lib/router/goBack"; // Implements onBackButtonPressed

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
                Route.of({
                    path: "/pages/home",
                    build: buildExtender({
                        getPageClass: () => Pages.Home,
                        headerBarStyle: { visible: true }
                    })
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
                })
            ]
        })
    ]
});

export default router;
