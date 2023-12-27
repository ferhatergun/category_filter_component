import { useState } from "react"

interface SelectBoxProps {
    itemName:string,
    isSelected?:boolean
}

export default function SelectBox({itemName,isSelected}:SelectBoxProps) {
    const [selected, setSelected] = useState(isSelected || false)

    const handleClick = () => {
        setSelected(!selected)
    }
  return (
    <div className='flex items-center gap-1 cursor-pointer radioBtn my-1'
    onClick={handleClick}
    >
    <div className='w-4 h-4 border-gray-300 border-[1px] p-[2px] selectBox'>
      <div className={`w-full h-full ${selected && 'select'}`}/>
    </div>
    <p className={`text-md pl-1  ${selected && 'text-blue-600'}`} dangerouslySetInnerHTML={{__html:itemName}} />
  </div>
  )
}
