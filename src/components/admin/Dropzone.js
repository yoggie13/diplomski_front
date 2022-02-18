import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

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

    useEffect(() => {
        if (acceptedFiles.length > 0 && acceptedFiles[0] !== prevAcceptedFile) {
            setImage(index, acceptedFiles[0]);
            prevAcceptedFile = acceptedFiles[0];
        }
    }, [acceptedFiles])

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
