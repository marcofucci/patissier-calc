import React from 'react';
import Quantity from './Quantity.jsx';


export default class UnitPrice extends React.Component {
  static propTypes: {
    onChange: React.PropTypes.func.isRequired,
    unitprice: React.PropTypes.object,
    className: React.PropTypes.string,
    isEditing: React.PropTypes.bool
  }

  _price = () => {
    if (!this.props.isEditing) {
      return this.props.unitprice.price;
    }

    return <input type="text" placeholder="Price" value={this.props.unitprice.price} onChange={this.onFieldChange.bind(this, 'price')} />
  }

  render() {
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
  }

  onChange = (field, val) => {
    var unitprice = this.props.unitprice;
    unitprice[field] = val;
    this.props.onChange(unitprice);
  }

  onFieldChange = (field, event) => {
    this.onChange(field, event.target.value);
  }

  onQuantityChange = (quantity) => {
    this.onChange('quantity', quantity)
  }
};
