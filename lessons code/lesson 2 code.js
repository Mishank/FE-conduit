class Foo extends Component {
    constructor (props) {
        super(props)

        this.state = {
            searc: ''
        }
    }

    handleSearch (event) {
        this.setState({search: event.target.value})
    }
}

const Foo = ({onSearch}) => {
    const handleSearch =(event) => {
        onSearch(event.target.value)
    }
}

