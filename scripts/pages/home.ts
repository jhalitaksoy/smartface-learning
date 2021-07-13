import HomeDesign from 'generated/pages/home';
import { context } from 'context';
import ListViewItem1 from 'components/ListViewItem1';
import { Passengers } from 'models/passengers';
import ActivityIndicator = require('@smartface/native/ui/activityindicator');
import FlexLayout = require('@smartface/native/ui/flexlayout');
import Label = require('@smartface/native/ui/label');
import addChild from "@smartface/contx/lib/smartface/action/addChild";
import ListViewItem = require('@smartface/native/ui/listviewitem');
import Timer from "@smartface/native/timer";

export default class Home extends HomeDesign {
    router: any;
    passengers: Passengers

    index: number = 0;
    isLoading: boolean = false;

    page: number = 1;
    pageSize: number = 5;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    initListView() {
        console.log("initListView");
        this.listView1.itemCount = this.passengers.data.length + 1
         this.listView1.onRowSelected = (item : ListViewItem, index : number) => {

                router.push("/pages/home/details", { passenger: this.passengers.data[index]})
            }
        const router = this.router
        this.listView1.onRowCreate = (type) => {
            const passenger = this.passengers.data[this.index]

            let myListViewItem = new ListViewItem();
            this.listView1.dispatch(addChild(`myListViewItem${++this.index}`, myListViewItem, '.sf-listViewItem', {
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft : 10,
                paddingRight : 10
            }));

            if (type == 2) {// Loading
                let loadingIndicator = new ActivityIndicator();
                //@ts-ignore
                myListViewItem.loadingIndicator = loadingIndicator;
                //@ts-ignore
                myListViewItem.addChild(loadingIndicator, `loadingIndicator${this.index}`, ".sf-activityIndicator", {
                    width: 35,
                    height: 35,
                    color: "#008000",
                    flexProps: {
                        positionType: "ABSOLUTE",
                    }
                });

                //@ts-ignore
                myListViewItem.dispatch({
                    type: "updateUserStyle",
                    userStyle: {
                        flexProps: {
                            justifyContent: "CENTER",
                            alignItems: "CENTER"
                        }
                    }
                });
            } else {
                let titleLayout = new FlexLayout();
                let titleLabel = new Label();
                let subtitleLabel = new Label();

                titleLayout.flexDirection = FlexLayout.FlexDirection.ROW

                //@ts-ignore
                myListViewItem.addChild(titleLayout, `titleLayout${this.index}`, ".sf-flexLayout", {
                    flexGrow: 1,
                });

                //@ts-ignore
                titleLayout.addChild(titleLabel, `titleLabel${this.index}`, "sf-label .my-label", {
                    //textAlignment: "MIDCENTER",
                    flexGrow: 1,
                });
                //@ts-ignore
                titleLayout.titleLabel = titleLabel;

                //@ts-ignore
                titleLayout.addChild(subtitleLabel, `subtitleLabel${this.index}`, "sf-label .my-label", {
                    textAlignment: "MIDRIGHT",
                    flexGrow: 1,
                });
                //@ts-ignore
                titleLayout.subtitleLabel = subtitleLabel;

                //@ts-ignore
                myListViewItem.titleLayout = titleLayout;
            }
            return myListViewItem;
        };
        this.listView1.onRowBind = (listViewItem: ListViewItem, index) => {
            if (index === this.passengers.data.length) {
                //@ts-ignore
                listViewItem.loadingIndicator.visible = true;
            }
            else {
                //@ts-ignore
                listViewItem.titleLayout.titleLabel.text = this.passengers.data[index % this.passengers.data.length].name;
                //@ts-ignore
                listViewItem.titleLayout.subtitleLabel.text = this.passengers.data[index % this.passengers.data.length].airline.name;
            }

            console.log(index);
            console.log(this.passengers.data.length);

            if (index > this.passengers.data.length - 3 && !this.isLoading) {
                this.isLoading = true
                console.log("will load");

                Timer.setTimeout({
                    task: () => {
                        // Loading completed
                        this.loadMorePassengerData();
                        console.log("loaded");
                        console.log(this.passengers.data.length);

                        this.listView1.itemCount = this.passengers.data.length + 1;
                        this.listView1.refreshData();
                        this.isLoading = false;
                    },
                    delay: 500
                });

            }
        };

        this.listView1.onRowType = (index) => {
            if (this.passengers.data.length === index) {// Loading
                return 2;
            } else {
                return 1;
            }
        }
        /*
        //this.listView1.rowHeight = ListViewItem1.getHeight();
        this.listView1.onRowBind = (listViewItem: ListViewItem1, index: number) => {
            const passenger = this.passengers.data[index]
            listViewItem.setTitle(passenger.name)
            listViewItem.setSubTitle(passenger.airline.name)
            const router = this.router
            listViewItem.onTouch = () => {
                router.push("/pages/home/details", { passenger: passenger })
            }
        };

        this.listView1.onPullRefresh = () => {
            this.refreshListView();
            this.listView1.stopRefresh();
        }*/
    }

    refreshListView() {
        this.listView1.itemCount = this.passengers.data.length;
        this.listView1.refreshData();
    }

    async getPassengerData() {
        try {
            this.passengers = await context.passengerService.getPassengerData(this.page, this.pageSize)
            this.initListView();
            this.refreshListView();
        }
        catch (e) {
            alert(JSON.stringify(e, null, '\t'));
        }
    }

    async loadMorePassengerData() {
        try {
            const newData = await context.passengerService.getPassengerData(this.page + 1, this.pageSize)
            this.passengers.data = [...this.passengers.data, ...newData.data]
            this.page++
        }
        catch (e) {
            alert(JSON.stringify(e, null, '\t'));
        }
    }


    setupHeaderBar() {
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
    this.getPassengerData();
    //this.initListView();
    this.setupHeaderBar();
}
