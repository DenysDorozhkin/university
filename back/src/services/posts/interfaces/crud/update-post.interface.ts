import { ICreatePost } from './create-post.interface';

export interface IUpdatePost extends Partial<ICreatePost> {}
