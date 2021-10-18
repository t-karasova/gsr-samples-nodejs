/**
 * @fileoverview Search products with a query expansion specification
 */
const { SearchServiceClient } = require('@google-cloud/retail');

// Requires a credentials file to be referenced through the following
// environment variable
process.env['GOOGLE_APPLICATION_CREDENTIALS'] = './sa.json';

const projectId = 'SET HERE VALID PROJECT NUMBER';

const defaultSearchPlacement = `projects/${projectId}/locations/global/catalogs/default_catalog/placements/default_search`;

const searchClient = new SearchServiceClient({
  apiEndpoint: 'test-retail.sandbox.googleapis.com',
});

// [START search for product using query expansion specification]
async function searchProductsWithQueryExpansionSpec() {
  const queryExpansionSpec = {
    condition: 'AUTO', // try other query expansion conditions here
  };
  const searchRequest = {
    placement: defaultSearchPlacement,
    query: 'Nest_Maxi',
    queryExpansionSpec: queryExpansionSpec,
    visitorId: 'visitor',
  };
  const searchResponse = await searchClient.search(searchRequest);
  console.log(
    'Search results with query expansion specification',
    searchResponse
  );
}
// [END search for product using query expansion specification]

searchProductsWithQueryExpansionSpec();