import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react/jsx-runtime";

function SocialLogin() {
    return (
        <Fragment>
            <button className="w-full flex justify-center items-center bg-blue-600 rounded py-3 px-5 mb-3">
                <FontAwesomeIcon icon={faFacebook} className="text-white text-2xl" />
                <span className="w-full text-center text-white">
                    Continue with Facebook
                </span>
            </button>
            <button className="w-full flex justify-center items-center bg-red-500 rounded py-3 px-5 mb-3">
                <FontAwesomeIcon icon={faGoogle} className="text-white text-2xl" />
                <span className="w-full text-center text-white">
                    Continue with Google
                </span>
            </button>
        </Fragment>
    );
}

export default SocialLogin;