// Copyright 2021 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

async function main() {
  // [START retail_search_for_products_with_query_parameter]
  // Call Retail API to search for a products in a catalog using only search query.

  // Imports the Google Cloud client library.
  const { SearchServiceClient } = require('@google-cloud/retail');

  const projectNumber = process.env['PROJECT_NUMBER'];
  
  // Placement is used to identify the Serving Config name.
  const placement = `projects/${projectNumber}/locations/global/catalogs/default_catalog/placements/default_search`;

  // Raw search query.
  const query = 'Hoodie'; //TRY DIFFERENT QUERY PHRASES

  // A unique identifier for tracking visitors.
  const visitorId = '12345';
  
  // Instantiates a client.
  const retailClient = new SearchServiceClient();


  const callSearch = async () => {
    // Construct request
    const request = {
      placement,
      query,
      visitorId
    };

    // Run request
    const iterable = await retailClient.searchAsync(request);
    for await (const response of iterable) {
      console.log(response);
    }
  }

  callSearch();
  // [END retail_search_for_products_with_query_parameter]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});

main();
