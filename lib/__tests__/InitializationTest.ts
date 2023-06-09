import assert from "assert";
import { Prodia } from "../Prodia"
import { JobStatus } from "../types/GeneralTypes";
import { GenerationResponse } from "../types/GenerationTypes";

const prodiaKey = process.env['PRODIA_KEY'];

if ( typeof prodiaKey == 'undefined' ) {
    throw new Error(`No Prodia key found`);
}

const prodia = new Prodia(prodiaKey);

describe(`Image Generation Tests`, () => {

    let imageGeneration: GenerationResponse | undefined;

    test(`Generate an image with Prodia`, async () => {
    
        let j = await prodia.createImageGeneration({
            prompt: `A cute dog`,
        });
    
        // Make sure that the response from the server is that it's queued
        expect(j.status).toEqual(JobStatus.QUEUED);
    
        console.log(`Got job: ${j.job}`)
        imageGeneration = j;
    
    }, 30000);

    test(`Image Generation Fetch`, async () => {

        expect(imageGeneration).not.toEqual(undefined);

        if ( imageGeneration == undefined) {
            throw new Error(`Image Generation is undefined`);
        }

        // Now we wait for the image to process
        let safetyWait = 25;
        while ((imageGeneration.status == JobStatus.GENERATING || imageGeneration.status == JobStatus.QUEUED) && --safetyWait > 0 ) {
            await new Promise((r) => setTimeout(r, 500));
            imageGeneration = await prodia.fetchImageGeneration(imageGeneration.job);
        }

        expect(imageGeneration.status).toEqual(JobStatus.SUCCEEDED);

        console.log(`Image has been generated: ${imageGeneration.imageUrl}`)

    }, 30000);
});

describe(`Image to Image Tests`, () => {

    let imageGeneration: GenerationResponse | undefined;

    test(`Generate an image with Prodia`, async () => {
    
        let j = await prodia.createImageToImage({
            imageUrl: `https://cdn.discordapp.com/attachments/1044069166329647285/1102512720789635233/cover-0687707558765549.png`,
            prompt:   `epic realistic,bright sunny day, daylight on mars, mars, outside,bright sky`,
        });

        // Make sure that the response from the server is that it's queued
        expect(j.status).toEqual(JobStatus.QUEUED);

        console.log(`Got job: ${j.job}`)
        imageGeneration = j;
    
    }, 60000);

    test(`Image to Image Generation Fetch`, async () => {

        expect(imageGeneration).not.toEqual(undefined);

        if ( imageGeneration == undefined) {
            throw new Error(`Image Generation is undefined`);
        }

        // Now we wait for the image to process
        let safetyWait = 30;
        while ((imageGeneration.status == JobStatus.GENERATING || imageGeneration.status == JobStatus.QUEUED) && --safetyWait > 0 ) {
            await new Promise((r) => setTimeout(r, 1000));
            imageGeneration = await prodia.fetchImageGeneration(imageGeneration.job);
        }

        expect(imageGeneration.status).toEqual(JobStatus.SUCCEEDED);

        console.log(`Image to Image has finished: ${imageGeneration.imageUrl}`)

    }, 60000);
});

describe(`Instant generator tests`, () => {

    test(`Generating an image from a text prompt`, async () => {
        let j = await prodia.generateText2Image({
            prompt: `A cute dog`,
        })

        expect(j.status).toEqual(JobStatus.SUCCEEDED);

        console.log(`Got Image ${j.imageUrl}`)

    }, 30000)

    test(`Generating an image from an image prompt and a text prompt`, async () => {
        let j = await prodia.generateImage2Image({
            imageUrl: `https://cdn.discordapp.com/attachments/1044069166329647285/1102512720789635233/cover-0687707558765549.png`,
            prompt:   `epic realistic,bright sunny day, daylight on mars, mars, outside,bright sky`,
        })

        expect(j.status).toEqual(JobStatus.SUCCEEDED);

        console.log(`Got Image ${j.imageUrl}`)

        // Download the image as well
        await Prodia.downloadImageFromResponse( j, "./example.png");

    }, 30000)

})