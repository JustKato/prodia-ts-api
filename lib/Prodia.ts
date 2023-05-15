import { CreateGenerationRequest, CreateGenerationResponse } from "./types/GenerationTypes";

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
    public createImageGeneration( generationRequest: CreateGenerationRequest ): Promise<CreateGenerationResponse> {
        return new Promise<CreateGenerationResponse>( async (_r, _e) => {
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

            // TODO: Implement some kind of check to make sure that the response JSON respects the CreateGenerationResponse interface

            // Return the response JSON
            return _r(responseJSON as CreateGenerationResponse);
        })
    }

    /**
     * Check the current status of an image generation job, this will also return the image URL of the generate image
     * @param jobID The id of the job to check on
     */
    public fetchImageGeneration( jobID: string ): Promise<CreateGenerationResponse> {
        return new Promise<CreateGenerationResponse>( async (_r, _e) => {
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

            // TODO: Implement some kind of check to make sure that the response JSON respects the CreateGenerationResponse interface

            // Return the response JSON
            return _r(responseJSON as CreateGenerationResponse);
        })
    }

    public createImageToImage() {
        throw new Error(`Not implemented yet`);
    }

    public getImageToImage() {
        throw new Error(`Not implemented yet`);
        // TODO: Not implemented yet
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

}