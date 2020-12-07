import React, { Component } from "react";
import "./Shan.css";

class Shan extends Component {
  getColor() {
    if (this.props.votes >= 15) {
      return "#4CAF50";
    } else if (this.props.votes >= 12) {
      return "#8BC34A";
    } else if (this.props.votes >= 9) {
      return "#CDDC39";
    } else if (this.props.votes >= 6) {
      return "#FFEB3B";
    } else if (this.props.votes >= 3) {
      return "#FFC107";
    } else if (this.props.votes >= 0) {
      return "#FF9800";
    } else {
      return "#f44336";
    }
  }

  getEmoji() {
    if (this.props.votes >= 15) {
      return "em em-100";
    } else if (this.props.votes >= 12) {
      return "em em-raised_hands";
    } else if (this.props.votes >= 9) {
      return "em em-smiley";
    } else if (this.props.votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if (this.props.votes >= 3) {
      return "em em---1";
    } else if (this.props.votes >= 0) {
      return "em em-confused";
    } else {
      return "em em--1";
    }
  }
  render() {
    return (
      <div className='Shan'>
        <div className='Shan-buttons'>
          <i className='fas fa-arrow-up' onClick={this.props.upvote} />
          <span className='Shan-votes' style={{ borderColor: this.getColor() }}>
            {this.props.votes}
          </span>
          <i className='fas fa-arrow-down' onClick={this.props.downvote} />
        </div>
        <div className='Shan-text'>{this.props.text}</div>
        <div className='Shan-smiley'>
          <i className={this.getEmoji()} />
        </div>
      </div>
    );
  }
}
export default Shan;
