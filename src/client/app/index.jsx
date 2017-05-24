import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class MainPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            controlledDate: null,
            isToggleOn: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, date) {
        this.setState({
            controlledDate: date,
            isToggleOn: true,
        });
    };

    render() {
        return (
            <div>
                <DatePicker
                    hintText="Controlled Date Input"
                    onChange={this.handleChange}
                    value={this.state.controlledDate}
                />
                {this.state.isToggleOn ?
                    <AdditionalPicker
                        value={this.state.controlledDate}
                        hintText="Please choose value more or equal date than current"/> : ''}
            </div>
        );
    }
}

class AdditionalPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            controlledDate: props.value,
            choseDate: null,
            currentDate: new Date(),
            selected: props.value,
        };

        this.handleChange = this.handleChange.bind(this);
        this.disableDays = this.disableDays.bind(this);
        this.setDefaultMonth = this.setDefaultMonth.bind(this);
    }

    setDefaultMonth() {
        const date = this.state.controlledDate;
        this.setState({
            selected: date,
        });
    };

    handleChange(event, date) {
        console.log("Current chosen date = " + date);
        this.setState({
            choseDate: date,
        });
    };

    disableDays(startDate) {
        return function (date) {
            return Date.parse(date) < Date.parse(startDate);
        }
    }

    render() {
        return (
            <div>
                <DatePicker
                    onChange={this.handleChange}
                    onFocus={this.setDefaultMonth}
                    selected={this.state.selected}
                    hintText="Please choose value more or equal date than current"
                    shouldDisableDate={this.disableDays(this.state.controlledDate)}/>
            </div>
        );
    }
}

const App = () => (
    <MuiThemeProvider>
        <MainPicker />
    </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));