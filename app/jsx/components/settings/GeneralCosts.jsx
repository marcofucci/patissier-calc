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
          <div className="row">

            <div className="large-8 columns">
              11
            </div>

            <div className="large-4 columns">
              22
            </div>

          </div>
        </div>
      </div>
    );
	}
};
