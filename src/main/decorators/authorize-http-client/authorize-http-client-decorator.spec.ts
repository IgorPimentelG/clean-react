import { mockAccountModel } from '@/domain/test'
import { mockRequest, GetStorageSpy, HttpClientSpy } from '@/data/test'
import { AuthorizeHttpClientDecorator } from './authorize-http-client-decorator'
import { HttpRequest } from '@/data/protocols/http'
import faker from 'faker'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpClientSpy = new HttpClientSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy)

  return {
    sut,
    getStorageSpy,
    httpClientSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  test('Should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()
    await sut.request(mockRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  test('Should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpRequest: HttpRequest = {
      method: faker.random.arrayElement(['POST', 'GET', 'PUT', 'DELETE']),
      url: faker.internet.url(),
      headers: {
        field: faker.random.word()
      }
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual(httpRequest.headers)
  })

  test('Should add headers if GetStorage is valid', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const httpRequest: HttpRequest = {
      method: faker.random.arrayElement(['POST', 'GET', 'PUT', 'DELETE']),
      url: faker.internet.url()
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should merge headers if GetStorage is valid', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut()
    getStorageSpy.value = mockAccountModel()
    const field = faker.random.word()
    const httpRequest: HttpRequest = {
      method: faker.random.arrayElement(['POST', 'GET', 'PUT', 'DELETE']),
      url: faker.internet.url(),
      headers: { field }
    }
    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  test('Should return the same result as HttpGetClient', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResponse = await sut.request(mockRequest())
    expect(httpResponse).toEqual(httpClientSpy.response)
  })
})
