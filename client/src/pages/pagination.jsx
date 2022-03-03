/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './styles/pagination.css'

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className='block_pagination'>
            <ul className="pagination">
                {pageNumbers.map(number => (
                <li
                    key={number}
                    className={`page-item ${currentPage === number ? "active" : ""}`}
                >
                    <a className="page-link" onClick={() => paginate(number)} style={{cursor: 'pointer'}}>
                    {number}
                    </a>
                </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;