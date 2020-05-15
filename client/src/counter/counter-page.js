import React  from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export class CounterPage extends Component{

    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    async fetchValues(){
        const values = await axios.get("/api/values/current");
        this.setState({values: values.data});
    }

    async fetchIndexes(){
        const seenIndexes = await axios.get("/api/values/all");
        this.setState({
            seenIndexes: seenIndexes.data
        })
    }

 
    componentDidMount(){
        this.fetchValues();
        this.fetchIndexes();
    }

    renderSeenIndexes(){
        return this.state.seenIndexes.map(({number}) => {
            return number;
        }).join(', ');      
    }

    renderValues(){
        const entries = [];
        for(let key in this.state.values){
            entries.push(
                <div key={key}>
                    For index {key} I Calculated {this.state.values[key]}
                </div>
            );
        }   

        return entries;
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post("/api/values", {
            index: this.state.index
        });

        this.setState({
            index: ''
        })
    }

    render(){

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter your index:
                    </label>
                    <input value={this.state.index} onChange={event => this.setState({index: event.target.value})}/>
                    <button>Submit</button>
                </form>

                <h3>Indexes i have seen</h3>
                {this.renderSeenIndexes()}
                <h3>Calculated values</h3>
                {this.renderValues}
            </div>
        );
    }
}