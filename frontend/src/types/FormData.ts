// frontend/src/types/FormData.ts
export interface OemAuthFormData {
  oemId: string;
  oemKey: string;
}

export interface AddAcntFormData {
  authKey: string;
  account: string;
  password: string;
}

export interface AuthAcntFormData {
  authKey: string;
  account: string;
  password: string;
}

// 必要に応じて続けて定義可能
