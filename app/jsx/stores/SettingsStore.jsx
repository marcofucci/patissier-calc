import alt from '../alt';
import SettingsActions from '../actions/SettingsActions.jsx';


var settings = [
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


class SettingsStore {
  constructor() {
    this.bindListeners({
      onCreateOrUpdate: SettingsActions.createOrUpdate,
      onDestroy: SettingsActions.destroy
    });

    this.settings = settings;
  }

  onCreateOrUpdate(item) {
    var settings = this.settings;

    if (item.id == -1) {
      item['id'] = settings.length+1;
      settings.push(item);
    } else {
      settings = settings.map(i => i.id == item.id ? item : i);
    }

    this.setState({ settings });
  }

  onDestroy(item) {
    var settings = this.settings;

    var index = settings.indexOf(item);
    if (index >= 0) {
      settings.splice(index, 1);
    }

    this.setState({ settings });
  }
}

export default alt.createStore(SettingsStore);
