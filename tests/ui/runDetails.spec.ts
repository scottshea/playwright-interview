import { test, expect } from '@playwright/test';
import RunDetailsPage from '../../applicationDriver/pageObjects/runDetailsPage';
import TestResultsConstants from '../constants/testResultsConstants';

let runDetailsPage: RunDetailsPage;

test.beforeEach(async ({ page }) => {
  runDetailsPage = new RunDetailsPage(page); 
});

const runDetailsPages = ['un7aewD5XN', 'PfcTwreNmk', 'CC8IVx5lvp'];

/**
* I parameterized the Slug names for each page so that the test can iterate 
* over them and test each page 
*/

for (const runDetailsPageSlug of runDetailsPages) {
  test(`Status Test for ${runDetailsPageSlug}`, async ( ) => {
    await runDetailsPage.goToRunDetailsPage(runDetailsPageSlug);
    
    const runDetailsStatus = await runDetailsPage.findStatusBoxText();
  
    // I put the "Succeeds" string into a constants file with the idea that it 
    // can be used in other tests
    expect(runDetailsStatus).toEqual(TestResultsConstants.SUCCESS);
  });
}


/**
* This is a more complex parameterization where it will test each slug. If we 
* want to add any case, it would be as simple as adding a data row with the
* slug, the sortBy, and the expected task name
*/
const dataArray = [
  {slug: 'un7aewD5XN', sortBy: 'Duration', taskName: 'e2e-react'},
  {slug: 'PfcTwreNmk', sortBy: 'Duration', taskName: 'angular:test'},
  {slug: 'CC8IVx5lvp', sortBy: 'Duration', taskName: '@nx/nx-source'},
]

for (const dataRow of dataArray) {
  test(`sort by duration for ${dataRow.slug}`, async ({ }) => {
    await runDetailsPage.goToRunDetailsPage(dataRow.slug);
    await runDetailsPage.openSortByMenu();
    await runDetailsPage.selectSortParameter(dataRow.sortBy);

    console.log(dataRow);
    
    const taskName = await runDetailsPage.getFirstItemTaskName();
    console.log(taskName)

    expect(taskName).toContain(dataRow.taskName);
  });
}
