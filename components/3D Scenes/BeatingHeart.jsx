import React, { useEffect, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'

export default function BeatingHeart(props) {
  const mesh = useRef()
  const { scene, animations, materials } = useGLTF('/3D/BeatingHeart2.glb')
  const { actions } = useAnimations(animations, mesh)

  useEffect(() => {
    console.log(useGLTF('/3D/BeatingHeart2.glb'))
    actions?.HeartAction?.play()
    actions['PlusAction.001']?.play()
  }, [])

  return (
    <mesh ref={mesh} {...props}>
      <primitive object={scene} />
    </mesh>
  )
}

useGLTF.preload('/3D/BeatingHeart2.glb')
