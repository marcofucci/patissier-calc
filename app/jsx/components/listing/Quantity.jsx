import React from 'react';
import QuantityUtils from './utils/QuantityUtils.jsx';


export default class Quantity extends React.Component {
  static propTypes: {
    onChange: React.PropTypes.func.isRequired,
    quantity: React.PropTypes.object,
    className: React.PropTypes.string,
    isEditing: React.PropTypes.bool
  }

  _quantityValueEl = () => {
  	if (!this.props.isEditing) {
  		return this.props.quantity.value;
  	}

  	return <input type="text" placeholder="Quantity" type="number" value={this.props.quantity.value} onChange={this.onChange.bind(this, 'value', parseInt)} />
  }

  _quantityMeasureEl = () => {
  	if (!this.props.isEditing) {
  		return this.props.quantity.measure;
  	}

    var measureOptions = QuantityUtils.getAllTypes().map(function (val) {
      return (
        <option key={val} value={val}>{val}</option>
      );
    });

  	return (
  		<select value={this.props.quantity.measure} onChange={this.onChange.bind(this, 'measure', null)}>
        <option key={-1}>--</option>
        {measureOptions}
      </select>
    )
  }

	render() {
		var valueEl = this._quantityValueEl();
		var measureEl = this._quantityMeasureEl();

		return (
			<div className={this.props.className}>
				<div className="large-6 columns padl0">{valueEl}</div>
		    <div className="large-6 columns padr0">{measureEl}</div>
		  </div>
	   )
	}

	onChange = (field, parser, event) => {
		var val = event.target.value;
		if (parser) {
			val = parser(val);
		}
    var quantity = this.props.quantity;
    quantity[field] = val;
		this.props.onChange(quantity);
	}
};
