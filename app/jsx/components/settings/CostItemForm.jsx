import React from 'react';
import BaseItemForm from '../ui/BaseItemForm.jsx'
import SettingsActions from '../../actions/SettingsActions.jsx';
import SettingsStore from '../../stores/SettingsStore.jsx';


export default class CostItemForm extends BaseItemForm {
  getEmptyItem() {
    return SettingsStore.getEmptyCostItem();
  }

  _cost() {
    if (!this.state.isEditing) {
      return this.state.item.cost;
    }

    return <input type="text" placeholder="Cost" type="number" value={this.state.item.cost} onChange={this.onFieldChange.bind(this, 'cost')} />
  }

  render() {
    var item = this.state.item;
    var name = this._name();
    var cost = this._cost();
    var actionButtons = this._actionButtons();

    return (
      <div className="row">

        <div className="large-6 columns">{name}</div>
        <div className="large-3 columns">{cost}</div>
        <div className="large-1 columns">{actionButtons}</div>

      </div>
    );
	}
};
