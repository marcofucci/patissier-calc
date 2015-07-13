import React from 'react';
import ItemList from './ItemList.jsx';
import ItemForm from './ItemForm.jsx';
import ListingActions from '../../actions/ListingActions.jsx';
import ListingStore from '../../stores/ListingStore.jsx';
import ContentEditable from '../ui/ContentEditable.jsx';


function getListing() {
  return ListingStore.getState().listing;
}

export default class Listing extends React.Component {
  constructor(props) {
    super(props);

    var listing = getListing();
    this.state = {
      listing: listing,
      purchasePriceItemsCache: {},
      currentPurchasePriceX: listing.purchasePriceX,
      currentPurchasePrice1: listing.purchasePrice1
    };

  }

  _calculatePurchasePrice = (useCache=true) => {
    var listing = this.state.listing;
    var cache = this.state.purchasePriceItemsCache;
    var currentPurchasePrice = 0;

    listing.items.map((item) => {
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
  }


  componentDidMount = () => {
    ListingStore.listen(this.onDataChange);
  }

  componentWillUnmount = () => {
    ListingStore.unlisten(this.onDataChange);
  }

  renderPurchasePriceRow = (portions, stateVar) => {
    return (
      <div className="row">
        <div className="large-11 columns tar">
          pp for {portions}:
        </div>
        <div className="large-1 columns">
          <div className="row collapse">
            <div className="large-3 columns">
              <span className="right">{String.fromCharCode(163)}</span>
            </div>
            <div className="small-9 columns">{this.state[stateVar].toFixed(2)}</div>
          </div>
        </div>
      </div>
    )
  }

  render = () => {
    var portionOptions = [];
    for (var i=1; i<=10; i++) {
      portionOptions.push(
        <option key={i} value={i}>{i}</option>
      )
    }

    // purchase prices
    var portions = this.state.listing.portions;
    var purchasePriceX = this.renderPurchasePriceRow(portions, 'currentPurchasePriceX');
    var purchasePrice1 = portions > 1 ? this.renderPurchasePriceRow(1, 'currentPurchasePrice1') : '';

    return (
      <div>
        <header id="topbar" className="row main">
          <ContentEditable html={this.state.listing.name} onChange={this.onFieldChange.bind(this, 'name', null)} />
          <span>for</span>
          <select value={this.state.listing.portions} onChange={this.onFieldChange.bind(this, 'portions', parseInt)}>
            {portionOptions}
          </select>
          <span>ppl</span>
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

          {purchasePriceX}
          {purchasePrice1}

        </div>
      </div>
    );
  }

  saveListingPurchasePrices = () => {
    var purchasePriceX = this._calculatePurchasePrice(false);

    ListingActions.updateListingField({
      field: 'purchasePriceX',
      value: purchasePriceX
    });

    ListingActions.updateListingField({
      field: 'purchasePrice1',
      value: purchasePriceX / this.state.listing.portions
    });
  }

  onCurrentPurchasePricesMustChange = () => {
    var purchasePrice = this._calculatePurchasePrice()

    this.setState({
      currentPurchasePriceX: purchasePrice,
      currentPurchasePrice1: purchasePrice / this.state.listing.portions
    });
  }

  onFieldChange = (field, parser, event) => {
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
  }

  onItemSave = (item) => {
    var cache = this.state.purchasePriceItemsCache;
    if (item.id in cache) {
      delete cache[item.id];
      this.setState({
        purchasePriceItemsCache: cache
      });
    }
    ListingActions.createOrUpdateItem(item);
    this.saveListingPurchasePrices();
  }

  onPurchasePriceChange = (item) => {
    // update cache
    var cache = this.state.purchasePriceItemsCache;
    cache[item.id] = item.purchasePrice;

    this.setState({
      purchasePriceItemsCache: cache
    });

    // update purchase prices
    this.onCurrentPurchasePricesMustChange();
  }

  onDataChange = () => {
    this.setState({
      listing: getListing()
    });
  }
};
