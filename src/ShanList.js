import React, { Component } from "react";
import Shan from "./Shan";

import { v4 as uuid } from 'uuid';
import "./ShanList.css";

class ShanList extends Component {
  static defaultProps = {
    numJokesToGet: 10
  };
  constructor(props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handletaskChange = this.handletaskChange.bind(this);
    this.handlebyChange = this.handlebyChange.bind(this);
    this.seenJokes = new Set(this.state.jokes.map(j => j.text));
    console.log(this.seenJokes);
    this.handleClick = this.handleClick.bind(this);
  }

  handleUpdate(evt) {
    evt.preventDefault();
    //take new task data and pass up to parent
    this.props.updateTodo(this.props.id, this.state.task);
    
  }
  
  handletaskChange (e) {
    this.setState({task: e.target.value});
  }
  handlebyChange (e) {
    this.setState({task: e.target.value});
  }

  
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }
  async getJokes() {
    try {
      let jokes = [];
      // while (jokes.length < this.props.numJokesToGet) {
      //   let res = await axios.get("https://icanhazdadjoke.com/", {
      //     headers: { Accept: "application/json" }
      //   });

        // let newJoke = res.data.joke;

        
        let newJoke = this.state.task;
        
        

        
        if (!this.seenJokes.has(newJoke)) {
          jokes.push({ id: uuid(), text: newJoke, votes: 0 });
        } else {
          console.log("FOUND A DUPLICATE!");
          console.log(newJoke);
        }
      // }
      this.setState(
        st => ({
          loading: false,
          jokes: [...st.jokes, ...jokes]
        }),
        () =>
          window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
      );
    } catch (e) {
      alert(e);
      this.setState({ loading: false });
    }
  }
  handleVote(id, delta) {
    this.setState(
      st => ({
        jokes: st.jokes.map(j =>
          j.id === id ? { ...j, votes: j.votes + delta } : j
        )
      }),
      () =>
        window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
    );
  }
  handleClick() {
    this.setState({ loading: true }, this.getJokes);
  }
  render() {
    if (this.state.loading) {
      return (
        <div className='ShanList-spinner'>
          <i className='far fa-8x fa-laugh fa-spin' />
          <h1 className='ShanList-title'>Loading...</h1>
        </div>
      );
    }
    let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
    return (
      <div className='ShanList'>
        <div className='ShanList-sidebar'>
          <h1 className='ShanList-title'>
            <span>SOCIO</span> speaks
          </h1>
          {/* <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' /> */}
          {/* <button className='ShanList-getmore' onClick={this.handleClick}>
            Fetch Jokes
          </button> */}
          <form className='ShanList-getmor' >
            <input
              type='text'
              value={this.props.task}
              name='task'
              onChange={this.handletaskChange}
            />
            
            <button className='ShanList-getmore' onClick={this.handleClick}>
            Save
          </button>
            
          </form>
        </div>

        <div className='ShanList-jokes'>
          {jokes.map(j => (
            <Shan
              key={j.id}
              votes={j.votes}
              text={j.text}
              upvote={() => this.handleVote(j.id, 1)}
              downvote={() => this.handleVote(j.id, -1)}
            />
          ))}

          
        </div>
      </div>
    );
  }
}
export default ShanList;
