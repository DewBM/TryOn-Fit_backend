import FastAPIClient from '../external/fastapiClient'

export async function processUserImage(user_id: number, fileBuffer: Buffer, filename: string) {
    return await FastAPIClient.uploadUserImage(user_id, fileBuffer, filename);
}