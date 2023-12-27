import SelectBox from './components/SelectBox'
import items from './items.json'
import { useQuery } from 'react-query'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Item {
  data: string[] | undefined
  isLoading: boolean
}

export const App = () => {
  const [selectItems, setSelectItems] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')

  const fetchData = () => {
    return Promise.resolve(items.data)
  }

  useEffect(()=>{
    //sayfa yenilendiği zaman localstorage'dan verileri çeker
    const items = localStorage.getItem('items')
    if(items){
      setSelectItems(JSON.parse(items))
    }
  },[])

  const { data, isLoading }:Item = useQuery('Items', fetchData)
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="bg-gray-50 w-72 h-80 border-gray-300 
      p-5 border-[1.5px] rounded-md">
        <p className="pl-1 text-md">
          Kategoriler
        </p>
        <input type="text" placeholder="Kategori ara.."
        className="border-[1.5px] border-gray-300 text-sm outline-none
        rounded-md w-full h-8 p-2 mt-2" 
        onChange={(e)=>setSearch(e.target.value)}
        />
        {/* key değeri selectItems de her değişiklik yapıldığında divi render etmek için kullanıldı */}
        <div className="h-44 overflow-y-scroll content mt-2" key={selectItems.length}>
          {isLoading && <>Yükleniyor..</>}
          {
            //seçili seçenekleri en üstte gösterdik
            data?.filter((item)=>selectItems.includes(item))
            .map((item:string,index:number)=>(
              <SelectBox 
              key={index} 
              itemName={item} 
              setSelectItems={setSelectItems} 
              isSelected={selectItems.includes(item)}
              />
            ))
          }
          {
            //seçili olmayan seçenekler
            data?.filter((item)=>!selectItems.includes(item))
            .map((item:string,index:number)=>(
              //arama kelimesi item içinde varsa ekranda gösterilir
              item.toLowerCase().includes(search.toLowerCase()) &&
              <SelectBox 
              key={index} 
              itemName={item} 
              setSelectItems={setSelectItems} 
              isSelected={selectItems.includes(item)}
              />
            ))
          }
        </div>
        <button className="bg-blue-600 text-sm text-white w-full h-8 
        mt-2 rounded-md" 
        onClick={()=>{
          
          localStorage.setItem('items',JSON.stringify(selectItems))
          toast.success('Seçimleriniz kaydedildi')
        
        }}>
          <p>Ara</p>
        </button>
      </div>
    </div>
  )
}
