import { UserType } from "../types";

// const _func = <T = {[key: string]: any}>(arr: Array<T>, idInner: number, objPropName: any, newObjProps: {}) => {
//     return arr.map((item) => item[objPropName] === idInner ? {...item, ...newObjProps} : item)
// }

export const updateObjectInArray = (items: any[], item_ID: number, objPropName: string, newObjProps: any): any[] => {
    return items.map((i: any) => i[objPropName] === item_ID ? {...i, ...newObjProps} : i);
};

export const updatePropFollowed = (arr: Array<UserType>, idInner: number, falsy: boolean) => {
    return arr.map(user => user.id === idInner ? {...user, followed: falsy} : user)
}

