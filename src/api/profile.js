import {get,post,_delete} from './http'

export default {
    profiles : () => get('api/api/profiles'),
    profilesByDate : params => get('api/api/profiles/bydate',params),
    add : params => post('api/api/profiles/add',params),
    edit : params => post('api/api/profiles/edit/'+params.id,params),
    delete : params => _delete('api/api/profiles/delete/'+params.id,params),
}
