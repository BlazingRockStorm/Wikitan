class ErrorMessage extends React.Component {
    render(){
        return "Error";
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
            error: (error) => {
                <ErrorMessage />
            }
        });
    }

    render(){
        return(
            <div>                    
                <div className="form-group">
                    <input id="searchTerm" className="input-sm" />
                    <button id="search" type="button" className="btn btn-primary"><span className="fa fa-search"></span></button>
                </div>
                <ul className="out-result">
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<MainApp />,document.getElementById("app"));