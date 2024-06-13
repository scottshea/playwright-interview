import { Page } from "@playwright/test";

export default class BasePageObject {

    constructor(protected page: Page) {
        
    }

    public async goToPage(url: string) {
        await this.page.goto(url);
    }
}