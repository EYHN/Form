import ApiError from "./ApiError";
import fetch from 'isomorphic-fetch';
import NetworkError from "./NetworkError";
import { IFormTemplate, IFormKey } from "@interface/Form";
import { IApiNewFormRequest, IApiUpdateFormRequest, IApiNewFormResponse, IApiFetchFormResponse } from "@interface/Api/Form";

export async function apiFetchForm(id: string): Promise<IApiFetchFormResponse> {
  let res;
  try {
    res = await fetch(API_SERVER + '/api/form/' + id);
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

export async function apiNewForm(template: IFormTemplate, key: IFormKey, date: string, signFunc: (data: string) => string): Promise<IApiNewFormResponse> {
  const body: IApiNewFormRequest = {
    date: date,
    template: template,
    key: key
  };
  const rawbody = JSON.stringify(body);
  let res = null;
  try {
    res = await fetch(API_SERVER + '/api/form/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-signature': signFunc(rawbody)
      },
      body: rawbody
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

export async function apiUpdateForm(id: string, template: IFormTemplate, signFunc: (data: string) => string): Promise<IApiUpdateFormRequest> {
  const body: IApiUpdateFormRequest = {
    template: template
  };
  const rawbody = JSON.stringify(body);
  let res;
  try {
    res = await fetch(API_SERVER + '/api/form/' + id, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        "x-signature": signFunc(rawbody)
      },
      body: rawbody
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
