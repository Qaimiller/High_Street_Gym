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
        <div className="flex flex-col items-center">
            <h2 className="text-xl text-center">Upload Classes</h2>
            <XMLUploader uploadUrl={"/classes/upload-xml"}/>
        </div>
        <div className="flex flex-col items-center">
            <h2 className="text-xl text-center">Upload Trainers</h2>
            <XMLUploader uploadUrl={"/users/upload-xml"}/>
        </div>
        <Nav />
    </div>
}