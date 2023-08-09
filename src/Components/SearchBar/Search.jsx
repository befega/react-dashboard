import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import List from "./List";

export default function Search(props) {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  let [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  function openModal() {
    setIsModalOpen(true);
  }

  return (
    <>
      <form className="relative flex flex-1" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <MagnifyingGlassIcon
          className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
          aria-hidden="true"
          onClick={openModal}
        />
        <input
          id="search-field"
          className="block h-full w-full border-0 py-0 pl-8 pr-0 cursor-pointer text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
          placeholder="Find something..."
          type="search"
          name="search"
          readOnly={true}
          autoComplete="off"
          onClick={openModal}
        />
      </form>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-400/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed mx-auto mt-24 pl-[32%] inset-0 overflow-y-auto">
            <div className="fixed w-2/5 min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden text-gray-700 text-left align-middle transition-all rounded-lg bg-zinc-50 shadow-xl focus:ring-0 focus:outline-none focus:border-color:bg-transparent sm:max-w-xl">
                  <div className="">
                    <label className="relative block">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 " />
                      </span>
                      <input
                        onChange={inputHandler}
                        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-none rounded-md py-3 pl-9 pr-3 shadow-sm focus:ring-0 focus:outline-none focus:border-none sm:text-sm"
                        placeholder="Find something..."
                        type="text"
                        name="search"
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  <div className="flex flex-col">
                    <List input={inputText} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
