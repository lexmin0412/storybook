import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
	base: '/storybook/',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './', 'src'),
		}
	},
  plugins: [
		react(),
		legacy({
			targets: ['defaults', 'not IE 11'],
		}),
	],
})
