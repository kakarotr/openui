import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { componentMap as componentsMap } from './renders'

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <article className={cn('prose', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={componentsMap}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}