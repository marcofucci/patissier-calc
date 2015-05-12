var alt = require('../alt')

var ListingActions = require('../actions/ListingActions.jsx')

var data = [
  {
    id: 1,
    name: "Milk",
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
    name: "Water",
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
];

var listingStore = alt.createStore({
  displayName: 'ListingStore',
  state: {
  	items: data
  },

  bindListeners: {
    onCreateOrUpdate: ListingActions.CREATE_OR_UPDATE
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

  onCreateOrUpdate: function(item) {
  	var newState = this.state;

  	if (item.id == -1) {
			item['id'] = newState.items.length+1;
	    newState.items.push(item);
	  } else {
	  	newState.items = newState.items.map(
	  		function(i) {
	  			return i.id == item.id ? item : i;
	  		}
	  	);
  	}

  	this.setState(newState);
  }
});

module.exports = listingStore;