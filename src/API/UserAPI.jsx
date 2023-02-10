import axiosClient from './axiosClient'

const UserAPI = {

    getAllData: () => {
        const url = '/users'
        return axiosClient.get(url)
    },

    getDetailData: (id) => {
        const url = `/user/${id}`
        return axiosClient.get(url)
    },

    postSignUp: (query) => {
        const url = `/user/signup/${query}`
        return axiosClient.post(url)
    }

}

export default UserAPI