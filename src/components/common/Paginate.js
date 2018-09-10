import React from 'react';

export default class Paginate extends React.Component{

  createPageItems = () => {
    const { startPage, endPage, handleClick, currentPage } = this.props;
    const pageNumbers = [];

    for(let i = startPage; i <= endPage; i++){
      pageNumbers.push(
        <li key={i}> <a
          onClick={handleClick(i)}
          className={`pagination-link ${currentPage === i ? 'is-current' : ''}`}
        > {i} </a> </li>
      );
    }

    return pageNumbers;
  }

  render(){
    // const { startPage, endPage } = this.props;
    return(
      <nav className="pagination">
        <ul className="pagination-list">
          {this.createPageItems()}
        </ul>
      </nav>
    );
  }
}
