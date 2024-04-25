import { useRef, useState } from "react";
import { API_URL } from "../../api/api";

export function XMLUploader({ onUploadSuccess, uploadUrl, disabled = false }) {
    const [statusMessage, setStatusMessage] = useState("")

    // useRef is the react way of getting an element reference like below:
    // const uploadInput = document.getElementById("file-input")
    const uploadInputRef = useRef(null)

    function uploadFile(e) {
        e.preventDefault()

        // Files is an array because the user could select multiple files
        // we choose to upload only the first selected file in this case.
        const file = uploadInputRef.current.files[0]

        // Fetch expects multi-part form data to be provided
        // inside a FormData object.
        const formData = new FormData()
        formData.append("xml-file", file)

        fetch(
            API_URL + uploadUrl,
            // API_URL + "/users/upload-xml",   // or API_URL + "/classes/upload-xml"
            {
                method: "POST",
                headers: {
                    // 'X-AUTH-KEY': 
                },
                body: formData
            }
        ).then(response => response.json()).then(APIResposneObject => {
            setStatusMessage(APIResposneObject.message)
            // Clear the selected file
            uploadInputRef.current.value = null
            // Notify of successful upload
            // if (typeof onUploadSuccess === "function") {   // typeof returns a string
            //     onUploadSuccess()
            // }
        }).catch(error => {
            setStatusMessage("Upload failed - " + error)
        })
    }

    return <div>
        <form onSubmit={uploadFile}>
            <div className="form-control m-2">
                <label className="label">
                    <span className="text-md">XML File Import</span>
                </label>
                <div className="">
                    <input 
                        ref={uploadInputRef}
                        type="file"
                        disabled={disabled}
                        className="file-input file-input-bordered file-input-primary mr-2" />
                    <button disabled={disabled} className="btn btn-secondary">Upload</button>
                </div>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
        </form>
    </div>
}