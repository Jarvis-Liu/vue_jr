import {get,post} from './http'

export default {
    register : params => post('api/api/users/register',params),
    login : params => post('api/api/users/login',params),
    allUsers() {
        return get('api/api/users/getAllUsers')
    },
    test(params) {
        return get('api/api/profiles',params)
    }
}
