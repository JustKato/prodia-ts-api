# Prodia AI Image Generation API
[![npm version](https://badge.fury.io/js/prodia-api.svg?1)](https://badge.fury.io/js/prodia-api)

[![Tests](https://github.com/JustKato/prodia-ts-api/actions/workflows/main.yml/badge.svg)](https://github.com/JustKato/prodia-ts-api/actions/workflows/main.yml)

This is a Node.js library written in TypeScript for usage with the [Prodia AI API](https://docs.prodia.com/reference/getting-started)

The library offers type safety as it was written in TypeScript, fully compatible with other TypeScript projects or plain JavaScript projects.

## Installation

Install the library using npm:

```
npm i prodia-api
```

Make sure you're using node >= 18 so fetch is available.

## Library Usage

First, you need to import the library and set your API key:

```ts
import { Prodia } from "prodia-api"
// js: const Prodia = require("prodia-api").Prodia;

// Your API Key from https://app.prodia.com/
const prodia = new Prodia(`XxXxX-XxXxX-XxXxX-XxXxX`);
```

## Generating an image
```ts
import Prodia from "prodia-api"

// Your API Key from https://app.prodia.com/
const prodia = new Prodia(`XxXxX-XxXxX-XxXxX-XxXxX`);

// Construct your generation request
const generationRequest: CreateGenerationRequest = {
    aspect_ratio: ProdiaAspectRatio.PORTRAIT,
    cfg_scale: 7.5,
    model: ProdiaModel.ANYTHING_V45,
    negative_prompt: `easynegative`,
    prompt: `A portrait of a cute dog`, // The only actual required field, feel free to only send this.
    sampler: ProdiaSampler.DPM_PP_2M_KARRAS,
    seed: -1,
    steps: 32,
    upscale: false
}

const imageGenerationJob = await prodia.createImageGeneration(generationRequest);
console.log("Image Generation request sent...");

let safetyWait = 25;
while ((j.status == JobStatus.GENERATING || j.status == JobStatus.QUEUED) && --safetyWait > 0 ) {
    await new Promise((r) => setTimeout(r, 500));

    imageGenerationJob = await prodia.fetchImageGeneration(imageGenerationJob.job);
}

if (imageGenerationJob.status !== JobStatus.SUCCEEDED) {
    throw new Error("Job failed!");
}

console.log("Generation completed!", job.imageUrl);

```


```ts
import { Prodia } from "prodia-api"
// js: const Prodia = require("prodia-api").Prodia;

```

## Error Handling
When an error occurs, the library will simply throw an error. All promises from the library do throw proper exceptions.

## Community

If you have any questions in regard to the API you can always jump on the official [Prodia Discord Server](https://discord.gg/CaYpfEGrWC), 

If you have any questions in regards to the library, what I recommend is simply asking on the above discord server but if you think that I would personally be a better fit or that you have found actual issues with the library either open up an issue in the repository or you can email me [contact@danlegt.com](mailto:contact@danlegt.com)
