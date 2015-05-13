/* @jsx React.DOM */

var React = require('react');

var spanStyle = {
  fontSize: '2.5rem',
  marginRight: '1rem'
};

var ContentEditable = React.createClass({
  render: function(){
    return (
      <span
        style={spanStyle}
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{__html: this.props.html}}></span>
    );
  },
  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.getDOMNode().innerHTML;
  },
  emitChange: function(){
    var html = this.getDOMNode().innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
            value: html
        }
      });
    }
    this.lastHtml = html;
  }
});

module.exports = ContentEditable;
