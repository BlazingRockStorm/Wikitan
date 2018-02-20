class MainApp extends React.Component {
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