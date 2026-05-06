import { doc } from './lib/md-content'
import { MarkdownContent } from './components/markdown/markdown-content'
import { Input } from './components/ui/input'

export function App() {
  return (
    <div className='flex justify-center items-center size-full'>
      <div className='w-96'>
        <Input/>
      </div>
      {/* <MarkdownContent className='mx-auto' content={doc}/> */}
    </div>
  )
}

export default App
