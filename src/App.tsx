import items from './items.json'
import { useQuery } from 'react-query'

interface Item {
  data: string[] | undefined
  error: unknown
  isLoading: boolean
}

export const App = () => {

  const fetchData = () => {
    return Promise.resolve(items.data)
  }

  const { data, error, isLoading }:Item = useQuery('Items', fetchData)
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="bg-gray-50 w-72 h-80 border-gray-300 
      p-5 border-[1.5px] rounded-md">
        <p className="pl-1 text-md">
          Kategoriler
        </p>
        <input type="text" placeholder="Kategori Ara .."
        className="border-[1.5px] border-gray-300 text-sm outline-none
        rounded-md w-full h-8 p-2 mt-2 " />
        <div className="h-44 overflow-y-scroll content mt-2"> 
          { !isLoading ?
            data?.map((item:string,index:number)=>(
              <p key={index}>{item}</p>
            )):
            <p>Yükleniyor</p>
          }
        </div>
        <button className="bg-blue-600 text-sm text-white w-full h-8 mt-2 rounded-md">
          <p>Ara</p>
        </button>
      </div>

    </div>
  )
}
