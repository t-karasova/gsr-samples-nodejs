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

async function main(generatedProductId) {
  // [START retail_delete_product]

  // Imports the Google Cloud client library.
  const { ProductServiceClient } = require('@google-cloud/retail').v2;
  const utils = require('../setup/setup_cleanup');

  const projectNumber = process.env['PROJECT_NUMBER'];

  // Create product
  const product = await utils.createProduct(projectNumber, generatedProductId);

  // Full resource name of Product
  const name = product.name;

  // Instantiates a client.
  const retailClient = new ProductServiceClient();

  const callDeleteProduct = async () => {
    // Construct request
    const request = {
      name,
    };
    console.log('Delete product request:', request);

    // Run request
    console.log('Start deleting the product');
    await retailClient.deleteProduct(request);
    console.log(`Product ${product.id} deleted`);
  };

  // Delete product
  callDeleteProduct();

  // [END retail_delete_product]
}

process.on('unhandledRejection', (err) => {
  console.error(err.message);
  process.exitCode = 1;
});

main(...process.argv.slice(2));
