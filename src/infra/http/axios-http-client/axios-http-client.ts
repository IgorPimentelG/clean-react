import axios, { AxiosResponse } from 'axios'

import {
  HttpClient,
  HttpRequest,
  HttpReponse
} from '@/data/protocols/http'

export class AxiosHttpClient implements HttpClient {
  async request (params: HttpRequest): Promise<HttpReponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: params.url,
        method: params.method,
        data: params.body,
        headers: params.headers
      })
    } catch (error) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
