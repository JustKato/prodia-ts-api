import { JobStatus, ProdiaAspectRatio, ProdiaModel, ProdiaSampler } from "./GeneralTypes";
import fs from "fs";


export interface CreateGenerationRequest {
    model?:           ProdiaModel,
    prompt:           string,
    negative_prompt?: string,
    steps?:           number,
    cfg_scale?:       number,
    seed?:            number,
    upscale?:         boolean,
    sampler?:         ProdiaSampler,
    aspect_ratio?:    ProdiaAspectRatio
}

export interface GenerationResponse {
    /**
     * The id of the job that has been created
     */
    job:    string,

    /**
     * The current status of the job that has been created
     */
    status: JobStatus,

    /**
     * A list of parameters that had been used t ocreate the job
     */
    params: Object,

    /**
     * The URL of the generated image
     */
    imageUrl: string | undefined,
}