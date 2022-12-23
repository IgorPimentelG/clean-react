import { LoadSurveyList } from '@/domain/usecases/load-survey-list'
import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { SurveyModel } from '@/domain/models'
import { HttpGetClientSpy } from '@/data/test'
import faker from 'faker'

type SutTypes = {
  sut: LoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<SurveyModel>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
  return {
    sut,
    httpGetClientSpy
  }
}

describe('RemoteLoadSurveyList', () => {
  test('Shoudl call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpGetClientSpy } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
