import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem, SelectGroup } from './components/ui/select'

const items = [
  { label: 'Select a fruit', value: null },
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Pineapple', value: 'pineapple' },
]


export function App() {
  return (
    <div className='flex justify-center items-center size-full'>
      <div className='w-96'>
        <Select items={items} >
          <SelectTrigger className={'w-full max-w-48'}>
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* <MarkdownContent className='mx-auto' content={doc}/> */}
    </div>
  )
}

export default App
