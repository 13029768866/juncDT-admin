import vue from '@vitejs/plugin-vue'


export function getPluginsList(command, VITE_LEGACY){
  return [
    vue()
  ]
}