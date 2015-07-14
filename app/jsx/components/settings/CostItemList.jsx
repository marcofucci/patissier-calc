import React from 'react';
import ItemForm from './CostItemForm.jsx';


export default class CostItemList extends React.Component {
  static propTypes: {
    onSave: React.PropTypes.func.isRequired,
    items: React.PropTypes.array.isRequired
  }

  render() {
    var self = this;
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
  }

  _onSave = (item) => {
    this.props.onSave(item);
  }
};
