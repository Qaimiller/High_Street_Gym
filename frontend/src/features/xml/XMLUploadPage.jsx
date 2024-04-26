import { useState, useEffect } from "react";
import Header from "../../common/Header";
import Nav from "../../common/Nav.jsx";
import { useAuthentication } from "../authentication.jsx";
import { XMLUploader } from "./XMLUploader";

export default function XMLUploadPage() {
    const [user] = useAuthentication()
    const [name, setName] = useState("")

    useEffect(() => {
        if (user) {
            setName(user.first_name)
        }
    }, [user])

    return <div>
        <Header userFirstName={name}/>
        <div>
            <h2 className="badge badge-outline badge-primary text-l ml-2">Upload Classes</h2>
            <XMLUploader uploadUrl={"/classes/upload-xml"}/>
        </div>
        <div className="mt-10">
            <h2 className="badge badge-outline badge-secondary text-l ml-2">Upload Trainers</h2>
            <XMLUploader uploadUrl={"/users/upload-xml"}/>
        </div>
        <Nav />
    </div>
}