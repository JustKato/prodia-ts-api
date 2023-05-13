/**
 * A valid Prodia Model
 */
export enum ProdiaModel {

    /**
     * @hash [7460a6fa]
     * @modelType ckpt
     */
    SDV1_4                 = "sdv1_4.ckpt [7460a6fa]",

    /**
     * @hash [81761151]
     * @modelType ckpt
     */
    V15_PRUNED_EMAONLY     = "v1-5-pruned-emaonly.ckpt [81761151]",

    /**
     * @hash [2700c435]
     * @modelType ckpt
     */
    ANYTHING_V30           = "anythingv3_0-pruned.ckpt [2700c435]",

    /**
     * @hash [65745d25]
     * @modelType ckpt
     */
    ANYTHING_V45           = "anything-v4.5-pruned.ckpt [65745d25]",

    /**
     * @hash [9ca13f02]
     * @modelType ckpt
     */
    ANALOG_DIFFUSION_1     = "analog-diffusion-1.0.ckpt [9ca13f02]",

    /**
     * @hash [5d9225a4]
     * @modelType safetensors
     */
    THEALLYS_MIX_2         = "theallys-mix-ii-churned.safetensors [5d9225a4]",

    /**
     * @hash [342d9d26]
     * @modelType safetensors
     */
    ELLDRETHS_VIVID_MIX    = "elldreths-vivid-mix.safetensors [342d9d26]",

    /**
     * @hash [10ec4b29]
     * @modelType safetensors
     */
    DELIBERATE_V2          = "deliberate_v2.safetensors [10ec4b29]",

    /**
     * @hash [ca2f377f]
     * @modelType ckpt
     */
    OPENJOURNEY_V4         = "openjourney_V4.ckpt [ca2f377f]",

    /**
     * @hash [5c9fd6e0]
     * @modelType safetensors
     */
    DREAMLIKE_DIFFUSION_V1 = "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]",

    /**
     * @hash [fdcf65e7]
     * @modelType safetensors
     */
    DREAMLIKE_DIFFUSION_V2 = "dreamlike-diffusion-2.0.safetensors [fdcf65e7]",

    /**
     * @hash [1400e684]
     * @modelType safetensors
     */
    PORTRAIT_V1            = "portrait+1.0.safetensors [1400e684]",

    /**
     * @hash [3aafa6fe]
     * @modelType ckpt
     */
    RIFFUSION_MODEL_V1     = "riffusion-model-v1.ckpt [3aafa6fe]",

    /**
     * @hash [7c4971d4]
     * @modelType ckpt
     */
    TIMELESS_V1            = "timeless-1.0.ckpt [7c4971d4]",

    /**
     * @hash [a3fbf318]
     * @modelType safetensors
     */
    DREAMSHAPER_5BAKED_VAE = "dreamshaper_5BakedVae.safetensors [a3fbf318]",

    /**
     * @hash [3f4fefd9]
     * @modelType safetensors
     */
    REVANIMATED_V122       = "revAnimated_v122.safetensors [3f4fefd9]",

    /**
     * @hash [2ec66ab0]
     * @modelType safetensors
     */
    MEINAMIX_V9            = "meinamix_meinaV9.safetensors [2ec66ab0]",

    /**
     * @hash [65d547c5]
     * @modelType safetensors
     */
    LYRIEL_V15             = "lyriel_v15.safetensors [65d547c5]",
}

/**
 * The type of Stable Diffusion sampler
 */
export enum ProdiaSampler {
    EULER            = "Euler",
    EULER_A          = "Euler a",
    Heun             = "Heun",
    DPM_PP_2M_KARRAS = "DPM++ 2M Karras"
}

/**
 * The aspect ratio of an image
 */
export enum ProdiaAspectRatio {
    /**
     * @size 512x768
     */
    PORTRAIT  = "portrait",

    /**
     * @size 768x512
     */
    LANDSCAPE = "landscape",
    
    /**
     * @size 512x512
     */
    SQUARE    = "square"
}

export enum JobStatus {
    QUEUED     = `queued`,
    GENERATING = `generating`,
    SUCCEEDED  = `succeeded`,
    FAILED     = `failed`,
}