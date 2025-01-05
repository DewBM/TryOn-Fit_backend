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

    static async getImageFromAPI(image_path: any) {
        const fastApiUrl = `http://127.0.0.1:8000/fiton?image_path=${encodeURIComponent(image_path)}`;

        try {
            const response = await fetch(fastApiUrl);
            if (!response.ok) {
                throw new Error(`FastAPI responded with status: ${response.status}`);
            }

            const blob = await response.arrayBuffer(); // Get the binary data
            return Buffer.from(blob);
        } catch (err) {
            console.error("Error calling FastAPI:", err);
            throw err;
        }
    }
}