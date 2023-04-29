interface Post {
  content: string,
  username: string,
  title: string,
  slug: string,
  clapCount: number,
  published: boolean,
  createdAt: number | {
    toDate: Function
  },
}

type PostProp = {
  post: Post,
  admin?: boolean
}

export type {
  Post, PostProp
}
