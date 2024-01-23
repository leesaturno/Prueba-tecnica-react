import { MdAddBox, MdDeleteForever, MdOutlineArrowBack, MdSend } from "react-icons/md"
import './App.css'
import { ToastContainer } from 'react-toastify'
import LanguageSelector  from "./components/selects/languageSelector"
import useNode from "./hooks/useNode"
function App() {
  
  const bgColor = ['bg-pink-600', 'bg-purple-600', 'bg-yellow-500', 'bg-green-500']
  const randomElement = () => bgColor[Math.floor(Math.random() * bgColor.length)];

  const { getParentNodes, getChildNodes, createNode, deleteNode, nodes, languages, setLanguageSelected, isChildNodes  } = useNode()
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
    
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <LanguageSelector languages={languages} setLanguageSelected={setLanguageSelected}/>
      <h2 className="text-4xl font-bold text-gray-500">Nodos</h2>
      {isChildNodes === true ? <button
        onClick={() => getParentNodes()}
        type="button"
        className="inline-flex h-35 w-35 items-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-3"
      >
        <span className="text-sm">Origen</span>
        <MdOutlineArrowBack className="h-5 w-5 nline-flex hitems-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" />
      </button> : <></>}
      <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {nodes?.map((node) => (
          <li key={node.id} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={classNames(
                randomElement(),
                'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
              )}
            >
              {node.id}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a href="#" className="font-medium text-gray-900 hover:text-gray-600">
                  {node.title}
                </a>
                <p className="text-gray-500">{node.parent ? "Hijo de " + node.parent : "Padre"} </p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <MdAddBox onClick={() => createNode(node.id)} className="h-5 w-5 nline-flex hitems-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" aria-hidden="true" />
                <MdSend onClick={() => getChildNodes(node.id)} className="h-5 w-5 nline-flex hitems-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" aria-hidden="true" />
                <MdDeleteForever onClick={() => deleteNode(node.id, node.parent)} className="h-5 w-5 nline-flex hitems-center justify-center rounded-full bg-transparent bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" aria-hidden="true" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
