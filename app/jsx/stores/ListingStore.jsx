var alt = require('../alt')

var ListingActions = require('../actions/ListingActions.jsx')

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

var listingStore = alt.createStore({
  displayName: 'ListingStore',
  state: {
  	listing: listing
  },

  bindListeners: {
    onCreateOrUpdateItem: ListingActions.CREATE_OR_UPDATE_ITEM,
    onUpdateListingField: ListingActions.UPDATE_LISTING_FIELD
  },

  publicMethods: {
    getEmptyItem: function() {
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
  },

  onCreateOrUpdateItem: function(item) {
  	var newState = this.state;

  	if (item.id == -1) {
			item['id'] = newState.listing.items.length+1;
	    newState.listing.items.push(item);
	  } else {
	  	newState.listing.items = newState.listing.items.map(
	  		function(i) {
	  			return i.id == item.id ? item : i;
	  		}
	  	);
  	}

  	this.setState(newState);
  },

  onUpdateListingField: function(data) {
    var newState = this.state;

    newState.listing[data.field] = data.value;
    this.setState(newState);
  }
});

module.exports = listingStore;