import API from './api/API';

export default class AdminServices {

    //GET
    static GetGroups = async () => {
        return await API.GET('admin/groups');
    }
    static GetGameDashboard = async (id) => {
        return await API.GET('admin/game/' + id);
    }
    static GetScoreboard = async (group) => {
        return await API.GET('admin/scoreboard/' + group);
    }
    static GetDashboard = async () => {
        return await API.GET('admin/dashboard');
    }

    //POST


    //DELETE
}