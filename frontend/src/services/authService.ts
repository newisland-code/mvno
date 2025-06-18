// frontend/src/services/authService.ts
import { postToApi } from "./apiClient";

interface OemAuthRequest {
  oemId: string;
  oemKey: string;
}

interface OemAuthResponse {
  resultCode: string;
  resultMessage: string;
  authKey: string;
}

export const requestOemAuth = async (data: OemAuthRequest): Promise<OemAuthResponse> => {
  return await postToApi("/authOem", data);
};

interface AddAcntRequest {
  authKey: string;
  account: string;
  password: string;
}

interface AddAcntResponse {
  resultCode: string;
  resultMessage: string;
}

export const addAccount = async (data: AddAcntRequest): Promise<AddAcntResponse> => {
  return await postToApi("/addAcnt", data);
};

interface AuthAcntRequest {
  authKey: string;
  account: string;
  password: string;
}

interface AuthAcntResponse {
  resultCode: string;
  resultMessage: string;
}

export const authAccount = async (data: AuthAcntRequest): Promise<AuthAcntResponse> => {
  return await postToApi("/authAcnt", data);
};
