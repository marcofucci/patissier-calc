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
        <div className="large-5 columns">
          <div className="row collapse">
            <div className="large-3 columns">
              <span className="right">{String.fromCharCode(163)}</span>
            </div>
            <div className="small-9 columns">{price}</div>
          </div>
        </div>
        <Quantity className="large-7 columns" isEditing={this.props.isEditing} onChange={this.onQuantityChange} quantity={this.props.unitprice.quantity} />
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
