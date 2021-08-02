export class WebApiClientBase {
    protected getBaseUrl(domain: string, baseUrl: string | undefined) {
        return window.location.origin;
    }
}