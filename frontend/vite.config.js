import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: [
      '860c97db-bb01-495d-9637-e03c2b35e105-00-3ttli94tjq1pd.sisko.replit.dev'
    ]
  },
});
