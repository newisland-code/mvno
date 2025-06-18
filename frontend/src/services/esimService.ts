// frontend/src/services/esimService.ts
import { postToApi } from "./apiClient";

// ------------------ eSIM 開通 ------------------
interface EsimActivationRequest {
  authKey: string;
  eid: string;
  simKind: string;
  addKind: "N" | "M" | "R";
  repAccount?: string;
  planCode?: string;
  deliveryCode?: string;
  account?: string;
  createType?: string;
  masterAccount?: string;
  masterPassword?: string;
  contractLine?: string;
  shipDate?: string;
  mnp?: {
    reserveNumber: string;
    reserveExpireDate?: string;
    lastnameKanji: string;
    firstnameKanji?: string;
    lastnameZenKana: string;
    firstnameZenKana?: string;
    gender: "M" | "W" | "C";
    birthday?: string;
  };
  reissue?: {
    oldProductNumber?: string;
    oldEid?: string;
  };
}

interface EsimActivationResponse {
  resultCode: string;
  resultMessage: string;
}

export const activateEsim = async (
  data: EsimActivationRequest
): Promise<EsimActivationResponse> => {
  return await postToApi("/activateEsim", data);
};

// ------------------ eSIM 再発行 ------------------

export const reissueEsim = async (
  data: EsimActivationRequest
): Promise<EsimActivationResponse> => {
  return await postToApi("/reissueEsim", data);
};

// ------------------ eSIM キャンセル ------------------

interface CancelEsimRequest {
  authKey: string;
  account: string;
}

export const cancelEsim = async (
  data: CancelEsimRequest
): Promise<EsimActivationResponse> => {
  return await postToApi("/cancelEsim", data);
};

// ------------------ 契約変更 ------------------

interface ChangeContractRequest {
  authKey: string;
  account: string;
  planCode: string;
  deliveryCode?: string;
}

export const changeContract = async (
  data: ChangeContractRequest
): Promise<EsimActivationResponse> => {
  return await postToApi("/changeContract", data);
};

// ------------------ 契約照会 ------------------

interface LookupContractRequest {
  authKey: string;
  account: string;
}

interface LookupContractResponse {
  resultCode: string;
  resultMessage: string;
  contractInfo?: any;
}

export const lookupContract = async (
  data: LookupContractRequest
): Promise<LookupContractResponse> => {
  return await postToApi("/lookupContract", data);
};
