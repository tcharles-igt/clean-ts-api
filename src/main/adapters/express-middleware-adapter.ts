import { HttpRequest, Middleware } from '@/presentation/protocols'
import { Request, Response, NextFunction, RequestHandler } from 'express'

export const adaptMiddleware = (middleware: Middleware): RequestHandler => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      Object.assign(req, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
