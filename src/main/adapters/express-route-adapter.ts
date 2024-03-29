import { Controller, HttpRequest } from '@/presentation/protocols'
import { Request, RequestHandler, Response } from 'express'

export const adaptRoute = (controller: Controller): RequestHandler => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      accountId: req.accountId
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 || httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
