import DetailsDesign from 'generated/pages/details';
import { Passenger } from 'models/passengers';
import ListViewItem1 from 'components/ListViewItem1';
import Image = require('@smartface/native/ui/image');
import Http = require("@smartface/native/net/http");
import System = require('@smartface/native/device/system');
import HeaderBarItem = require('@smartface/native/ui/headerbaritem');
import { ImageUtil, ImageLoadError } from 'core/util/image-util';

type KeyValue = {
    name: string,
    value: string
}

function createKeyValue(name: string,
    value: string): KeyValue {
    return {
        name: name,
        value: value,
    }
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
        const passenger = this.routeData.passenger;
        this.headerBar.title = passenger.name

        ImageUtil.setImageViewImageFromNetwork(
            this.imageView1, passenger.airline.logo, (e: ImageLoadError) => {
                alert(e.message);
            });

        this.initListView(passenger)
    }

    initListView(passenger: Passenger) {
        const listData: Array<KeyValue> = this.createListData(passenger);
        this.listView1.itemCount = listData.length
        this.listView1.onRowBind = (item: ListViewItem1, index: number) => {
            const keyValue = listData[index]
            item.setTitle(keyValue.name)
            item.setSubTitle(keyValue.value)
            if (index == listData.length - 1) {
                item.flexLayoutSeperator.visible = false
            } else {
                item.flexLayoutSeperator.visible = true
            }
        }
    }

    createListData(passenger: Passenger): Array<KeyValue> {
        return [
            createKeyValue("Passenger Name", passenger.name),
            createKeyValue("Passenger Trips", passenger.trips.toString()),
            createKeyValue("Airline Name", passenger.airline.name),
            createKeyValue("Airline Country", passenger.airline.country),
            createKeyValue("Airline Slogan", passenger.airline.slogan),
            createKeyValue("Airline Website", passenger.airline.website),
            createKeyValue("Airline Headquaters", passenger.airline.head_quaters),
        ]
    }

    initHeaderbar() {
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
            //@ts-ignore
            headerBar = this.parentController.headerBar;
        }
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
    this.initHeaderbar();
}
