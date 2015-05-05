/* @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var ListingStore = require('../stores/ListingStore.jsx');
var Quantity = require('./Quantity.jsx');
var UnitPrice = require('./UnitPrice.jsx');
var QuantityUtils = require('../utils/QuantityUtils.jsx');


var ItemForm = React.createClass({

  propTypes: {
    onSave: ReactPropTypes.func.isRequired,
    item: ReactPropTypes.object,
    isEditing: ReactPropTypes.bool
  },

  getInitialState: function() {
    var item = this.props.item || this.getEmptyItem();
    return {
      item: item,
      isNew: item.id <= 0 ? true : false,
      isEditing: this.props.isEditing
    }
  },

  getEmptyItem: function() {
    return ListingStore.getEmptyItem();
  },

  _name: function() {
    if (!this.state.isEditing) {
      return this.state.item.name;
    }

    return <input type="text" placeholder="Name" value={this.state.item.name} onChange={this.onFieldChange.bind(this, 'name')} />;
  },

  _actionButtons: function() {
    if (!this.state.isEditing) {
      return <input className="button warning postfix" type="submit" value="Edit" onClick={this.enterEditMode} />;
    }

    return <input className="button postfix" type="submit" value="Save" onClick={this.save} />;
  },

  _purchasePrice: function() {
    var item = this.state.item;
    var converted = item.quantity.value * QuantityUtils.convert(
      item.quantity.measure,
      item.unitprice.quantity.measure
    );

    var val = (item.unitprice.price / item.unitprice.quantity.value) * converted;
    if (isNaN(val)) {
      return '--';
    }
    return val.toFixed(2);
  },

  render: function() {
    var item = this.state.item;
    var name = this._name();
    var actionButtons = this._actionButtons();
    var purchasePrice = this._purchasePrice();

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
            <div className="small-9 columns">{purchasePrice}</div>
          </div>
        </div>
      </div>
    );
  },

  enterEditMode: function() {
    this.setState({
      isEditing: true
    });
  },

  exitEditMode: function() {
    this.setState({
      isEditing: false
    });
  },

  save: function() {
    var itemToSave = this.state.item;
    if (this.state.isNew) {
      this.setState({
        item: this.getEmptyItem()
      });
    } else {
      this.exitEditMode();
    }
    this.props.onSave(itemToSave);
  },

  onChange: function(field, val) {
    var nextState = this.state;
    nextState.item[field] = val;
    this.setState(nextState);
  },

  onFieldChange: function(field, event) {
    this.onChange(field, event.target.value);
  },

  onUnitpriceChange: function(unitprice) {
    this.onChange('unitprice', unitprice);
  },

  onQuantityChange: function(quantity) {
    this.onChange('quantity', quantity);
  }
});

module.exports = ItemForm;
