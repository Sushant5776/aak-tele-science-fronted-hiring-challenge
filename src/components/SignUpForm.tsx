import { useEffect, useRef } from "react";
import SocialLogin from "./SocialLogin";
import toast from "react-hot-toast";

const userTypes = [{ label: 'User type', value: 'user_type' }, { label: "Researcher", value: "researcher" }, { label: "Investor", value: "investor" }, { label: "Institution Staff", value: "institution_staff" }, { label: "Service Provider", value: "service_provider" }]

const validation_message = {
    'user_type': 'Please select one of the options from given list!',
    'first_name': 'Your first name is required to register!',
    'last_name': 'Your last name is required to register!',
    'username': 'Please create a username for your profile!',
    'email': 'Your email is required for communication!',
    'password': 'Create password for your account!',
    'confirm_password': 'Verify your password by typing it again!',
    'accept_tc': 'Please accept the terms and conditions!'
}

function SignUpForm() {
    const controller = new AbortController();
    const signal = controller.signal;

    const user_type_ref = useRef<HTMLSelectElement>(null)
    const first_name_ref = useRef<HTMLInputElement>(null)
    const last_name_ref = useRef<HTMLInputElement>(null)
    const username_ref = useRef<HTMLInputElement>(null)
    const email_ref = useRef<HTMLInputElement>(null)
    const password_ref = useRef<HTMLInputElement>(null)
    const confirm_password_ref = useRef<HTMLInputElement>(null)
    const accept_tc_ref = useRef<HTMLInputElement>(null)

    type RequestKeys = Exclude<keyof typeof validation_message, 'confirm_password' | 'accept_tc'>
    type Request = { [K in RequestKeys]: string }

    useEffect(() => {
        user_type_ref.current?.setCustomValidity(validation_message['user_type'])
        first_name_ref.current?.setCustomValidity(validation_message['first_name'])
        last_name_ref.current?.setCustomValidity(validation_message['last_name'])
        username_ref.current?.setCustomValidity(validation_message['username'])
        email_ref.current?.setCustomValidity(validation_message['email'])
        password_ref.current?.setCustomValidity(validation_message['password'])
        confirm_password_ref.current?.setCustomValidity(validation_message['confirm_password'])
        accept_tc_ref.current?.setCustomValidity(validation_message['accept_tc'])

        return () => {
            // controller.abort('Component Unmount')
        }
    }, [])

    const validate_change = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, type: keyof typeof validation_message) => {
        event.target.setCustomValidity('')

        switch (event.target.tagName) {
            case 'INPUT':
                if (event.target.checkValidity() === false) event.target.setCustomValidity(validation_message[type])
                break
            case 'SELECT':
                if (event.target.value === userTypes[0].value) event.target.setCustomValidity(validation_message[type])
                break
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const request = {} as Request

        const form = event.currentTarget

        if (form.checkValidity()) {
            event.stopPropagation()
            if (!(password_ref.current?.value.trim() === confirm_password_ref.current?.value.trim())) {
                alert('Passwords Do not Match')
                return
            }
            request['user_type'] = userTypes[Number(user_type_ref.current!.value)].value
            request['first_name'] = first_name_ref.current!.value.trim()
            request['last_name'] = last_name_ref.current!.value.trim()
            request['username'] = username_ref.current!.value.trim()
            request['email'] = email_ref.current!.value.trim()
            request['password'] = password_ref.current!.value.trim()

            try {
                const tid = toast('Signing you up!')
                const res = await fetch('https://django-dev.aakscience.com/signup/', { method: 'POST', mode: 'cors', signal: signal, headers: { "Content-Type": "application/json" }, referrerPolicy: "no-referrer", body: JSON.stringify(request) })
                const data = await res.json()
                toast.remove(tid)
                if (res.ok) {
                    console.log('success', data)
                    toast.success(data.message)
                }
                else {
                    console.log('error', data)
                    toast.error(data)
                }

            } catch (e) {
                console.log(e)
            }
        } else {
            alert('Something went wrong!')
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
                                ref={user_type_ref}
                                onChange={(event) => validate_change(event, 'user_type')}
                                defaultValue={'user_type'}
                                typeof="user_type"
                                className="min-h-[54px] leading-10 bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100 w-full px-4"
                            >
                                {
                                    userTypes.map(({ label }, i) => (
                                        <option hidden={!i} value={i} key={i}>
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
                            ref={first_name_ref}
                            required
                            minLength={2}
                            onChange={(event) => validate_change(event, 'first_name')}
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
                            ref={last_name_ref}
                            required
                            minLength={2}
                            onChange={(event) => validate_change(event, 'last_name')}
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
                            ref={username_ref}
                            required
                            minLength={6}
                            onChange={(event) => validate_change(event, 'username')}
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
                            ref={email_ref}
                            required
                            onChange={(event) => validate_change(event, 'email')}
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
                            ref={password_ref}
                            required
                            minLength={6}
                            onChange={(event) => validate_change(event, 'password')}
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
                            ref={confirm_password_ref}
                            required
                            minLength={6}
                            onChange={(event) => validate_change(event, 'confirm_password')}
                            type="password"
                            className="bg-blue-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-xl min-h-[54px] leading-10 px-4 focus:outline-none focus:bg-blue-100 dark:focus:bg-opacity-100"
                            id="con-pass"
                            placeholder="Confirm Password"
                        />
                    </div>
                </div>
            </div>
            <div className="mb-6">
                <div className="form-check">
                    <input ref={accept_tc_ref} onChange={(event) => validate_change(event, 'accept_tc')} required className="rounded-lg" type="checkbox" value="" id="agree" />
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