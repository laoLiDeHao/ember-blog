export const randomText = (
  texts = ['javascript', 'nodejs', 'threejs', 'glsl_shader', 'webgl', '3d vision', 'azure', 'nextjs', '.ect',
  'typescript','react','mysql','nest','vue','cesium','mapbox','blender3D','axure'

]
) => {
  let n = texts.length
  let index = Math.floor(Math.random() * n)

  return texts[index]
}