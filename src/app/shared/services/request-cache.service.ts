import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

const maxAge = 300000;
@Injectable()
export class RequestCache  {

  cache = new Map();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    if (req.method == 'POST')
        var urlFinal =  req.urlWithParams + JSON.stringify(req.body);
    else
        var urlFinal =  req.urlWithParams;
    const url = urlFinal;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : '';
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
      if (req.method == 'POST')
        var urlFinal = req.url + JSON.stringify(req.body);
      else
        var urlFinal = req.url;
    const url = urlFinal;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}