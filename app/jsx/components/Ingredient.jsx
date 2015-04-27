/* @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var Ingredient = React.createClass({
  propTypes: {
   ingredient: ReactPropTypes.object.isRequired
  },

  // getInitialState: function() {
  //   return {
  //     isEditing: false
  //   };
  // },

  render: function() {
    var ingredient = this.props.ingredient;

    // var input;
    // if (this.state.isEditing) {
    //   input =
    //     <TodoTextInput
    //       className="edit"
    //       onSave={this._onSave}
    //       value={todo.text}
    //     />;
    // }

    return (
      <li key={ingredient.id}>
        {ingredient.name} - {ingredient.quantity}{ingredient.measure}
      </li>
    );
  }
});

module.exports = Ingredient;
