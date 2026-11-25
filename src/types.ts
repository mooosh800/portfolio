export type ProjectCategory =
  | 'Creative Direction'
  | 'Brand Identity'
  | 'Editorial Design'
  | 'Visual Communication'
  | 'Digital Campaigns'
  | 'Digital & Experimental'

export interface ProjectImage {
  src: string
  width: number
  height: number
  alt: string
  caption: string
}

export interface Project {
  id: number
  slug: string
  title: string
  titleLatin: string
  year: number
  publishedOn: string
  category: ProjectCategory
  disciplines: string[]
  summary: string
  behanceUrl: string
  sourceColor: string
  appreciations: number
  views: number
  cover: ProjectImage
  images: ProjectImage[]
}
