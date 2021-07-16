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

  updateFilter = type  => {
    this.setState({ filter: type })
  }

  updateSort = sortBy => {
    this.setState({ sort: sortBy })
  }

  displayStocks = ()  =>{
    let stocks = this.state.stocks
    if (this.state.filter !== "All"){
      stocks = stocks.filter(stock => stock.type === this.state.filter)
    }

    switch(this.state.sort){
      case "Alphabetically":
        return stocks.sort((a,b) => a.name > b.name ? 1 : -1)
      case "Price":
          return stocks.sort((a,b) => a.price > b.price ? 1 : -1)
      default:
        return stocks
    }

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
