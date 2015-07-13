import React from 'react';
import SettingsActions from '../../actions/SettingsActions.jsx';
import SettingsStore from '../../stores/SettingsStore.jsx';


export default class GeneralCosts extends React.Component {
  render() {
    return (
      <div>
        <header id="topbar" className="row main">
        	<span>Settings</span>
        </header>

        <hr />

        <div className="row main">
        </div>
      </div>
    );
	}
};
