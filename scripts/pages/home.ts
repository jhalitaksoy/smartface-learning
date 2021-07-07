import HomeDesign from 'generated/pages/home';
import { context } from 'context';
import { Resource } from 'models/resource';
import Simple_listviewitem from 'components/Simple_listviewitem';
import ListViewItem1 from 'components/ListViewItem1';

export default class Home extends HomeDesign {
    router: any;
    resource : Resource
	constructor() {
		super();
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.buttonLogout.onTouch = ()=>{
            context.jwtKeyStore.deleteJwtKey();
            this.router.push("/pages/page1")
        }
    }
    
    initListView() {
        this.listView1.rowHeight = ListViewItem1.getHeight();
        this.listView1.onRowBind = (listViewItem: ListViewItem1, index: number) => {
            listViewItem.setTitle(this.resource.data[index].name)
            listViewItem.setSubTitle(this.resource.data[index].year.toString())
            listViewItem.setColor(this.resource.data[index].color)
        };

        this.listView1.onPullRefresh = () => {
            this.refreshListView();
            this.listView1.stopRefresh();
        }
    }

    refreshListView() {
        this.listView1.itemCount = this.resource.data.length;
        this.listView1.refreshData();
    }

    async getUsers() {
        try {
            this.resource = await context.resourceService.getResourceList()
            this.refreshListView();
        }
        catch (e) {
            alert(JSON.stringify(e, null, '\t'));
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
    this.initListView();
    this.getUsers();
}
