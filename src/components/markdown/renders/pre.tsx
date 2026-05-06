import { Children, type ComponentPropsWithoutRef, type ReactElement } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

export function PreRenderer({ children }: ComponentPropsWithoutRef<'pre'>) {
  const code = Children.only(children) as ReactElement<ComponentPropsWithoutRef<'code'>>
  const language = /language-(\w+)/.exec(code.props.className ?? '')?.[1] ?? 'text'
  const content = String(code.props.children).trim()

  return (
    <div className='mb-4 border border-zinc-200 rounded-lg overflow-hidden'>
      <div className='px-3 h-10 leading-10 text-sm border-b border-zinc-200'>{language}</div>
      <div className='p-3 bg-zinc-50 whitespace-pre font-mono'>
        <Highlight theme={themes.oneLight} code={content} language={language}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </>
          )}
        </Highlight>
      </div>
    </div>
  )
}