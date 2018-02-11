import React, { Component } from 'react';

import Page from './Page';
import './css/AdminPage.css';

class Header extends Component {
  render() {
    return (
      <div className="app-header theme-text-header-normal">
        <div className="app-container">
          <div className="app-screen-panel">
            <span className="logo" > <img src="/static/images/Alexa.png" height="40" width="40"/></span>
            <span className="text">{this.props.screenTitle}</span>
            <span className="text theme-text-header-idle">
              &nbsp;/&nbsp;{this.props.contextTitle}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

class DataRow extends Component {
  render() {
    const { idx, query, response, time, duration } = this.props.data;


    let klass = this.props.header === true ?
                "data-row-header theme-text-header-normal" :
                "data-row theme-text-light";

    return (
      <div className={ "table-row " + klass } >
        <div className="data-item col-fixed data-sn">{idx}</div>
        <div className="data-item col-f1 data-query">{query}</div>
        <div className="data-item col-f2 data-resp">{response}</div>
        <div className="data-item col-f1 data-time">{time}</div>
        <div className="data-item col-f1 data-duration">{duration}</div>
      </div>
    )
  }
}

class DataTable extends Component {
  constructor(props) {
    super(props);

    this.header = { 
      idx:"#", query:"Query Text", response:"Response",
      time:"Time", duration:"Duration"
    }
  }

  render() {
    const placeholderTxt = this.props.data.length === 0 ?
                           "No data available" : undefined;

    let rowData = [];
    rowData = this.props.data.map((value,idx) => {
      return <DataRow data={value} key={ "data-table-row-item-" + idx } />
    });

    let table = (
      <div className="data-table">
      <DataRow data={this.header} header={true} />
      { rowData }
      </div>
    );

    let dispData = placeholderTxt ? (
      <div className="no-data-wrapper">{placeholderTxt}</div>
    ) : table;

    return dispData;
  }
}

class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick && this.props.onClick(event);
  }

  render() {
    return (
      <button className="action-btn" onClick={this.handleClick}>
        {this.props.text}
      </button>
    )
  }
}

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);

    this.state = { dummyData: [] };
  }

  fetchData(event) {
    let tableData = [];

    fetch('https://randomuser.me/api/?results=4').then((response) => {
      return response.json();
    }).then((response) => {
      tableData = response.results.map((value, idx) => {
        return {
          'idx': idx + 1, query: value.name.first + " " + value.name.last,
          response: value.email, time: value.dob, duration: value.phone
        }
      });

      // console.log(tableData);
      this.setState({ dummyData: [ ...tableData ] });
    });
  }

  render() {
    return (
      <Page>
        <Header screenTitle="Alexa" contextTitle="Logs" />
          <div className="app-content app-container">
          <div className="btn-panel">
            <Button btnClass="btn-clear" text="Fetch Logs" onClick={this.fetchData} />
          </div>
          <DataTable data={ this.state.dummyData } />
        </div>
      </Page>
    )
  }
}

export default AdminPage;
