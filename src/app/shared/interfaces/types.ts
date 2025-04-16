export type Chapter = {
  id: string;
  title: string;
  position: number;
  description?: string;
  videoUrl?: string;
  videoContentType?: string;
  isPublished: boolean;
  isFree: boolean;
  muxData?: MuxData;
  userProgress: UserProgress[];
  isCompleted?: boolean;
  nextChapterId?: string;
};

export type MuxData = {
  assetId: string;
  playbackId?: string;
};

export type UserProgress = {
  chapterId: string;
  isCompleted: boolean;
};

export type Course = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished?: boolean;
  categoryId?: Category['id'];
  category?: string;
  chapters: Chapter[];
  attachments: Attachment[];
  isPurchased?: boolean;
  userProgress: number;
};

export type Category = {
  id: string;
  name: string;
};

export type Attachment = {
  id: string;
  url: string;
  name: string;
};

export type ApiResponse<T> = {
  data: T;
  isSuccess: boolean;
  errorMessage?: string;
};
