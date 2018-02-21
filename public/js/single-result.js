export class SingleResult extends React.Component {
    render() {
        return (
            <li>
                <a href= {this.props.url} target='blank'>{this.props.title}</a>
                <p>{this.props.description}</p>
            </li>
        )
    }
}