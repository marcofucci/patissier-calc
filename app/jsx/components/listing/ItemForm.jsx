import React from 'react';
import ListingStore from '../../stores/ListingStore.jsx';
import Quantity from './Quantity.jsx';
import UnitPrice from './UnitPrice.jsx';
import QuantityUtils from './utils/QuantityUtils.jsx';


export default class ItemForm extends React.Component {
  static propTypes: {
    onSave: React.PropTypes.func.isRequired,
    item: React.PropTypes.object,
    isEditing: React.PropTypes.bool,
    onPurchasePriceChange: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    var item = this.props.item || this.getEmptyItem();
    this.state = {
      item: item,
      isNew: item.id <= 0 ? true : false,
      isEditing: this.props.isEditing
    }
  }

  getEmptyItem = () => {
    return ListingStore.getEmptyItem();
  }

  _name = () => {
    if (!this.state.isEditing) {
      return this.state.item.name;
    }

    return <input type="text" placeholder="Name" value={this.state.item.name} onChange={this.onFieldChange.bind(this, 'name')} />;
  }

  _actionButtons = () => {
    if (!this.state.isEditing) {
      return <input className="button warning postfix" type="submit" value="Edit" onClick={this.enterEditMode} />;
    }

    return <input className="button postfix" type="submit" value="Save" onClick={this.save} />;
  }

  _calculatePurchasePrice = () => {
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

  render = () => {
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

  enterEditMode = () => {
    this.setState({
      isEditing: true
    });
  }

  exitEditMode = () => {
    this.setState({
      isEditing: false
    });
  }

  save = () => {
    var itemToSave = this.state.item;
    if (this.state.isNew) {
      this.setState({
        item: this.getEmptyItem()
      });
    } else {
      this.exitEditMode();
    }
    this.props.onSave(itemToSave);
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

  onFieldChange = (field, event) => {
    this.onChange(field, event.target.value);
  }

  onUnitpriceChange = (unitprice) => {
    this.onChange('unitprice', unitprice);
  }

  onQuantityChange = (quantity) => {
    this.onChange('quantity', quantity);
  }
};
