import React, { Component } from 'react';
import './App.css';
import NotesList from './NotesList';
import { getNotes } from '../actions';
import { connect } from 'react-redux';
import NoteForm from './NoteForm';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Note from './Note';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        notes: [],
        noteTitleInput: '',
        noteBodyInput: '',
    }
  }

  componentDidMount() {
    this.getNotes();
  }

  getNotes = () => {
    axios
    .get('https://killer-notes.herokuapp.com/note/get/all')
    .then(response => {
        this.setState({ notes: response.data });
    })
    .catch(error => {
    console.error('Server Error', error);
    });
  }

  createNote = event => {
    event.preventDefault();
    const newNote = { 
      title: this.state.noteTitleInput, 
      textBody: this.state.noteBodyInput, 
    };
    
    axios
    .post(
      'https://killer-notes.herokuapp.com/note/create', 
      newNote
    )
    .then(response => {
      console.log('hey');
      console.log(`POST REPONSE: `, response.data);
      this.getNotes();
    })
    .catch(error => {
      console.error('Server Error', error);
    });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

 
  render() {
    return (
      <div className="App">
     
        <form onSubmit={this.createNote}>

          <input 
              name='noteTitleInput'
              type='text'
              placeholder='Note Title'
              value={this.state.noteTitleInput}
              onChange={this.handleInputChange}
          />

          <input 
              name='noteBodyInput'
              type='text'
              placeholder='Note Body'
              value={this.state.noteBodyInput}
              onChange={this.handleInputChange}
          />

          <button type='submit'>
              Create Note
          </button>
        </form>

        {/* <NotesList 
          notes= {this.state.notes} 
        /> */}
        <Route 
          exact 
          path='/notes' 
          render={props => (
            <NotesList {...props} notes={this.state.notes} />
          )}
        />
        <Route 
          path='/notes/:id' 
          render={props => (
            <Note {...props} notes={this.state.notes} />
          )}
        />
        
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   // const { notesReducer } = state;
//   return {
//       notes: state.notes,
//   };
// }

// export default connect(
//     mapStateToProps,
//     { getNotes }
// )(App);

export default App;