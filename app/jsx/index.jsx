/* @jsx React.DOM */

import React from 'react';
import Router from 'react-router';

import Listing from './components/listing/Listing.jsx';
import GeneralCosts from './components/settings/GeneralCosts.jsx';

var { Route, RouteHandler, Link, Redirect } = Router;


// MAIN APP
var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render() {
    var name = this.context.router.getCurrentPath();
    return (
    	<section id="content" class="container">
				<nav className="top-bar" data-topbar>
				  <section className="top-bar-section">
				    <ul className="right">
              <li><Link to="listing"><i className="fi-list"></i></Link></li>
				      <li><Link to="settings"><i className="fi-widget"></i></Link></li>
				    </ul>
				  </section>
				</nav>

	    	<RouteHandler key={name}/>
    	</section>
    );
  }
});


// ROUTES
var routes = (
  <Route handler={App} path="/">
	  <Route name="listing" path="/listing" handler={Listing} />
    <Route name="settings" path="/settings">
      <Route name="general-costs" path="/settings/general-costs" handler={GeneralCosts} />
      <Redirect from="/settings" to="/settings/general-costs" />
    </Route>
    <Redirect from="/" to="/listing" />
  </Route>
);



Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});