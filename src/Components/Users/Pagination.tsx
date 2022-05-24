import React from 'react';

import styles from './Pagination.module.scss'

type PaginationPropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    openCurrentPage: (page: number) => void
}

export const Pagination: React.FC<PaginationPropsType> =
    ({currentPage, pageSize, totalUsersCount, openCurrentPage}) => {

        let pagesCount = Math.ceil(totalUsersCount / pageSize)
        let pages: number[] = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return (
            <div style={{
                margin: '10px 0',
                background: '#ddd',
                display: 'flex',
                gap: 5,
                height: 24,
                overflow: 'hidden'
            }}>
                {pages.map(page => (
                    <button key={page}
                            className={currentPage === page ? styles.current : ''}
                            onClick={() => openCurrentPage(page)}>
                        {page}
                    </button>
                ))
                }
            </div>
        )
    }
