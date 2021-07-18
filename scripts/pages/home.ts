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
import { Separator } from '@smartface/native/io/path';
import Color = require('@smartface/native/ui/color');
import ListView = require('@smartface/native/ui/listview');
import Font = require('@smartface/native/ui/font');
import Image = require('@smartface/native/ui/image');
import { getCombinedStyle } from '@smartface/extension-utils/lib/getCombinedStyle';
import System = require('@smartface/native/device/system');

export default class Home extends HomeDesign {
    router: any;
    passengers: Passengers

    index: number = 0;
    isLoading: boolean = false;

    page: number = 1;
    pageSize: number = 10;

    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }

    deleteAndRefresh(e: { index: number }): void {
        let length = this.passengers.data.length;
        this.passengers.data.splice(e.index, 1);
        this.listView1.itemCount = this.passengers.data.length;
        this.listView1.deleteRowRange({
            itemCount: 1,
            positionStart: e.index,
            ios: {
                animation: ListView.iOS.RowAnimation.FADE
            }
        });
        if (System.OS == "iOS") {
            /*if (e.index == 0) {
                this.setBordersForiOS(0);
            }
            else if (e.index == length - 1) {
                this.setBordersForiOS(length - 2);
            }*/
        }
        else {
            this.listView1.refreshRowRange({ itemCount: 1, positionStart: 0 })
            this.listView1.refreshRowRange({ itemCount: 1, positionStart: this.passengers.data.length - 1 })
        }
    }

    markAsFavorite(e: { index: number }): void {
        const passenger = this.passengers.data[e.index]
        const favorites = context.favoritesStore.getFavorites()
        const find = favorites.find((value) => value === passenger._id)
        if(find){
            context.favoritesStore.deleteFavorite(passenger._id)
        }else{
            context.favoritesStore.addFavorite(passenger._id)
        }
        this.listView1.refreshData();
    }

    initListView() {
        this.listView1.itemCount = this.passengers.data.length + 1
        this.listView1.onRowSelected = (item: ListViewItem, index: number) => {
            router.push("/bottom/stackhome/details", { passenger: this.passengers.data[index] })
        }
        this.listView1.swipeEnabled = true;

        this.listView1.onRowCanSwipe = (index: number) => {
            return [ListView.SwipeDirection.LEFTTORIGHT, ListView.SwipeDirection.RIGHTTOLEFT];
        }

        this.listView1.onRowSwipe = (e: any): ListView.SwipeItem[] => {
            if (e.direction == ListView.SwipeDirection.LEFTTORIGHT) {
                e.ios.expansionSettings.buttonIndex = -1;
                let archiveItem = new ListView.SwipeItem();
                archiveItem.text = "ARCHIVE " + e.index;
                archiveItem.backgroundColor = Color.GREEN;
                archiveItem.textColor = Color.BLACK;
                archiveItem.font = Font.create("Arial-ItalicMT", 8, Font.NORMAL);
                //@ts-ignore
                archiveItem.ios.padding = 40;
                //this.applyDimension(e.index, archiveItem);
                //@ts-ignore
                archiveItem.ios.isAutoHide = false;
                archiveItem.onPress = (e: any) => {
                    console.log("Archive : " + e.index);
                    this.markAsFavorite(e)
                };
                return [archiveItem];
            }
            else if (e.direction == ListView.SwipeDirection.RIGHTTOLEFT) {
                e.ios.expansionSettings.buttonIndex = 0;
                e.ios.expansionSettings.threshold = 1.5;
                e.ios.expansionSettings.fillOnTrigger = true;
                let deleteItem = new ListView.SwipeItem();
                deleteItem.text = "DELETE " + e.index;
                deleteItem.backgroundColor = Color.RED;
                deleteItem.textColor = Color.YELLOW;
                deleteItem.icon = Image.createFromFile("images://accountimg36.png");
                //@ts-ignore
                deleteItem.ios.iconTextSpacing = 10;
                //@ts-ignore
                deleteItem.ios.isAutoHide = false;
                deleteItem.onPress = (e: any) => {
                    console.log("Delete Index : " + e.index);
                    this.deleteAndRefresh(e);
                };
                let moreItem = new ListView.SwipeItem();
                moreItem.text = "MORE";
                moreItem.onPress = function (e) {
                    console.log("More : " + e.index);
                    this.myListView.refreshData();
                };
                //this.applyDimension(e.index, deleteItem);
                return [deleteItem, moreItem];
            }
        }
        const router = this.router
        this.listView1.rowHeight = 60;
        this.listView1.onRowCreate = (type) => {
            const passenger = this.passengers.data[this.index]
            let myListViewItem = new ListViewItem();
            const listViewStyle = getCombinedStyle(".mylistview")
            myListViewItem.backgroundColor = listViewStyle.backgroundColor;
            //myListViewItem.borderColor = Color.WHITE;
            //myListViewItem.borderWidth = 1
            this.listView1.dispatch(addChild(`myListViewItem${++this.index}`, myListViewItem, '.sf-listViewItem', {
                /*paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 10,
                paddingRight: 10*/
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

                let seperator = new FlexLayout();

                titleLayout.flexDirection = FlexLayout.FlexDirection.ROW
                titleLayout.alignItems = FlexLayout.AlignItems.CENTER

                //@ts-ignore
                myListViewItem.addChild(titleLayout, `titleLayout${this.index}`, ".sf-flexLayout", {
                    flexGrow: 1,
                });

                //@ts-ignore
                titleLayout.addChild(titleLabel, `titleLabel${this.index}`, ".sf-label .my-label", {
                    //textAlignment: "MIDCENTER",
                    flexGrow: 1,
                });
                //@ts-ignore
                titleLayout.titleLabel = titleLabel;

                //@ts-ignore
                titleLayout.addChild(subtitleLabel, `subtitleLabel${this.index}`, ".sf-label .my-label", {
                    textAlignment: "MIDRIGHT",
                    flexGrow: 1,
                });

                //@ts-ignore
                myListViewItem.addChild(seperator, `sepetator${this.index}`, ".sf-flexLayout", {
                    //flexGrow: 1,
                });

                seperator.height = 1;
                seperator.positionType = FlexLayout.PositionType.ABSOLUTE;
                seperator.left = 0;
                seperator.right = 0;
                seperator.bottom = 0;

                titleLayout.padding = 15;
                titleLayout.paddingBottom = 17;

                seperator.backgroundColor = Color.create("#5c5e5c")

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
                const passenger = this.passengers.data[index % this.passengers.data.length]

                const favorites = context.favoritesStore.getFavorites()
                const find = favorites.find((value) => value === passenger._id)

                const listViewStyle = getCombinedStyle(".mylistview")
                if (find) {
                    listViewItem.backgroundColor = Color.BLUE
                } else {
                    listViewItem.backgroundColor = listViewStyle.backgroundColor;
                }

                //@ts-ignore
                listViewItem.titleLayout.titleLabel.text = this.passengers.data[index % this.passengers.data.length].name;
                //@ts-ignore
                listViewItem.titleLayout.subtitleLabel.text = this.passengers.data[index % this.passengers.data.length].airline.name;
            }

            if (index > this.passengers.data.length - 3 && !this.isLoading) {
                this.isLoading = true

                Timer.setTimeout({
                    task: async () => {
                        // Loading completed
                        await this.loadMorePassengerData();
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
