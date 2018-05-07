import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import People from '../People';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="display-1">
          Starwars - May the force be with you at PROD-TT22
        </h1>
        <People />
      </div>
    );
  }
}

App.propTypes = {
  //children: PropTypes.element
};

People.propTypes = {

}
export default App;
