import { defineConfig, loadEnv } from 'vite';
import path from 'path';

export default ({ mode }: any) => {
    const env = loadEnv(mode, process.cwd(), '');

    return defineConfig({
        base: './',
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src'),
            },
        },
        server: {
            proxy: {
                '/api': {
                    target: `${env.API_URL}`,
                    changeOrigin: true,
                    secure: false,
                },
                '/cdn': {
                    target: `${env.API_URL}`,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    });
};
