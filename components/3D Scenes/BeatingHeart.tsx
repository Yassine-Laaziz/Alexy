import React, { useEffect, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'

export default function BeatingHeart(props: any) {
  const mesh = useRef()
  const { scene, animations } = useGLTF('/3D/BeatingHeart.glb')
  const { actions } = useAnimations(animations, mesh)

  useEffect(() => {
    actions?.HeartAction?.play()
    actions['PlusAction.001']?.play()
  }, [actions])

  return (
    <mesh ref={mesh} {...props}>
      <primitive object={scene} />
    </mesh>
  )
}

useGLTF.preload('/3D/BeatingHeart.glb')
