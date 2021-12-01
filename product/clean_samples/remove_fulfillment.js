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
  // [START retail_remove_fulfillment_places]

  // Imports the Google Cloud client library.
  const { ProductServiceClient } = require('@google-cloud/retail').v2;

  // Full resource name of Product
  const product = ''; // SET THE RESOURCE NAME OF PRODUCT

  // The fulfillment type, including commonly used types (such as
  // pickup in store and same day delivery), and custom types.
  const type = 'ship-to-store';

  // The IDs for this type, such as the store IDs for "pickup-in-store" or the region IDs for
  // "same-day-delivery" to be added for this type.
  let placeIds = ['store1', 'store2'];

  // The time when the fulfillment updates are issued, used to prevent
  // out-of-order updates on fulfillment information.
  const removeTime = {
    //seconds: Math.round(Date.now() / 1000)
  }

  //If set to true, and the product is not found, the fulfillment information will still be processed and retained for
  // at most 1 day and processed once the product is created
  const allowMissing = true;

  // Instantiates a client.
  const retailClient = new ProductServiceClient();

  const callRemoveFulfillmentPlaces = async () => {
    // Construct request
    const request = {
      product,
      type,
      placeIds,
      removeTime,
      allowMissing
    };

    // Run request
    const [operation] = await retailClient.removeFulfillmentPlaces(request);
    console.log(operation);
  }

  // Remove fulfillment places
  await callRemoveFulfillmentPlaces();
  // [END retail_remove_fulfillment_places]
}

process.on('unhandledRejection', err => {
  console.error('ERROR', err.message);
  process.exitCode = 1;
});

main();
