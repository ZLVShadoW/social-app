import {UserType} from '../api/api';

// const _func = <T = {[key: string]: any}>(arr: Array<T>, idInner: number, objPropName: any, newObjProps: {}) => {
//     return arr.map((item) => item[objPropName] === idInner ? {...item, ...newObjProps} : item)
// }

export const updatePropFollowed = (arr: Array<UserType>, idInner: number, falsy: boolean) => {
    return arr.map(user => user.id === idInner ? {...user, followed: falsy} : user)
}

