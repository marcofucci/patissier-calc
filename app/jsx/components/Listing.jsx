/* @jsx React.DOM */

var React = require('react');
var ItemList = require('./ItemList.jsx');
var ItemForm = require('./ItemForm.jsx');
var ListingActions = require('../actions/ListingActions.jsx');
var ListingStore = require('../stores/ListingStore.jsx');


function getListingItems() {
  return ListingStore.getState().items;
}

function getTotPurchasePrice() {
  var items = getListingItems();
  var totPurchasePrice = 0;

  items.map(function(item) {
    totPurchasePrice += item.purchasePrice;
  });

  return totPurchasePrice;
}


var Listing = React.createClass({
	getInitialState: function() {
    return {
      data: getListingItems(),
      totPurchasePrice: getTotPurchasePrice()
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

          <ItemList onSave={this.onItemSave} onPurchasePriceChange={this.onPurchasePriceChange} items={this.state.data} />

          <ItemForm onSave={this.onItemSave} onPurchasePriceChange={this.onPurchasePriceChange} isEditing={true} />

          <div className="row">
            <div className="large-11 columns tar">
              Purchase price:
            </div>
            <div className="large-1 columns">
              <div className="row collapse">
                <div className="large-3 columns">
                  <span className="right">{String.fromCharCode(163)}</span>
                </div>
                <div className="small-9 columns">{this.state.totPurchasePrice.toFixed(2)}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  },

  onItemSave: function(item) {
    ListingActions.createOrUpdate(item);
  },

  onPurchasePriceChange: function(item) {},

  onDataChange: function() {
    this.setState({
      data: getListingItems(),
      totPurchasePrice: getTotPurchasePrice()
    });
  }
});

module.exports = Listing;
