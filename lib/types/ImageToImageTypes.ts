import { CreateGenerationRequest } from "./GenerationTypes";

export interface ImageToImageRequest extends CreateGenerationRequest {
    imageUrl: string,
}