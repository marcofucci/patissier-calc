/* @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var Measure = require('./Measure.jsx')


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
      quantity: null,
      measure: null
    }
  },

  render: function() {
    var ingredient = this.state.ingredient;
    var saveButton;

    if (this.state.isNew) {
      saveButton = <input className="button postfix" type="submit" value="Save" onClick={this._save} />;
    }

    return (
      <div className="row">
        <div className="large-4 columns">
          <input type="text" placeholder="Name" value={this.state.ingredient.name} onChange={this._onChange.bind(this, 'name')} />
        </div>
        <Measure className="large-6 columns" onChange={this._onMeasureChange} quantity={this.state.ingredient.quantity} measure={this.state.ingredient.measure} />

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
    newState.ingredient.id -= 1;
    this.setState(newState);
  },

  _setIngredientProp: function(field, val) {
    var nextState = this.state;
    nextState.ingredient[field] = val;
    this.setState(nextState);
  },

  _onChange: function(field, event) {
    this._setIngredientProp(field, event.target.value);
  },

  _onMeasureChange: function(field, val) {
    this._setIngredientProp(field, val);
  }
});

module.exports = IngredientForm;
