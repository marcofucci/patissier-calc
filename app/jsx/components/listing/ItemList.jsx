import React from 'react';
import ItemForm from './ItemForm.jsx';


export default class ItemList extends React.Component {
  static propTypes: {
    onSave: React.PropTypes.func.isRequired,
    items: React.PropTypes.array.isRequired,
    onPurchasePriceChange: React.PropTypes.func.isRequired
  }

  render() {
    var self = this;
    var items = this.props.items;
    var onSaveFunc = this._onSave;

  	var itemNodes = items.map(function (item) {
      return (
        <ItemForm item={item} onPurchasePriceChange={self.props.onPurchasePriceChange} onSave={onSaveFunc} />
      );
    });
    return (
      <div>
        {itemNodes}
      </div>
    );
  }

  _onSave = (item) => {
    this.props.onSave(item);
  }
};
