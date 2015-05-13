/* @jsx React.DOM */

var React = require('react');
var ItemList = require('./ItemList.jsx');
var ItemForm = require('./ItemForm.jsx');
var ListingActions = require('../actions/ListingActions.jsx');
var ListingStore = require('../stores/ListingStore.jsx');
var ContentEditable = require('./ui/ContentEditable.jsx');


var CSS = {
  container: {
    marginTop: '3rem'
  },

  headerSelect: {
    width: '3rem',
    margin: '0 1rem'
  }
}

function getListing() {
  return ListingStore.getState().listing;
}

function getTotPurchasePrice() {
  var listing = getListing();
  var totPurchasePrice = 0;

  listing.items.map(function(item) {
    totPurchasePrice += item.purchasePrice;
  });

  return totPurchasePrice;
}


var Listing = React.createClass({
	getInitialState: function() {
    return {
      listing: getListing(),
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
    var portionOptions = [];
    for (var i=1; i<=10; i++) {
      portionOptions.push(
        <option key={i} value={i}>{i}</option>
      )
    }

    return (
      <div>
        <header id="topbar" className="row main">
          <div style={CSS.container}>
            <ContentEditable html={this.state.listing.name} onChange={this.onFieldChange.bind(this, 'name', null)} />
            <span>for</span>
            <select style={CSS.headerSelect} value={this.state.listing.portions} onChange={this.onFieldChange.bind(this, 'portions', parseInt)}>
              {portionOptions}
            </select>
            <span>portions</span>
          </div>
        </header>

        <hr />

        <div className="row main">

          <div className="row">
            <div className="large-6 columns">
              <h3>Ingredients</h3>
            </div>
            <div className="large-6 columns">
              <h3>Prices</h3>
            </div>
          </div>

          <ItemList onSave={this.onItemSave} onPurchasePriceChange={this.onPurchasePriceChange} items={this.state.listing.items} />

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

  onFieldChange: function(field, parser, event) {
    var val = event.target.value;
    if (parser) {
      val = parser(val);
    }

    ListingActions.updateListingField({
      field: field,
      value: val
    });
  },

  onItemSave: function(item) {
    ListingActions.createOrUpdateItem(item);
  },

  onPurchasePriceChange: function(item) {},

  onDataChange: function() {
    this.setState({
      listing: getListing(),
      totPurchasePrice: getTotPurchasePrice()
    });
  }
});

module.exports = Listing;
