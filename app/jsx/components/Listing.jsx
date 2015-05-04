/* @jsx React.DOM */

var React = require('react');
var ItemList = require('./ItemList.jsx');
var ItemForm = require('./ItemForm.jsx');
var ListingActions = require('../actions/ListingActions.jsx');
var ListingStore = require('../stores/ListingStore.jsx');


function getListingItems() {
  return ListingStore.getState().items;
}


var Listing = React.createClass({
	getInitialState: function() {
    return {
      data: getListingItems()
    };
  },

  componentDidMount: function() {
    ListingStore.listen(this.onDataChange);
  },

  componentWillUnmount: function() {
    ListingStore.unlisten(this.onDataChange);
  },

  render: function() {
    return (
      <div>
        <header id="topbar" className="row main">
          <div className="container">
            <h1>Bla</h1>
          </div>
        </header>

        <div className="row main">

          <div className="row">
            <div className="large-6 columns">
              <h3>Ingredients</h3>
            </div>
            <div className="large-6 columns">
              <h3>Prices</h3>
            </div>
          </div>

          <ItemList onSave={this.onItemSave} items={this.state.data} />

          <ItemForm onSave={this.onItemSave} isEditing={true} />
        </div>
      </div>
    );
  },

  onItemSave: function(item) {
    ListingActions.createOrUpdate(item);
  },

  onDataChange: function() {
    this.setState({
      data: getListingItems()
    });
  }
});

module.exports = Listing;
