import BasePageObject from "./basePageObject";

/**
* Generally I like to put the page locators and other key data into constants.
* I have seen some people make a whole second file for nothing but the constants.
*/

const RUN_DETAILS_BASE_URL = "https://staging.nx.app/runs/";
const RUN_STATUS_HEADING_TEST_ID = "run-status-heading-status";
const RUN_STATUS_LABEL_TEST_ID = "status-label";
const SORT_BY_LABEL = 'Sort by';
const TASK_ROW_TEST_ID = 'run-item-name';

export default class RunDetailsPage extends BasePageObject {

    public async goToRunDetailsPage(slug: string) {
        await this.page.goto( RUN_DETAILS_BASE_URL + slug);
    }

    public async findStatusBoxText() {
        return await this.page.getByTestId(RUN_STATUS_HEADING_TEST_ID).getByTestId(RUN_STATUS_LABEL_TEST_ID).innerText();
    }

    public async openSortByMenu() {
        await this.page.getByLabel(SORT_BY_LABEL).click();
    }

    public async selectSortParameter(sortParameter: string) {
        await this.page.getByText(sortParameter).click();
    }

    public async getFirstItemTaskName() {
        return await this.page.getByTestId(TASK_ROW_TEST_ID).first().innerText();
    }
}