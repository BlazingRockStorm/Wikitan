class SingleResult extends React.Component {
    render() {
        return (
            <li>
                <a href= {this.props.url} target='blank'>{this.props.title}</a>
                <p>{this.props.description}</p>
            </li>
        )
    }
}

class ResultList extends React.Component {
    render() {
        var results = this.props.results[1].map((result, index) => {
            return (
                <SingleResult key={index} title={this.props.results[1][index]} description={this.props.results[2][index]} url={this.props.results[3][index]}/>
            );
        });

        return (<ul className="out-result">{results}</ul>);
    }
}

class SearchForm extends React.Component {

    constructor() {
        super();
        this.state = {
          searchTerm: ''
        };
    }

    handleInputChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let searchTerm = this.state.searchTerm.trim(); // Remove whitespace at the beginning and end.

        if (!searchTerm) { // If no search term was typed, return early and do nothing.
            return;
        }

        this.props.onSearch(searchTerm); // Execute callback
        this.setState({ searchTerm: '' });
    }

    render() {
        return (
            <div className="form-group">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input id="searchTerm" className="input-sm" type="text" placeholder="Search for something..." onChange={this.handleInputChange.bind(this)} value={this.state.searchTerm}/>
                </form>
                <button id="search" type="button" className="btn btn-primary" onClick={this.handleSubmit.bind(this)}><span className="fa fa-search"></span></button>
            </div>
        );
    }
}

class MainApp extends React.Component {
    constructor() {
        super();
        this.state = {
            results: [
                '', [], [], []
            ]
        };
    }

    handleSearch(searchTerm) {
        $.ajax({
            type: 'GET',
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + searchTerm,
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            success: (data) => {
                this.setState({ results: data });
            },
            error: function () {
                $(".out-result").html("Error");
            }
        });
    }

    render(){
        return(
            <div>
                <SearchForm onSearch={this.handleSearch.bind(this)}/>
                <ResultList results={this.state.results}/>
            </div>
        );
    }
}

ReactDOM.render(<MainApp />,document.getElementById("app"));