import React from 'react';

var spanStyle = {
  fontSize: '2.5rem',
  marginRight: '1rem'
};

export default class ContentEditable extends React.Component {
  render() {
    return (
      <span
        style={spanStyle}
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.props.html}}></span>
    );
  }

  shouldComponentUpdate = (nextProps) => {
    return nextProps.html !== React.findDOMNode(this).innerHTML;
  }

  emitChange = () => {
    var html = React.findDOMNode(this).innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
            value: html
        }
      });
    }
    this.lastHtml = html;
  }
};
