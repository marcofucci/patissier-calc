/* @jsx React.DOM */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var ItemForm = require('./ItemForm.jsx');


var ItemList = React.createClass({
  propTypes: {
    onSave: ReactPropTypes.func.isRequired,
    items: ReactPropTypes.array.isRequired
  },

  render: function() {
    var items = this.props.items;
    var onSaveFunc = this._onSave;

  	var itemNodes = items.map(function (item) {
      return (
        <ItemForm item={item} onSave={onSaveFunc} />
      );
    });
    return (
      <div>
        {itemNodes}
      </div>
    );
  },

  _onSave: function(item) {
    this.props.onSave(item);
  }
});

module.exports = ItemList;
