import { error } from 'console';
import FormData from 'form-data'
import fetch from 'node-fetch';

const FASTAPI_BASE_URL = process.env.FASTAPI_BASE_URL;

export default class FastAPIClient {
    static async uploadUserImage(user_id: number, image: Buffer, filename: string) {
        const url = `${FASTAPI_BASE_URL}/user-image`;
        const formData = new FormData();

        formData.append('image', image, filename);
        formData.append('user_id', user_id);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: formData.getHeaders()
            });
            if (!response.ok) {
                return {
                    isSuccess: false,
                    msg: "FastAPI POST request failed",
                    error: "FastAPI POST request failed for user image upload"
                }
            }
            return await response.json();
        } catch (error) {
            console.error('Error calling FastAPI POST:', error);
            return {
                isSuccess: false,
                msg: "Error calling FastAPI POST",
                error: error
            }
        }
    }

    static async generateFiton(user_id: string, garment_url: string) {
        const url = `${FASTAPI_BASE_URL}/fiton`;

        const data = {
            user_id: user_id,
            garment_url: garment_url
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            
            return await response.json();

        } catch (error) {
            console.error('Error calling FastAPI POST for fiton generation:', error);
            return {
                isSuccess: false,
                msg: "Error calling FastAPI POST for fiton generation",
                error: error
            }
        }
    }
}