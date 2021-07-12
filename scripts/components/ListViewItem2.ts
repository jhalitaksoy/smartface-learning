import ListViewItem2Design from 'generated/my-components/ListViewItem2';

export default class ListViewItem2 extends ListViewItem2Design {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
