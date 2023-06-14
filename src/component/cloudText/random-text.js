export const randomText = (
  texts = ['javascript', 'nodejs',
    'threejs', 'glsl', 'shader',
     'webgl', '3d vision', 'azure', 'nextjs', '.ect',
      'typescript', 'react', 'mysql', 'nest', 'vue', 'cesium', 'mapbox', 'blender3D', 'axure',
      '吃','喝','玩','乐','弓','刀','马','步','枪'
  ]
) => {
  let n = texts.length
  let index = Math.floor(Math.random() * n)

  return texts[index]
}