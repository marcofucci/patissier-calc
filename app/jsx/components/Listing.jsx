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

var Listing = React.createClass({
  _calculatePurchasePrice: function(useCache=true) {
    var listing = this.state.listing;
    var cache = this.state.purchasePriceItemsCache;
    var currentPurchasePrice = 0;

    listing.items.map(function(item) {
      if (useCache && item.id in cache) {
        currentPurchasePrice += cache[item.id];
      } else {
        currentPurchasePrice += item.purchasePrice;
      }
    });

    // new one ?
    if (useCache && -1 in cache) {
      currentPurchasePrice += cache[-1];
    }

    return currentPurchasePrice;
  },

	getInitialState: function() {
    var listing = getListing();
    return {
      listing: listing,
      purchasePriceItemsCache: {},
      currentPurchasePriceX: listing.purchasePriceX,
      currentPurchasePrice1: listing.purchasePrice1
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
            <span>ppl</span>
          </div>
        </header>

        <hr />

        <div className="row main">

          <div className="row">
            <div className="large-6 columns">
              <h3>Title1</h3>
            </div>
            <div className="large-6 columns">
              <h3>Title2</h3>
            </div>
          </div>

          <ItemList onSave={this.onItemSave} onPurchasePriceChange={this.onPurchasePriceChange} items={this.state.listing.items} />

          <ItemForm onSave={this.onItemSave} onPurchasePriceChange={this.onPurchasePriceChange} isEditing={true} />

          <div className="row">
            <div className="large-11 columns tar">
              pp for {this.state.listing.portions} ppl:
            </div>
            <div className="large-1 columns">
              <div className="row collapse">
                <div className="large-3 columns">
                  <span className="right">{String.fromCharCode(163)}</span>
                </div>
                <div className="small-9 columns">{this.state.currentPurchasePriceX.toFixed(2)}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="large-11 columns tar">
              pp for 1:
            </div>
            <div className="large-1 columns">
              <div className="row collapse">
                <div className="large-3 columns">
                  <span className="right">{String.fromCharCode(163)}</span>
                </div>
                <div className="small-9 columns">{this.state.currentPurchasePrice1.toFixed(2)}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  },

  saveListingPurchasePrices: function() {
    var purchasePriceX = this._calculatePurchasePrice(false);

    ListingActions.updateListingField({
      field: 'purchasePriceX',
      value: purchasePriceX
    });

    ListingActions.updateListingField({
      field: 'purchasePrice1',
      value: purchasePriceX / this.state.listing.portions
    });
  },

  onCurrentPurchasePricesMustChange: function() {
    var purchasePrice = this._calculatePurchasePrice()

    this.setState({
      currentPurchasePriceX: purchasePrice,
      currentPurchasePrice1: purchasePrice / this.state.listing.portions
    });
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

    this.onCurrentPurchasePricesMustChange();
    this.saveListingPurchasePrices();
  },

  onItemSave: function(item) {
    var cache = this.state.purchasePriceItemsCache;
    if (item.id in cache) {
      delete cache[item.id];
      this.setState({
        purchasePriceItemsCache: cache
      });
    }
    ListingActions.createOrUpdateItem(item);
    this.saveListingPurchasePrices();
  },

  onPurchasePriceChange: function(item) {
    // update cache
    var cache = this.state.purchasePriceItemsCache;
    cache[item.id] = item.purchasePrice;

    this.setState({
      purchasePriceItemsCache: cache
    });

    // update purchase prices
    this.onCurrentPurchasePricesMustChange();
  },

  onDataChange: function() {
    this.setState({
      listing: getListing()
    });
  }
});

module.exports = Listing;
