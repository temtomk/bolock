import { mkdir, writeFile as writeFileCallback } from 'fs/promises';

export async function createDirectory(path: string): Promise<void> {
    await mkdir(path, { recursive: true });
}

export async function writeFile(path: string, content: string): Promise<void> {
    await writeFileCallback(path, content);
}