import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPeople, selectPeople } from './action';
import _ from 'lodash';

//import PeopleComponent from '../../components/People';

class People extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orderValue: 'default',
      orderBy: 'asc',
      favorites: ['Darth Vader']
    };

    this.handleFavorite = this.handleFavorite.bind(this);

    //event delegation to handle all click events in one function
    //check if th and set orderValue
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    //fetch the people list with Starwars API
    console.log('people did mount');
    this.props.fetchPeople();
  }

  handleSort(e){
    let element = e.target.tagName;
    let text = e.target.innerHTML.toLowerCase();
    console.log(element);
    if(element == 'TH'){
      //console.log(text);
      this.setState({
        orderValue: text,
        orderBy: (this.state.orderBy === 'asc' && this.state.orderValue === text) ? 'desc' : 'asc'
      });
    }
  }

  /*
  handleSortHeight() {
    this.setState({
      orderValue: 'height',
      orderBy: (this.state.orderBy === 'asc' && this.state.orderValue === 'height') ? 'desc' : 'asc'
    });
  }

  handleSortName() {
    this.setState({
      orderValue: 'name',
      orderBy: (this.state.orderBy === 'asc' && this.state.orderValue === 'name') ? 'desc' : 'asc'
    });
  }
  */

  handleFavorite(collection) {
    let index = this.state.favorites.indexOf(collection.name);
    //add this item to array
    //const data = this.state.favList;
    //let index = collection.url;
    console.log(collection.url);
    //decide toggle
    if(index >= 0) {
      this.setState({
        favorites: [ ...this.state.favorites.slice(0, index), ...this.state.favorites.slice(index + 1)]
      });
    }else {
      this.setState({
        favorites: [ ...this.state.favorites, collection.name ]
      });
    }
    ///set his star to full Star

  }

  renderPerson(){
    return(
      <div className="col-6">

        <p>
          <strong>Name: </strong>
          {this.props.person.name}
        </p>
        <p>
          <strong>Height: </strong>
          {this.props.person.height}
        </p>
        <p>
          <strong>Skin color: </strong>
          {this.props.person.skin_color}
        </p>
        <p>
          <strong>Vehicles: </strong>
          { (!this.props.person.vehicles) ? '-' : this.props.person.vehicles.map(function(v){ return v + ','; })}
        </p>
        <p>
          <strong>Species: </strong>
          { (!this.props.person.species) ? '-' : this.props.person.species.map(function(sp){ return sp + ','; })}
        </p>
        <p>
          <strong>Hair color: </strong>
          {this.props.person.hair_color}
        </p>
        <p>
          <strong>Mass: </strong>
          {this.props.person.mass}
        </p>

        <p>
          <strong>Films: </strong>
          { (!this.props.person.vehicles) ? '-' : this.props.person.films.map(function(film){ return film + ','; })}
        </p>

        <p>
          <strong>Birth year: </strong>
          {this.props.person.birth_year}
        </p>

        <p>
          <strong>Home World: </strong>
          {this.props.person.homeworld}
        </p>

        <p>
          <strong>Created: </strong>
          {this.props.person.created}
        </p>
      </div>
    );
  }

  renderPeople(){
    const orderValue = this.state.orderValue;
    const orderBy = this.state.orderBy;

    let unsortedResults = this.props.people.results;
    let displayResults;

    //Height
    let sortedByHeighOrderByAsc = _.sortBy(unsortedResults, function (obj) {
      return parseInt(obj.height, 10);
    });
    let sortedByHeighOrderByDesc = _.sortBy(unsortedResults, function (obj) {
      return -parseInt(obj.height, 10);
    });

    // Name
    let sortedByNameOrderByAsc = _.sortBy(unsortedResults, 'name');
    let sortedByNameOrderByDesc = _.sortBy(unsortedResults, 'name').reverse();

    // Gender

    // Date
    let sortedByDateOrderByAsc2 = _.sortBy(unsortedResults, 'created');
    let sortedByDateOrderByDesc2 = _.sortBy(unsortedResults, 'created').reverse();

    let sortedByDateOrderByAsc = _.sortBy(unsortedResults, function (obj){
      return new Date(obj+'');
    });

    let sortedByDateOrderByDesc = _.sortBy(unsortedResults, function (obj){
      return -new Date(obj+'');
    });

    //check state then render again
    switch (orderValue) {
      case 'default':
        displayResults = unsortedResults;
        break;
      case 'name':
        displayResults = (orderBy === 'asc') ? sortedByNameOrderByAsc : sortedByNameOrderByDesc;
        break;
      case 'height':
          displayResults = (orderBy === 'asc') ? sortedByHeighOrderByAsc : sortedByHeighOrderByDesc;
          break;
      case 'created':
          displayResults = (orderBy === 'asc') ? sortedByDateOrderByAsc2 : sortedByDateOrderByDesc2;
          break;
      default:
        displayResults = unsortedResults;
    }

    return _.map(displayResults, character => {
      return (
        <tr
          className="table__rows"
          key={character.url}
          data-item={character.url}
        >
          <td data-title="Favorite">

            <span
              onClick={() => this.handleFavorite(character)}
              className={(this.state.favorites.indexOf(character.name)>=0) ? ' glyphicon glyphicon-star' : 'glyphicon glyphicon-star-empty'}
            />

          </td>
          <td data-title="Name" >
            <a
              title="show more"
              onClick={() => this.props.selectPeople(character)}
            >
              {character.name}
            </a>
          </td>
          <td data-title="Gender">{character.gender}</td>
          <td data-title="Skin color">{character.skin_color}</td>
          <td data-title="Height">{character.height}</td>
          <td data-title="Created">{character.created}</td>
        </tr>
      );
    });
  }

  render() {
    //console.log(typeof(this.props.people.results));
    return (
        <div className="row">
          <div className="col-6">
            <h2>Characters in Starwars </h2>
            <p>this is the list of fav chars if any</p>
            <p>{this.state.favorites.join()}</p>
            <table className="table table-striped table-hover">
              <thead onClick={this.handleSort}>
                <tr>
                  <th>is Favorite</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Skin Color</th>
                  <th>Height</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {this.renderPeople()}
              </tbody>
            </table>
          </div>
            <h4>Characters in Detail </h4>
            { (this.props.person.name) ? this.renderPerson() : '' }

      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    people: state.people,
    person: state.activePeople
  };
}

export default connect(mapStateToProps, { fetchPeople, selectPeople })(People);
