import DetailsDesign from 'generated/pages/details';
import { Passenger } from 'models/passengers';
import ListViewItem1 from 'components/ListViewItem1';
import Image = require('@smartface/native/ui/image');
import Http = require("@smartface/native/net/http");
import System = require('@smartface/native/device/system');
import HeaderBarItem = require('@smartface/native/ui/headerbaritem');

type KeyValue = {
    name: string,
    value: string
}

export default class Details extends DetailsDesign {
    router: any;
    routeData: {
        passenger: Passenger
    };
    myHttp = new Http();

    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

    }

    initData() {
        this.headerBar.title = this.routeData.passenger.name

        const listData: Array<KeyValue> = [
            {
                name: "Passenger Name",
                value: this.routeData.passenger.name
            },
            {
                name: "Passenger Trips",
                value: this.routeData.passenger.trips.toString(),
            },
            {
                name: "Airline Name",
                value: this.routeData.passenger.airline.name,
            },
            {
                name: "Airline Country",
                value: this.routeData.passenger.airline.country,
            },
            {
                name: "Airline Slogan",
                value: this.routeData.passenger.airline.slogan,
            },
            {
                name: "Airline Website",
                value: this.routeData.passenger.airline.website,
            },
            {
                name: "Airline Headquaters",
                value: this.routeData.passenger.airline.head_quaters,
            }
        ]

        this.listView1.itemCount = listData.length
        this.listView1.onRowBind = (item: ListViewItem1, index: number) => {
            const keyValue = listData[index]
            item.setTitle(keyValue.name)
            item.setSubTitle(keyValue.value)
        }

        this.myHttp.requestImage({
            url: this.routeData.passenger.airline.logo,
            onLoad: (e: {
                statusCode: number;
                headers: { [key: string]: string };
                image: Image;
            }): void => {
                // Image loaded.
                this.imageView1.image = e.image;
            },
            onError: (e: {
                message: string;
                body: any;
                statusCode: number;
                headers: { [key: string]: string };
            }): void => {
                // Http request image failed.
                alert(e.message);
            }
        });
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
    this.initData();
    let headerBar
    if (System.OS === "Android") {
        headerBar = this.headerBar;
        headerBar.setLeftItem(new HeaderBarItem({
            onPress: () => {
                this.router.goBack();
            },
            image: Image.createFromFile("images://arrow_back.png")
        }));
    }
    else {
        headerBar = this.parentController.headerBar;
    }
}
