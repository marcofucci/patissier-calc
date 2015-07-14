import React from 'react';


export default class BaseItemForm extends React.Component {
  static propTypes: {
    onSave: React.PropTypes.func.isRequired,
    item: React.PropTypes.object,
    isEditing: React.PropTypes.bool
  }

  constructor(props) {
    super(props);

    var item = this.props.item || this.getEmptyItem();
    this.state = {
      item: item,
      isNew: item.id <= 0 ? true : false,
      isEditing: this.props.isEditing
    }
  }

  getEmptyItem() {}

  _name() {
    if (!this.state.isEditing) {
      return this.state.item.name;
    }

    return <input type="text" placeholder="Name" value={this.state.item.name} onChange={this.onFieldChange.bind(this, 'name')} />;
  }

  _actionButtons() {
    if (!this.state.isEditing) {
      return <input className="button warning postfix" type="submit" value="Edit" onClick={this.enterEditMode} />;
    }

    return <input className="button postfix" type="submit" value="Save" onClick={this.save} />;
  }

  render() {}

  enterEditMode = () => {
    this.setState({
      isEditing: true
    });
  }

  exitEditMode = () => {
    this.setState({
      isEditing: false
    });
  }

  save = () => {
    var itemToSave = this.state.item;
    if (this.state.isNew) {
      this.setState({
        item: this.getEmptyItem()
      });
    } else {
      this.exitEditMode();
    }
    this.props.onSave(itemToSave);
  }

  onChange = (field, val) => {
    var nextState = this.state;
    nextState.item[field] = val;
    this.setState(nextState);
  }

  onFieldChange = (field, event) => {
    this.onChange(field, event.target.value);
  }
};
