import { JobStatus } from "./types/GeneralTypes";
import { CreateGenerationRequest, GenerationResponse } from "./types/GenerationTypes";
import { ImageToImageRequest } from "./types/ImageToImageTypes";
import fs from "node:fs";

const PRODIA_BASE_URL = `https://api.prodia.com`;

/**
 * Them main prodia class, this class should be viewed as the instance of an API key
 */
export class Prodia {

    private _apiKey: string;

    public constructor( apiKey: string ) {
        this._apiKey = apiKey;
    }

    /**
     * Add an image generation request in the queue, you will have to use polling to get the latest status of the job
     * @param generationRequest The generation parameters for the request
     */
    public createImageGeneration( generationRequest: CreateGenerationRequest ): Promise<GenerationResponse> {
        return new Promise<GenerationResponse>( async (_r, _e) => {
            const response = await fetch(`${PRODIA_BASE_URL}/v1/job`, {
                method: `POST`,
                cache: `no-cache`,
                headers: this.getProdiaHeaders(),
                redirect: `follow`,
                referrerPolicy: `no-referrer`,
                body: JSON.stringify(generationRequest),
            })

            // Make sure to check response status
            if ( response.status > 299 || response.status < 200 ) {
                return _e(new Error(`Api responded with ${response.status} ${response.statusText}`))
            }

            // Parse the response and return it
            const responseJSON = await response.json();

            // TODO: Implement some kind of check to make sure that the response JSON respects the GenerationResponse interface

            // Return the response JSON
            return _r(responseJSON as GenerationResponse);
        })
    }

    /**
     * Generate an image using the ImageToImage method.
     * @param generationRequest The request parameters to send over
     * @returns A GenerationResponse with the jobID
     */
    public createImageToImage( generationRequest: ImageToImageRequest ): Promise<GenerationResponse> {
        return new Promise<GenerationResponse>( async (_r, _e) => {
            const response = await fetch(`${PRODIA_BASE_URL}/v1/transform`, {
                method: `POST`,
                cache: `no-cache`,
                headers: this.getProdiaHeaders(),
                redirect: `follow`,
                referrerPolicy: `no-referrer`,
                body: JSON.stringify(generationRequest),
            })

            // Make sure to check response status
            if ( response.status > 299 || response.status < 200 ) {
                return _e(new Error(`Api responded with ${response.status} ${response.statusText}`))
            }

            // Parse the response and return it
            const responseJSON = await response.json();

            // TODO: Implement some kind of check to make sure that the response JSON respects the GenerationResponse interface

            // Return the response JSON
            return _r(responseJSON as GenerationResponse);
        })
    }

    /**
     * Check the current status of an image generation job, this will also return the image URL of the generate image
     * @param jobID The id of the job to check on
     */
    public fetchImageGeneration( jobID: string ): Promise<GenerationResponse> {
        return new Promise<GenerationResponse>( async (_r, _e) => {
            const response = await fetch(`${PRODIA_BASE_URL}/v1/job/${jobID}`, {
                method: `GET`,
                cache: `no-cache`,
                headers: this.getProdiaHeaders(),
                redirect: `follow`,
                referrerPolicy: `no-referrer`,
            })

            // Make sure to check response status
            if ( response.status > 299 || response.status < 200 ) {
                return _e(new Error(`Api responded with ${response.status} ${response.statusText}`))
            }

            // Parse the response and return it
            const responseJSON = await response.json();

            // TODO: Implement some kind of check to make sure that the response JSON respects the GenerationResponse interface

            // Return the response JSON
            return _r(responseJSON as GenerationResponse);
        })
    }

    /**
     * Generate an image from a text prompt
     * @param generationRequest The generation parameters for the request
     */
    public generateText2Image( generationRequest: CreateGenerationRequest ): Promise<GenerationResponse> {
        return new Promise( async (_r, _e) => {
            let j = await this.createImageGeneration(generationRequest);

            // Now we wait for the image to process
            let safetyWait = 25;
            while ((j.status == JobStatus.GENERATING || j.status == JobStatus.QUEUED) && --safetyWait > 0 ) {
                await new Promise((r) => setTimeout(r, 500));
                j = await this.fetchImageGeneration(j.job);
            }

            return _r(j);
        })
    }

    /**
     * Generate an image from an image + prompt
     * @param generationRequest The generation parameters for the request
     */
    public generateImage2Image( generationRequest: ImageToImageRequest ): Promise<GenerationResponse> {
        return new Promise( async (_r, _e) => {
            let j = await this.createImageToImage(generationRequest);

            // Now we wait for the image to process
            let safetyWait = 25;
            while ((j.status == JobStatus.GENERATING || j.status == JobStatus.QUEUED) && --safetyWait > 0 ) {
                await new Promise((r) => setTimeout(r, 500));
                j = await this.fetchImageGeneration(j.job);
            }

            return _r(j);
        })
    }

    // Private Functions

    private getProdiaHeaders() : HeadersInit {
        return {
            "Content-Type": "application/json",
            "Accept":       "application/json",
            "X-Prodia-Key": this._apiKey,
            "X-API-LIB":    `npm/prodia-api`
        }
    }

    // Static Functions
    public static async downloadImageFromResponse( response: GenerationResponse, downloadPath: string ) {

        // Validate if the response is completed
        if ( response.status !== JobStatus.SUCCEEDED || response.imageUrl == undefined ) {
            throw new Error(`The provided API Response is not valid: JobStatus != SUCCEEDED`);
        }
    
        const resp = await fetch(response.imageUrl);
        const arrayBuffer = await resp.arrayBuffer();
        const buff = Buffer.from(arrayBuffer);

        fs.writeFileSync(buff, downloadPath);
    }

}