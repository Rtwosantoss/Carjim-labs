import { BloodSampleImageService } from "../services/BloodSampleImageService";
import { Request, Response } from "express";

export class BloodSampleController{
    constructor(
        private readonly service: BloodSampleImageService
    ){}

    getAll = async(_req: Request, res:Response): Promise<Response> => {
        
        console.log("encontrando todos os exames")
        try{
            const images = await this.service.getAll();

            console.log("exames encontrados", images.length) 
            return res.status(200).json(images)
        } catch(error){
            return res.status(500).json({
                message: "erro ao encontrar exames",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    };

    getById = async (req: Request, res: Response): Promise<Response> => {
    console.log("Buscando imagem por ID:", req.params.id);
    try {
        const image = await this.service.getById(Number(req.params.id));
        
        if (!image) {
            return res.status(404).json({
                message: "Imagem não encontrada"
                });
            }

            return res.status(200).json(image);
        } catch (error) {
            return res.status(500).json({
            message: "Erro ao buscar imagem",
            error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }; 

    create = async (req: Request, res: Response): Promise<Response> => {
    console.log("Criando imagem...");
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Nenhuma imagem enviada"
            });
        }

        const image = await this.service.create(req.file.path);

        if (!image) {
            return res.status(500).json({
                message: "Erro ao criar imagem"
            });
        }

        console.log("Imagem criada:", image.id);
            return res.status(201).json(image);
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao criar imagem",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    };

    delete = async (req: Request, res: Response): Promise<Response> => {
    console.log("Deletando imagem:", req.params.id);
    try {
        const image = await this.service.delete(Number(req.params.id));

        if (!image) {
            return res.status(404).json({
                message: "Imagem não encontrada"
            });
        }

        console.log("Imagem deletada:", image.id);
        return res.status(200).json({
            message: "Imagem deletada com sucesso"
        });
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao deletar imagem",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    };
}