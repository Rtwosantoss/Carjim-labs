import {Multer} from 'multer'

export interface UploadBloodSampleDTO{
    file: Express.Multer.File;
}