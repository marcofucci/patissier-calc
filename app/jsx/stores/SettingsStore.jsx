import alt from '../alt';
import SettingsActions from '../actions/SettingsActions.jsx';


var settings = {
  costitems: [
    {
      id: 1,
      name: 'settings 1',
      cost: '1.23'
    },
    {
      id: 2,
      name: 'settings 2',
      cost: '4.56'
    }
  ]
}


class SettingsStore {
  constructor() {
    this.bindListeners({
      onCreateOrUpdateCostItem: SettingsActions.createOrUpdateCostItem,
      onDestroyCostItem: SettingsActions.destroyCostItem
    });

    this.exportPublicMethods({
      getEmptyCostItem: this.getEmptyCostItem
    });

    this.settings = settings;
  }

  getEmptyCostItem() {
    return {
      id: -1,
      name: null,
      cost: 0
    };
  }

  onCreateOrUpdateCostItem(item) {
    var settings = this.settings;

    if (item.id == -1) {
      item['id'] = settings.costitems.length+1;
      settings.costitems.push(item);
    } else {
      settings.costitems = settings.costitems.map(i => i.id == item.id ? item : i);
    }

    this.setState({ settings });
  }

  onDestroyCostItem(item) {
    var settings = this.settings;

    var index = settings.indexOf(item);
    if (index >= 0) {
      settings.splice(index, 1);
    }

    this.setState({ settings });
  }
}

export default alt.createStore(SettingsStore);
