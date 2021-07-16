import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    // to save fetched data
    stocks: [],
    filter: "All",
    sort: 'None',
    portfolioIds: []
  }

  // fetch data
  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(response => response.json())
    .then(data => {
      this.setState({stocks: data})
    })
  }
// add new pId to state
  addPortfolioId = (id) => {
    if (!this.state.portfolioIds.find(pId => pId === id)){
      this.setState({
        portfolioIds: [...this.state.portfolioIds, id]
      })
    }
  }

  // remove stock from portfolioId
  removeStock = (id) => {
    this.setState({
      portfolioIds: this.state.portfolioIds.filter(stock => stock !==id)
    })
  }



  render() {
    return (
      <div>
        <SearchBar/>

          <div className="row">
            <div className="col-8">

              <StockContainer />

            </div>
            <div className="col-4">

              <PortfolioContainer/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
