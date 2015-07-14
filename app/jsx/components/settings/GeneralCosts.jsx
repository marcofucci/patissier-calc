import React from 'react';
import CostItemList from './CostItemList.jsx';
import CostItemForm from './CostItemForm.jsx';
import SettingsActions from '../../actions/SettingsActions.jsx';
import SettingsStore from '../../stores/SettingsStore.jsx';


function getCostItems() {
  return SettingsStore.getState().settings.costitems;
}

export default class GeneralCosts extends React.Component {
  constructor(props) {
    super(props);

    var costitems = getCostItems();
    this.state = {
      costitems: costitems
    };

  }

  componentDidMount = () => {
    SettingsStore.listen(this.onDataChange);
  }

  componentWillUnmount = () => {
    SettingsStore.unlisten(this.onDataChange);
  }

  render() {
    return (
      <div>
        <header id="topbar" className="row main">
        	<span>Settings</span>
        </header>

        <hr />

        <div className="row main">
          <div className="row">

          <CostItemList onSave={this.onItemSave} items={this.state.costitems} />
          <CostItemForm onSave={this.onItemSave} isEditing={true} />

          </div>
        </div>
      </div>
    );
	}

  onItemSave = (item) => {
    SettingsActions.createOrUpdateCostItem(item);
  }

  onDataChange = () => {
    this.setState({
      costitems: getCostItems()
    });
  }
};
