import API from './api/API';

export default class AdminServices {

    //GET
    static GetGroups = async () => {
        return await API.GET('admin/groups/');
    }
    static GetGameDashboard = async (id) => {
        return await API.GET('admin/game/' + id);
    }
    static GetScoreboard = async (group) => {
        return await API.GET('admin/scoreboard/' + group);
    }
    static GetDashboard = async () => {
        return await API.GET('admin/dashboard/');
    }
    static GetQRForAttendance = (id, key) => {
        var url = `https://teorijaigara.netlify.app/attend/${id}/${key}`;
        return `http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=200x200`;
    }

    //POST
    static GenerateNewAttendance = async (event) => {
        return await API.POST('admin/lesson/' + event + '/');
    }

    //DELETE
}