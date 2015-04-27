/* @jsx React.DOM */

var React = require('react');
var CommentList = require('./CommentList.jsx');
var CommentForm = require('./CommentForm.jsx');

var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke!", text: "This is *another* comment!"}
];


module.exports = React.createClass({
	getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
  	this.setState({data: data});
  },
  handleCommentSubmit: function(comment) {
  	var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
