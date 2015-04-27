/* @jsx React.DOM */

var React = require('react');
var IngredientList = require('./IngredientList.jsx');
var IngredientForm = require('./IngredientForm.jsx');
var IngredientActions = require('../actions/IngredientActions.jsx');

var data = [
  {id: 1, name: "Milk", quantity: 100, measure: 'ml'},
  {id: 2, name: "Water", quantity: 1, measure: 'l'},
];


var IngredientBox = React.createClass({
	getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
  	this.setState({data: data});
  },

  handleCommentSubmit: function(comment) {
  	var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  },

  render: function() {
    return (
      <div className="row">
        <h1>Ingredients</h1>
        <IngredientList ingredients={this.state.data} />
        <IngredientForm onSave={this._onSave} />
      </div>
    );
  },

  _onSave: function(ingredient) {
    ingredient['id'] = this.state.data.length+1;
    this.state.data.push(ingredient);
    this.setState(this.state);
  }
});

module.exports = IngredientBox;
