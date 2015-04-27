var React = require('react');
var ReactPropTypes = React.PropTypes;


var MEASURE_VALUES = ['unit', 'ml', 'cl', 'l', 'gr', 'kg'];

var divStyle = {
  width: '50%'
};


var Measure = React.createClass({
  propTypes: {
    onChange: ReactPropTypes.func.isRequired,
    quantity: ReactPropTypes.number,
    measure: ReactPropTypes.string,
    className: ReactPropTypes.string
  },

	render: function() {
    var measureOptions = MEASURE_VALUES.map(function (val) {
      return (
        <option key={val} value={val}>{val}</option>
      );
    });

		return (
			<div className={this.props.className}>
				<div style={divStyle} className="columns">
		      <input type="text" placeholder="Quantity" type="number" value={this.props.quantity} onChange={this._onChange.bind(this, 'quantity', parseInt)} />
		    </div>
		    <div style={divStyle} className="columns">
		      <select value={this.props.measure || 'kg'} onChange={this._onChange.bind(this, 'measure', null)}>
		        {measureOptions}
		      </select>
		    </div>
		  </div>
	   )
	},

	_onChange: function(field, parser, event) {
		var val = event.target.value;
		if (parser) {
			val = parser(val);
		}
		this.props.onChange(field, val);
	}
});

module.exports = Measure;
