import HomeDesign from 'generated/pages/home';
import { context } from 'context';
import { Resource } from 'models/resource';
import Simple_listviewitem from 'components/Simple_listviewitem';
import ListViewItem1 from 'components/ListViewItem1';
import { createSettingsButton } from 'core/factory/HeaderBarItemFactory';
import { Passengers } from 'models/passengers';

export default class Home extends HomeDesign {
    router: any;
    passengers: Passengers
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initListView() {
        //this.listView1.rowHeight = ListViewItem1.getHeight();
        this.listView1.onRowBind = (listViewItem: ListViewItem1, index: number) => {
            const passenger = this.passengers.data[index]
            listViewItem.setTitle(passenger.name)
            listViewItem.setSubTitle(passenger.airline.name)
            const router = this.router
            listViewItem.onTouch = () => {
                router.push("/pages/home/details", {passenger : passenger})
            }
        };

        this.listView1.onPullRefresh = () => {
            this.refreshListView();
            this.listView1.stopRefresh();
        }
    }

    refreshListView() {
        this.listView1.itemCount = this.passengers.data.length;
        this.listView1.refreshData();
    }

    async getPassengerData() {
        try {
            this.passengers = await context.passengerService.getPassengerData(1, 10)
            this.refreshListView();
        }
        catch (e) {
            alert(JSON.stringify(e, null, '\t'));
        }
    }

    setupHeaderBar() {
        const router = this.router;
        this.headerBar.leftItemEnabled = false;
        this.headerBar.title = lang["home"]
        //this.headerBar.setItems([createSettingsButton(router)])
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
    this.initListView();
    this.getPassengerData();
    this.setupHeaderBar();
}
