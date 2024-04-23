import Header from "../../common/Header";
import Nav from "../../common/nav";
import { XMLUploader } from "./XMLUploader";

export default function XMLUploadPage() {
    return <div>
        <Header />
        <div>
            <h2 className="text-xl text-center">Upload Classes</h2>
            <XMLUploader uploadUrl={"/classes/upload-xml"}/>
        </div>
        <div>
            <h2 className="text-xl text-center">Upload Trainers</h2>
            <XMLUploader uploadUrl={"/users/upload-xml"}/>
        </div>
        <Nav />
    </div>
}