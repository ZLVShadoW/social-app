import React from 'react';

import styles from './Pagination.module.scss'

type PaginationPropsType = {
    currentPage: number
    pageSize: number
    totalUsersCount: number
    openCurrentPage: (page: number) => void
}

type DirectionType = 'left' | 'right'

export const Pagination: React.FC<PaginationPropsType> =
    ({currentPage, pageSize, totalUsersCount, openCurrentPage}) => {

        let pagesCount = Math.ceil(totalUsersCount / pageSize)
        let pages: number[] = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        const [portionNum, setPortionNum] = React.useState(1)
        const [direction, setDirection] = React.useState<DirectionType>('right')

        const portionPageSize = 10
        const portionsCount = Math.ceil(pagesCount / portionPageSize)
        const leftLimit = (portionNum - 1) * portionPageSize + 1
        const rightLimit = portionNum * portionPageSize

        const onPortionNumDecHandler = () => {
            setPortionNum(prevState => prevState - 1)
            setDirection('left')
        }
        const onPortionNumIncHandler = () => {
            setPortionNum(prevState => prevState + 1)
            setDirection('right')
        }

        React.useEffect(() => {
            direction === 'left' ? openCurrentPage(rightLimit) : openCurrentPage(leftLimit)
        }, [portionNum])

        return (
            <div style={{
                margin: '10px 0',
                background: '#ddd',
                display: 'flex',
                justifyContent: 'center',
                gap: 5,
                height: 24,
            }}>
                {portionNum > 1 &&
                    <button onClick={onPortionNumDecHandler}> {'<<'} </button>}
                {pages
                    .filter(page => page >= leftLimit && page <= rightLimit)
                    .map(page => (
                        <button key={page}
                                className={currentPage === page ? styles.current : ''}
                                onClick={() => openCurrentPage(page)}>
                            {page}
                        </button>
                    ))
                }
                {portionsCount > portionNum &&
                    <button onClick={onPortionNumIncHandler}> {'>>'} </button>}
            </div>
        )
    }
