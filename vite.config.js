import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [react(), tailwindcss(),
        VitePWA({
      registerType: 'autoUpdate',
      manifest: {
       name: 'Jamia Uloom Islamia',
        short_name: 'Jamia',
        description: 'Jamia Uloom Islamia Official App',
         theme_color: '#0B6B3A',
        background_color: '#FFFFFF',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/logo1.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})