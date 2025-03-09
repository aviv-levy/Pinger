import { useContext, useState } from "react";
import '../CSS/inputs.css'
import comaxPic from '../assets/comax.jpg';
import { checkHosts, sendPing } from "../Services/ApiService";
import { LoadingContext } from "../App";
import { PingData } from "../Services/Interfaces";
import { PiComputerTower } from "react-icons/pi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import Error from "../Components/Error";


function PingerPage() {

    const [ip, setIP] = useState<string>("");
    const [gatewayResult, setGatewayResult] = useState<string>("");
    const [engineerResult, setEngineerResult] = useState<string>("");
    const [connectedHosts, setConnectedHosts] = useState<number>();
    const [error, setError] = useState<string>("");


    const loading = useContext(LoadingContext);


    function validateIP() {
        const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return regex.test(ip);
    }

    async function handlePing() {
        if (validateIP()) {
            try {
                setError("");
                loading?.setIsLoading(true);
                const Gateway: PingData = await sendPing(ip);
                Gateway.host ? setGatewayResult("Host is active") : setGatewayResult("Host is not active")
                Gateway.engineer ? setEngineerResult("Engineer is active") : setEngineerResult("Engineer is not active")

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
        else
            setError("IP is not correct");
    }

    async function handleCheckHosts() {
        if (validateIP()) {
            try {
                setError("");
                loading?.setIsLoading(true);
                const hosts: number = await checkHosts(ip) - 1; // -1 because it includes gateway as host
                setConnectedHosts(hosts);
            } catch (error) {
                if (error === 504) {
                    setError("Gateway unreachable")
                }
                console.error("Error sending ping:", error);
            } finally {
                loading?.setIsLoading(false);
            }
        }
        else
            setError("IP is not correct");
    }

    return (
        <>
            <div className="mt-5 pingerInput">
                <img src={comaxPic} alt="Comax" />
                <div className="form-group input-block mb-3">
                    <input
                        placeholder="Gateway/Hostname"
                        type="text"
                        value={ip}
                        onChange={(e) => { setIP(e.currentTarget.value) }}
                        required />
                    <Error errorText={error} />
                </div>
            </div>
            <div>
                <button className="btn btn-dark me-2" onClick={handlePing}>Check connection</button>
                <button className="btn btn-dark ms-2" onClick={handleCheckHosts}>Check connected hosts</button>
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
            {
                <span>Connected hosts:{connectedHosts}</span>
            }
        </>
    );
}

export default PingerPage;