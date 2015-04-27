/* @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var MEASURE_VALUES = ['unit', 'ml', 'cl', 'l', 'gr', 'kg'];

var IngredientForm = React.createClass({

  propTypes: {
    onSave: ReactPropTypes.func.isRequired,
    ingredient: ReactPropTypes.object
  },

  getInitialState: function() {
    var ingredient = this.props.ingredient || this.getEmptyIngredient();
    return {
      ingredient: ingredient,
      isNew: ingredient.id <= 0 ? true : false
    }
  },

  getEmptyIngredient: function() {
    return {
      id: -1,
      name: '',
      quantity: '',
      measure: 'unit'
    }
  },

  render: function() {
    var ingredient = this.state.ingredient;
    var saveButton;

    if (this.state.isNew) {
      saveButton = <input className="button postfix" type="submit" value="Save" onClick={this._save} />;
    }

    var measureOptions = MEASURE_VALUES.map(function (val) {
      return (
        <option value={val}>{val}</option>
      );
    });

    return (
      <div className="row">
        <div className="large-4 columns">
          <input type="text" placeholder="Name" value={this.state.ingredient.name} onChange={this._onChange.bind(this, 'name')} />
        </div>
        <div className="large-4 columns">
          <input type="text" placeholder="Quantity" value={this.state.ingredient.quantity} onChange={this._onChange.bind(this, 'quantity')} />
        </div>
        <div className="large-2 columns">
          <select value={this.state.ingredient.measure} onChange={this._onChange.bind(this, 'measure')}>
            {measureOptions}
          </select>
        </div>
        <div className="large-2 columns">
          {saveButton}
        </div>
      </div>
    );
  },

  _save: function() {
    if (!this.state.isNew) {
      return
    }
    this.props.onSave(this.state.ingredient);

    var newState = this.state;
    newState.ingredient = this.getEmptyIngredient();
    this.setState(newState);
  },

  _onChange: function(field, event) {
    var nextState = this.state;
    nextState.ingredient[field] = event.target.value;
    this.setState(nextState);
  }
});

module.exports = IngredientForm;
