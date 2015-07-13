import alt from '../alt';
import ListingActions from '../actions/ListingActions.jsx';


var listing = {
  name: 'Lorem ipsum',
  purchasePriceX: 0.88,
  purchasePrice1: 0.22,
  portions: 4,
  items: [
    {
      id: 1,
      name: "one",
      quantity: {
        value: 100,
        measure: 'gr'
      },
      unitprice: {
        quantity: {
          value: 1,
          measure: 'kg'
        },
        price: '2.34'
      },
      purchasePrice: 0.23
    },
    {
      id: 2,
      name: "two",
      quantity: {
        value: 1,
        measure: 'l'
      },
      unitprice: {
        quantity: {
          value: 2,
          measure: 'l'
        },
        price: '1.30'
      },
      purchasePrice: 0.65
    }
  ]
};


class ListingStore {
  constructor() {
    this.bindListeners({
      onCreateOrUpdateItem: ListingActions.createOrUpdateItem,
      onUpdateListingField: ListingActions.updateListingField
    });

    this.exportPublicMethods({
      getEmptyItem: this.getEmptyItem
    });

    this.listing = listing;
  }

  getEmptyItem() {
    return {
      id: -1,
      name: null,
      quantity: {
        value: null,
        measure: null
      },
      unitprice: {
        quantity: {
          value: null,
          measure: null
        },
        price: null
      }
    };
  }

  onCreateOrUpdateItem(item) {
    var listing = this.listing;

    if (item.id == -1) {
      item['id'] = listing.items.length+1;
      listing.items.push(item);
    } else {
      listing.items = listing.items.map(i => i.id == item.id ? item : i);
    }

    this.setState({ listing });
  }

  onUpdateListingField(data) {
    var listing = this.listing;

    listing[data.field] = data.value;
    this.setState({ listing });
  }
}

export default alt.createStore(ListingStore);
