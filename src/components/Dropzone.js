import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import '../assets/styles/Dropzone.css'

export default function Dropzone({ setImage, index, setShowUploadImageState, ImageName }) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = () => {
        if (ImageName === null) {
            return acceptedFiles.map(file => (
                <li key={file.path}>
                    {file.path} - {file.size} bytes
                </li>
            ))
        }
        else {
            return (<li key={1}>
                {ImageName}
            </li>)
        }
    };

    var prevAcceptedFile = null;
    const imgbbUploader = require('imgbb-uploader');

    const getBase64 = file => {
        return new Promise(resolve => {
            let fileInfo;
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);

            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    const getImage = async () => {
        var image = acceptedFiles[0];

        var result = await getBase64(image);
        result = result.replace("data:image/png;base64,", "");

        var response = await imgbbUploader({
            apiKey: "e92672031318b81cecc7d830e6fc3b12",
            base64string: result
        })
        return {
            url: response.url,
            name: image.name
        }
    }

    useEffect(() => {
        if (acceptedFiles.length > 0 && acceptedFiles[0] !== prevAcceptedFile) {
            handleImage();
        }
    }, [acceptedFiles])

    const handleImage = async () => {
        var image = await getImage();
        setImage(index, image);
        prevAcceptedFile = acceptedFiles[0];
    }

    const handleClose = (e) => {
        e.preventDefault();
        setImage(index, null)
        setShowUploadImageState(false)
    }
    return (
        <div className="Dropzone">
            <div className="dropzone-header" >
                <i className="fas fa-times" onClick={e => handleClose(e)}></i>
            </div>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Klikni ili prevuci sliku</p>
            </div>
            <aside>
                <small>{files()}</small>
            </aside>
        </div>
    )
}
