import { IApiNewResponseResponse, IApiNewResponseRequest, IApiFetchFormResponse } from "@interface/Api/Response";
import { IResponseKey } from "@interface/Response";
import { IFormTemplate } from "@interface/Form";
import NetworkError from "./NetworkError";
import ApiError from "./ApiError";

export async function apiNewFormResponse(formId: string,encryptedData: string, template: IFormTemplate, key: IResponseKey, date: string): Promise<IApiNewResponseResponse> {
  const body: IApiNewResponseRequest = {
    encryptedData: encryptedData,
    date: date,
    template: template,
    key: key
  };
  let res = null;
  try {
    res = await fetch(API_SERVER + '/api/form/' + formId + '/responses', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  } catch (err) {
    throw new NetworkError(err);
  }
  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    throw new ApiError(res);
  }
}

export async function apiFetchFormResponse(formId: string): Promise<IApiFetchFormResponse> {
  let res;
  try {
    res = await fetch(API_SERVER + '/api/form/' + formId + '/responses');
  } catch (err) {
    throw new NetworkError(err);
  }
  if (res.ok) {
    const json = await res.json();
    return json;
  } else {
    throw new ApiError(res);
  }
}