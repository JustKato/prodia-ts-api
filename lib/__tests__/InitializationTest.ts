import { Prodia } from "../Prodia"
import { JobStatus } from "../types/GeneralTypes";

const prodiaKey = process.env['PRODIA_KEY'];

if ( typeof prodiaKey == 'undefined' ) {
    throw new Error(`No Prodia key found`);
}

test(`Generate an image with Prodia`, async () => {

    const prodia = new Prodia(prodiaKey);

    let j = await prodia.createImageGeneration({
        prompt: `A cute dog`,
    });

    // Make sure that the response from the server is that it's queued
    expect(j.status).toEqual(JobStatus.QUEUED);

    console.log(`Got job: ${j.job}`)

    // Now we wait for the image to process
    let safetyWait = 25;
    while ((j.status == JobStatus.GENERATING || j.status == JobStatus.QUEUED) && --safetyWait > 0 ) {
        await new Promise((r) => setTimeout(r, 500));
        j = await prodia.fetchImageGeneration(j.job);
    }

    expect(j.status).toEqual(JobStatus.SUCCEEDED);

    console.log(`Image has been generated: ${j.imageUrl}`)

}, 1000 * 60 * 5);