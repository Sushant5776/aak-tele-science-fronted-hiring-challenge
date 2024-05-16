import SignUpForm from './components/SignUpForm';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <section className="ezy__signup6 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-12 h-full">
          <div className="col-span-12 lg:col-span-6">
            <div
              className="bg-center bg-no-repeat bg-cover w-full min-h-[150px] rounded-[25px] hidden lg:block h-full"
              style={{
                backgroundImage:
                  "url(./sign_up_2.jpg)"
              }}
            ></div>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 py-12">
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-2xl mx-auto">
                <h2 className="text-indigo-900 dark:text-white text-3xl font-bold mb-3">
                  Welcome to AAK Tele-Science
                </h2>
                <div className="flex items-center mb-6 md:mb-12">
                  <p className="mb-0 mr-2 opacity-50">
                    Already have an account?
                  </p>
                  <a href="#!">Sign In</a>
                </div>

                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default App