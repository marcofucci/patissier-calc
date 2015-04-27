/* @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var IngredientForm = require('./IngredientForm.jsx');


var IngredientList = React.createClass({
  propTypes: {
    ingredients: ReactPropTypes.array.isRequired
  },

  render: function() {
    var ingredients = this.props.ingredients;
    var onSaveFunc = this._onSave;

  	var ingredientNodes = ingredients.map(function (ingredient) {
      return (
        <IngredientForm ingredient={ingredient} onSave={onSaveFunc} />
      );
    });
    return (
      <div>
        {ingredientNodes}
      </div>
    );
  },

  _onSave: function(ingredient) {
  }
});

module.exports = IngredientList;
