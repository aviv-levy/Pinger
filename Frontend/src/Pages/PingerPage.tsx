import { useContext, useState } from "react";
import { sendPing } from "../Services/ApiService";
import { LoadingContext } from "../App";
import { PingData } from "../Services/Interfaces";
import { PiComputerTower } from "react-icons/pi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";


function PingerPage() {

    const [ip, setIP] = useState<string>("");
    const [gatewayResult, setGatewayResult] = useState<string>("");
    const [engineerResult, setEngineerResult] = useState<string>("");

    const loading = useContext(LoadingContext);


    async function handlePing() {
        try {
            loading?.setIsLoading(true);
            const Gateway: PingData = await sendPing(ip);
            Gateway.host ? setGatewayResult("Host is active") : setGatewayResult("Host is not active")
            Gateway.engineer ? setEngineerResult("Engineer is active") : setEngineerResult("Engineer is not active")

            console.log(Gateway.host);

        } catch (error) {
            if (error === 504) {
                setGatewayResult("Host is not active");
                setEngineerResult("Engineer is not active");
            }
            console.error("Error sending ping:", error);
        } finally {
            loading?.setIsLoading(false);
        }
    }

    return (
        <>
            <div className="mt-5 pingerInput">
                <div className="form-group input-block mb-3">
                    <input
                        placeholder="IP/Hostname"
                        type="text"
                        value={ip}
                        onChange={(e) => { setIP(e.currentTarget.value) }}
                        required />
                </div>
            </div>
            <div>
                <button className="btn btn-dark" onClick={handlePing}>Check connection</button>
            </div>

            {
                gatewayResult &&
                <div className="mt-5 d-flex justify-content-around w-50 m-auto">
                    <div className="d-flex flex-column align-items-center">
                        <PiComputerTower className={`fs-1 ${gatewayResult === "Host is active" ? 'text-success' : 'text-danger'}`} />
                        <span className="fw-bold">Gateway</span>
                        <span>{gatewayResult}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <HiOutlineWrenchScrewdriver className={`fs-1 ${engineerResult === "Engineer is active" ? 'text-success' : 'text-danger'}`} />
                        <span className="fw-bold">Engineer computer</span>
                        <span>{engineerResult}</span>
                    </div>
                </div>
            }
        </>
    );
}

export default PingerPage;