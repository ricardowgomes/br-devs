interface Post {
  content: string,
  username: string,
  title: string,
  slug: string,
  heartCount: number,
  published: boolean,
  createdAt: number,
}

type PostProp = {
  post: Post,
  admin?: boolean
}

export type {
  Post, PostProp
}
