import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '7f6bcac5-aaf8-4abf-bee5-b24d79b89827'
    }
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    getUsersCurrentPage(page: number, pageSize: number) {
        return instance.get(`users?page=${page}&count=${pageSize}`).then(res => res.data)
    },
    follow(id: number){
        return instance.post(`follow/${id}`).then(res => res.data)
    },
    unfollow(id: number){
        return instance.delete(`follow/${id}`).then(res => res.data)
    }
}
