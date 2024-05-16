import SocialLogin from "./SocialLogin";

// user type, first name, last name, username, email, password, confirm password
const userTypes = [{ label: "Researcher", value: "researcher" }, { label: "Investor", value: "investor" }, { label: "Institution Staff", value: "institution_staff" }, { label: "Service Provider", value: "service_provider" }]

function SignUpForm() {

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
                <div className="w-full"> {/* lg:w-1/2 */}
                    <div className="mb-6 flex flex-col mx-2">
                        <label htmlFor="birth-date" className="mb-2">
                            User Type
                        </label>
                        <div className="w-full flex rounded-xl overflow-hidden">
                            <select
                                typeof="month"
                                className="min-h-[54px] leading-10 bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100 w-full px-4"
                            >
                                <option hidden selected>
                                    User Type
                                </option>
                                {
                                    userTypes.map(({ label, value }, i) => (
                                        <option value={value} key={i}>
                                            {label}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col mb-6 mx-2">
                        <label htmlFor="first-name" className="mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
                            id="first-name"
                            placeholder="Your First Name"
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col mb-6 mx-2">
                        <label htmlFor="last-name" className="mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
                            id="last-name"
                            placeholder="Your Last Name"
                        />
                    </div>
                </div>
                {/* usertype */}
                <div className="w-full">
                    <div className="flex flex-col mb-6 mx-2">
                        <label htmlFor="username" className="mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
                            id="username"
                            placeholder="Your Username"
                        />
                    </div>
                </div>
                <div className="w-full">
                    <div className="flex flex-col mb-6 mx-2">
                        <label htmlFor="email" className="mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
                            id="email"
                            placeholder="Your Email"
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col mb-6 mx-2">
                        <label htmlFor="password" className="mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
                            id="password"
                            placeholder="Your Password"
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col mb-6 mx-2">
                        <label htmlFor="con-pass" className="mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="text"
                            className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
                            id="con-pass"
                            placeholder="Confirm Password"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-6">
                <div className="form-check">
                    <input className="rounded-lg" type="checkbox" value="" id="agree" />
                    <label className="rounded-lg" htmlFor="agree">
                        {" "}
                        I accept to the{" "}
                        <a href="#!" className="underline">
                            terms & condition
                        </a>
                        ,
                        <a href="#!" className="underline">
                            privacy policy
                        </a>
                    </label>
                </div>
            </div>
            <button
                type="submit"
                className="bg-indigo-800 text-white px-7 py-3 rounded w-full"
            >
                Sign Up
            </button>

            <div className="relative">
                <hr className="my-6 md:my-12" />
                <span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#0b1727]">
                    Or
                </span>
            </div>

            <SocialLogin />
        </form>
    );
};

export default SignUpForm;