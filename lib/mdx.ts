import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const contentDirectory = path.join(process.cwd(), 'content')

export interface ContentMeta {
  slug: string
  title: string
  description: string
  date: string
  author?: string
  image?: string
  category?: string
  tags?: string[]
  readingTime?: string
}

export interface ContentItem {
  meta: ContentMeta
  content: string
}

export function getContentByType(type: 'work' | 'insights'): ContentItem[] {
  const dir = path.join(contentDirectory, type)

  if (!fs.existsSync(dir)) {
    return []
  }

  const files = fs.readdirSync(dir)

  const content = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(dir, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContent)
      const stats = readingTime(content)

      return {
        meta: {
          slug: file.replace('.mdx', ''),
          title: data.title || '',
          description: data.description || '',
          date: data.date || '',
          author: data.author,
          image: data.image,
          category: data.category,
          tags: data.tags,
          readingTime: stats.text,
        },
        content,
      }
    })
    .sort((a, b) => {
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    })

  return content
}

export function getContentBySlug(
  type: 'work' | 'insights',
  slug: string
): ContentItem | null {
  try {
    const filePath = path.join(contentDirectory, type, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    const stats = readingTime(content)

    return {
      meta: {
        slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        author: data.author,
        image: data.image,
        category: data.category,
        tags: data.tags,
        readingTime: stats.text,
      },
      content,
    }
  } catch {
    return null
  }
}

export function getAllSlugs(type: 'work' | 'insights'): string[] {
  const dir = path.join(contentDirectory, type)

  if (!fs.existsSync(dir)) {
    return []
  }

  const files = fs.readdirSync(dir)
  return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace('.mdx', ''))
}
