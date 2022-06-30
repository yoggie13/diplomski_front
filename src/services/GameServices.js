
import API from './api/API';

export default class UserServices {

    //GET
    static GetAllGames = async () => {
        return await API.GET('game/all/');
    }
    static GetGame = async (id, studentID) => {
        return await API.GET(`game/${studentID}/${id}/`);
    }
    static GetModels = async () => {
        return await API.GET('game/models/');
    }
    static GetGameForPayoffs = async (id) => {
        return await API.GET('game/creation/' + id);
    }
    static GetActiveGames = async (id) => {
        return await API.GET('game/active/' + id)
    }
    static GetFinishedGames = async (id) => {
        return await API.GET('game/finished/' + id)
    }
    static GetMessages = async (gameID, studentID) => {
        return await API.GET(`game/${gameID}/${studentID}/messages/`);
    }

    //POST
    static PlayGame = async (gameID, studentID, data) => {
        return await API.POST(`game/${gameID}/${studentID}/`, data);
    }
    static InsertGame = async (data) => {
        return await API.POST('game/create/', data);
    }
    static SendMessage = async (gameID, studentID, message) => {
        return await API.POST(`game/${gameID}/${studentID}/message/`, message)
    }
    static InsertPayoffs = async (gameID, Payoffs) => {
        return await API.POST(`game/${gameID}/addPayoffs/`, Payoffs);
    }
    static RepeatGame = async (gameID, data) => {
        return await API.POST(`game/${gameID}/repeat/`, data)
    }
    static FinishGame = async (id) => {
        return await API.POST(`game/${id}/finish/`);
    }

    //DELETE
    static DeleteGame = async (id) => {
        return await API.DELETE('game/' + id + '/');
    }
}