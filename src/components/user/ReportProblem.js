import React from 'react'
import { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Loading from '../Loading';
import UserServices from '../../services/UserServices';


export default function ReportProblem({ userID }) {

    const [checkboxState, setCheckboxState] = useState(false);
    const [reportState, setReportState] = useState({ Type: "Loše računanje bodova", Description: "", ImageUrl: "" });
    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        document.title = "Prijava problema | Teorija igara"
    }, []);

    const fieldInvalid = (field) => {
        return field === "" || field === null || field === undefined
    }

    const reportHandler = async (e) => {
        e.preventDefault();

        if (!checkboxState) {
            alert("Morate prihvatiti saglasnost");
            return;
        }

        if (fieldInvalid(reportState.Type)) {
            alert("Morate izabrati tip problema");
            return;
        }
        if (fieldInvalid(reportState.Description)) {
            alert("Morate uneti opis problema");
            return;
        }

        setLoadingState(true);

        var res = await UserServices.ReportAProblem({
            Type: reportState.Type,
            Description: reportState.Description,
            ImageUrl: null,
            SubmittedByID: userID,
        });

        if (res.status === 200) {
            setLoadingState(false);
            alert("Vaš feedback je zabeležen");
        }
        else {
            setLoadingState(false);
            alert("Nije uspelo, pokušajte ponovo");
        }

    }
    const handleUpload = e => {
        e.preventDefault();
        return;
    }
    const handleCheck = e => {
        setCheckboxState(!checkboxState);
    }

    return (
        <div className="FormClass" id="reportProblem">
            {
                loadingState
                    ? <Loading />
                    : <form id="reportProblemForm" action="#">
                        <label htmlFor="problemType">
                            Tip problema*
                        </label>
                        <select required id="problemType" value={reportState.Type} onChange={e => setReportState({ ...reportState, Type: e.target.value })} >
                            <option id="1" value="Loše računanje bodova">
                                Loše računanje bodova
                            </option>
                            <option id="2" value="Ne učitava mi se stranica">
                                Ne učitava mi se stranica
                            </option>
                            <option id="3" value="Ne mogu da odigram">
                                Ne mogu da odigram
                            </option>
                            <option id="4" value="Ostalo">
                                Ostalo
                            </option>
                        </select>
                        <label htmlFor="problemDescription">
                            Kratak opis problema*
                        </label>
                        <textarea required id="problemDescription" value={reportState.Description} onChange={e => setReportState({ ...reportState, Description: e.target.value })}></textarea>
                        {/* <label htmlFor="problemPhoto">
                            Prilog skrinšota
                        </label>
                        <input type="file" accept="image/*" value={reportState.ImageUrl} onChange={handleUpload} id="problemPhoto" /> */}
                        <div className="acceptTerms">
                            <small>Saglasan/na da pošaljem svoj indeks uz opis problema</small>
                            <Checkbox
                                checked={checkboxState}
                                onClick={handleCheck}
                                color={'primary'}
                            />
                        </div>
                        <input type="submit" value="Pošalji" onClick={reportHandler} />
                    </form>
            }
        </div >

    )
}
