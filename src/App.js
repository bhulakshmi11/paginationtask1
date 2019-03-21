import React from 'react';
import './App.css';
import axios from "axios";
// import Hello from "./Hello"

class App extends React.Component {

  constructor() {
    super();
    this.state = { animation: [], itemsPerPage: 4, pageData: [], currentPage: 0, totalPages: 0 };
  }

  componentDidMount() {
    axios.get('https://reqres.in/api/users?page=1').then(res => {
      this.setState({ animation: res.data.data });
      let pageData = res.data.data.slice(this.state.currentPage * this.state.itemsPerPage, (this.state.currentPage + 1) * this.state.itemsPerPage);
      let totalPages = Math.ceil(res.data.data.length / this.state.itemsPerPage)
      this.setState({ pageData, totalPages })
    })
  }
  pageClick(pageNo) {
    let pageData = this.state.animation.slice(pageNo * this.state.itemsPerPage, (pageNo + 1) * this.state.itemsPerPage);
    this.setState({ pageData, currentPage: pageNo });
  }

  calculatePages() {
    let totalPages = Math.ceil(this.state.animation.length / this.state.itemsPerPage)
    let pageData = this.state.animation.slice(this.state.currentPage * this.state.itemsPerPage, (this.state.currentPage + 1) * this.state.itemsPerPage);
    this.setState({ totalPages, pageData });
  }

  returnPages() {
    let arr = [];
    for (let i = 0; i < this.state.totalPages; i++) {
      arr.push(<div className={`page ${this.state.currentPage == i ? 'activePage' : ''}`} onClick={() => { this.pageClick(i) }}>{i + 1}</div>);
    }
    return arr;
  }

  render() {
    return <div>
      <div className="divNavBar">
        <div className="divLogo">MyLogo</div>
        <div className="divRightNav">
          <div className="navItem">About</div>
          <div className="navItem">Kill</div>
        </div>
      </div>
      <input type="number" placeholder="Items per page" value={this.state.itemsPerPage} onChange={(ev) => { this.setState({ itemsPerPage: ev.target.value }) }} />
      <label>{this.state.itemsPerPage}</label>
      <button onClick={() => { this.calculatePages() }}>Enter</button>
      <div className="divImages">
        {
          this.state.pageData.map((e) => {
            return (<span>
              
            <img className="avatar_1" src={e.avatar} />
            <span className="user_name">{e.first_name}{e.last_name}</span>
            </span>
            );
          })
        }
      </div>
      {
        this.returnPages()
      }
    </div>
  }

}

export default App;