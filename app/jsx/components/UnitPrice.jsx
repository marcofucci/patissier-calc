/* @jsx React.DOM */

var React = require('react');
var Quantity = require('./Quantity.jsx')
var ReactPropTypes = React.PropTypes;


var UnitPrice = React.createClass({
  propTypes: {
    onChange: ReactPropTypes.func.isRequired,
    unitprice: ReactPropTypes.object,
    className: ReactPropTypes.string,
    isEditing: ReactPropTypes.bool
  },

  _price: function() {
    if (!this.props.isEditing) {
      return this.props.unitprice.price;
    }

    return <input type="text" placeholder="Price" value={this.props.unitprice.price} onChange={this.onFieldChange.bind(this, 'price')} />
  },

  render: function() {
    var price = this._price();

    return (
      <div className={this.props.className}>
        <Quantity className="large-7 columns" isEditing={this.props.isEditing} onChange={this.onQuantityChange} quantity={this.props.unitprice.quantity} />
        <div className="large-5 columns">{price}</div>
      </div>
    );
  },

  onChange: function(field, val) {
    var unitprice = this.props.unitprice;
    unitprice[field] = val;
    this.props.onChange(unitprice);
  },

  onFieldChange: function(field, event) {
    this.onChange(field, event.target.value);
  },

  onQuantityChange: function(quantity) {
    this.onChange('quantity', quantity)
  }
});

module.exports = UnitPrice;