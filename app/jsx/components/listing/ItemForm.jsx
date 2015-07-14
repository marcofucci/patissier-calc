import React from 'react';
import BaseItemForm from '../ui/BaseItemForm.jsx'
import ListingStore from '../../stores/ListingStore.jsx';
import Quantity from './Quantity.jsx';
import UnitPrice from './UnitPrice.jsx';
import QuantityUtils from './utils/QuantityUtils.jsx';


export default class ItemForm extends BaseItemForm {
  static propTypes: {
    onSave: React.PropTypes.func.isRequired,
    item: React.PropTypes.object,
    isEditing: React.PropTypes.bool,
    onPurchasePriceChange: React.PropTypes.func.isRequired
  }

  getEmptyItem() {
    return ListingStore.getEmptyItem();
  }

  _calculatePurchasePrice() {
    var item = this.state.item;
    var converted = item.quantity.value * QuantityUtils.convert(
      item.quantity.measure,
      item.unitprice.quantity.measure
    );

    var val = (item.unitprice.price / item.unitprice.quantity.value) * converted;
    if (isNaN(val)) {
      return 0;
    }

    return parseFloat(val.toFixed(2));
  }

  render() {
    var item = this.state.item;
    var name = this._name();
    var actionButtons = this._actionButtons();

    return (
      <div className="row">
        <div className="large-6 columns">

          <div className="large-6 columns">{name}</div>
          <Quantity className="large-6 columns" isEditing={this.state.isEditing} onChange={this.onQuantityChange} quantity={item.quantity} />

        </div>

        <UnitPrice className="large-4 columns padl0" isEditing={this.state.isEditing} onChange={this.onUnitpriceChange} unitprice={item.unitprice} />

        <div className="large-1 columns">{actionButtons}</div>
        <div className="large-1 columns">
          <div className="row collapse">
            <div className="large-3 columns">
              <span className="right">{String.fromCharCode(163)}</span>
            </div>
            <div className="small-9 columns">{item.purchasePrice}</div>
          </div>
        </div>
      </div>
    );
  }

  onChange = (field, val) => {
    var nextState = this.state;
    nextState.item[field] = val;

    var purchasePrice = this._calculatePurchasePrice();
    if (purchasePrice != nextState.item.purchasePrice) {
      nextState.item.purchasePrice = purchasePrice;
      this.props.onPurchasePriceChange(nextState.item);
    }
    this.setState(nextState);
  }

  onUnitpriceChange = (unitprice) => {
    this.onChange('unitprice', unitprice);
  }

  onQuantityChange = (quantity) => {
    this.onChange('quantity', quantity);
  }
};
