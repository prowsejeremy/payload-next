export interface PageType {
  title: String,
  content?: {
    [k: string]: unknown
  }[],
  slug: String
}