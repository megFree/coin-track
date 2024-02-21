import { Request } from 'express';

export class Helper {
  public static ExtractHtmlCookieFromHeader(
    request: Request,
    cookieName: string,
  ): string | undefined {
    const headerCookie = request.headers.cookie;
    if (headerCookie) {
      const strCookiesArray = request.headers.cookie.split('; ');
      let cookieValue: string | undefined = undefined;
      strCookiesArray.forEach((strCookie) => {
        const [name, value] = strCookie.split('=');
        if (name === cookieName) {
          cookieValue = value;
        }
      });
      return cookieValue;
    }
  }
}
