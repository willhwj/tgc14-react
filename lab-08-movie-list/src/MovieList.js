import React from 'react'

export default class MovieList extends React.Component {
    state = {
        // minimally should have three sample data for testing
        // after we are done with test, we will delete the sample data
        'movies': [
            {
                '_id': 1,
                'title': 'The Lord of the Rings', // <-- textbox
                'genre': 'fantasy', // <-- radio or select dropdown
                'themes': ['heroic', 'epic'], // <-- checkboxes,
                'summary': "Two halfings simply walked into Mordor"
            },
            {
                '_id': 2,
                'title': 'The Return of the Jedi',
                'genre': 'science-fiction',
                'themes': ['heroic', 'epic'],
                'summary': "They are actually sisters and brothers"
            },
            {
                '_id': 3,
                'title': 'Dune',
                'genre': 'science-fiction',
                'themes': ['dark', 'epic', 'political'],
                'summary': "The spice must flow"
            }
        ],
        newMovieTitle:"",
        newMovieGenre:"",
        newMovieThemes:[],
        newMovieSummary:""
    }

    // update form field for text input type and radio buttons
    // remeber to use arrow functions for event handler
    updateFormField = (evt) => {
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }

    updateMovieCheckboxes = (evt) => {
        // check if the value that the user has clicked already exists
        // 1. if exists, then the user is UNCHECKING the box
        // 2. if does not exists, then the user is CHECKING the box
        if (this.state.newMovieThemes.includes(evt.target.value)) {
            let indexToRemove = this.state.newMovieThemes.indexOf(evt.target.value);
            let cloned = [ ...this.state.newMovieThemes.slice(0, indexToRemove), ...this.state.newMovieThemes.slice(indexToRemove+1)];
            this.setState({
                'newMovieThemes': cloned
            })
        } else {
            // clone the array
            let cloned = [ ...this.state.newMovieThemes, evt.target.value ];
            this.setState({
                'newMovieThemes': cloned
            })
        }
    }

    // display all movies
    displayMovies() {
        let movieJSX = [];
        for (let movie of this.state.movies) {

            // create the JSX for each movie
            // the key is only required for list rendering
            let eachMovieJSX = (<React.Fragment key={movie._id}>
                <div className="card my-3" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text">{movie.summary}</p>
                        <div>
                            <p>Genre: {movie.genre}</p>
                            <p>Themes: {movie.themes.join(", ")}</p>
                        </div>
                        <button className="btn btn-primary">Go somewhere</button>
                    </div>
                </div>
            </React.Fragment>)

            // push the JSX into the array
            movieJSX.push(eachMovieJSX);
        }

        return movieJSX;
    }

    displayAddForm() {
        return (<React.Fragment>
            <div>
                <label className="form-label">Movie:</label>
                <input type="text" name="newMovieTitle" className="form-control" value={this.state.newMovieTitle} onChange={this.updateFormField} />
            </div>
            <div>
                <label className="form-label">Summary:</label>
                <textarea name="newMovieSummary"
                 className="form-control"
                 value={this.state.newMovieSummary}
                 onChange={this.updateFormField}></textarea>
            </div>

            <div>
                <label className="form-label">Genre:</label>
                <div className="form-check-inline mx-1">
                    <input className="form-check-input mx-1" type="radio" value="fantasy" id="genre-fantasy" name="newMovieGenre" onChange={this.updateFormField} checked={this.state.newMovieGenre=='fantasy'}/>
                    <label className="form-check-label" htmlFor="genre-fantasy">
                        Fantasy
                    </label>
                </div>
                <div className="form-check-inline mx-1">
                    <input className="form-check-input mx-1" type="radio" value="science-fic" id="genre-science-fic" name="newMovieGenre" onChange={this.updateFormField} checked={this.state.newMovieGenre=='science-fic'}/>
                    <label className="form-check-label" htmlFor="genre-science-fic">
                        Science Fiction
                    </label>
                </div>
                <div className="form-check-inline">
                    <input className="form-check-input mx-1" type="radio" value="horror" id="genre-horror" name="newMovieGenre" onChange={this.updateFormField} checked={this.state.newMovieGenre=='horror'}/>
                    <label className="form-check-label" htmlFor="genre-horror">
                        Horror
                    </label>
                </div>
            </div>
            <div>
                <label className="form-label">Themes:</label>
                <div className="form-check-inline mx-1">
                    <input className="form-check-input mx-1" type="checkbox" value="heroic" id="theme-heroic" name="newMovieThemes" onChange={this.updateMovieCheckboxes} checked={this.state.newMovieThemes.includes('heroic')}/>
                    <label className="form-check-label" for="theme-heroic">
                        Heroic
                    </label>
                </div>
                <div className="form-check-inline mx-1">
                    <input className="form-check-input mx-1" type="checkbox" value="dark" id="theme-dark" name="newMovieThemes" onChange={this.updateMovieCheckboxes}  checked={this.state.newMovieThemes.includes('dark')}/>
                    <label className="form-check-label" for="theme-dark">
                        Dark
                    </label>
                </div>
                <div className="form-check-inline mx-1">
                    <input className="form-check-input mx-1" type="checkbox" value="epic" id="genre-epic" name="newMovieThemes" onChange={this.updateMovieCheckboxes}  checked={this.state.newMovieThemes.includes('epic')}/>
                    <label className="form-check-label" for="theme-epic">
                        Epic
                    </label>
                </div>
                <div className="form-check-inline mx-1">
                    <input className="form-check-input mx-1" type="checkbox" value="political" id="genre-political" name="newMovieThemes" onChange={this.updateMovieCheckboxes}  checked={this.state.newMovieThemes.includes('political')}/>
                    <label className="form-check-label" for="theme-polticial">
                        Political
                    </label>
                </div>
            </div>
            <button className="btn btn-success" onClick={this.createMovie}>Add Movie</button>
        </React.Fragment>)
    }


    // create new movie
    createMovie = () => {
        let newMovie = {
            "_id": Math.floor(Math.random() * 10000 + 9999),
            'title': this.state.newMovieTitle,
            'summary': this.state.newMovieSummary,
            'genre': this.state.newMovieGenre,
            'themes': this.state.newMovieThemes
        }

        // clone, update the original array, replace the original array with the clone
        this.setState({
            'movies' : [...this.state.movies, newMovie]
        })
    }

    render() {
        return (
            <React.Fragment>
                <h1>Add a Movie</h1>
                {/* display a form to add movie */}
                {this.displayAddForm()}

                <h1>Movies List</h1>
                {/* as long as the expression is an array of JSX elements,
                    React will perform list rendering */}
                {this.displayMovies()}
            </React.Fragment>

        )
    }
}