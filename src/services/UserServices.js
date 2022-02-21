import API from './api/API';

export default class UserServices {

    //GET
    static GetNotificationsCount = async (id) => {
        return await API.GET('user/notifications/count/' + id)
    }
    static GetScoreboard = async (id) => {
        return await API.GET('student/scoreboard/' + id);
    }

    //POST
    static Login = async (email, password) => {
        return await API.POST('user/login', {
            Email: email,
            Password: password
        })
    }
    static GetNotifications = async (id) => {
        return await API.POST('user/notifications/' + id)
    }
    static ReportAProblem = async (data) => {
        return await API.POST('student/report/', data)
    }
    static ChangePassword = async (data) => {
        return await API.POST('user/changePass', data)
    }
}