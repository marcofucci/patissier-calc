/* @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var ListingStore = require('../stores/ListingStore.jsx');
var Quantity = require('./Quantity.jsx');
var UnitPrice = require('./UnitPrice.jsx');


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

    // if (this.state.isNew) {
    return <input className="button postfix" type="submit" value="Save" onClick={this.save} />;
    // }
  },

  render: function() {
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

        <div className="large-2 columns">{actionButtons}</div>
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
