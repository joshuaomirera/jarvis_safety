export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
  imageUrl: string
  publishDate: string
  published: boolean
  category: string
  readTime: string
}
