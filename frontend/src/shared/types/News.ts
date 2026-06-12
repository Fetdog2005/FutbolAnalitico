export type NewsSection =
  | {
      type: 'text'
      content: string
    }
  | {
      type: 'image-left'
      content: string
      image: string
    }
  | {
      type: 'image-right'
      content: string
      image: string
    }
  | {
      type: 'image-full'
      image: string
    }

export type News = {
  _id?: string

  id?: string

  slug: string

  title: string
  subtitle: string

  category: string

  image: string

  sections: NewsSection[]

  hashtags: string[]

  createdAt: string
}