import { Slide } from '@chakra-ui/transition'
import { X } from 'phosphor-react'

interface SlideViewStudentProps {
  isOpen: boolean
  onClose: () => void
}

export function SlideViewStudent({ isOpen, onClose }: SlideViewStudentProps) {
  return (
    <Slide in={isOpen} style={{ zIndex: 10 }} direction="bottom">
      <div className="w-full h-[500px] p-9 bg-secondary-pink">
        <div className="flex justify-between">
          <h1>EDUARDO SOARES DE ARAUJO AQUINO</h1>
          <div>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
        </div>
      </div>
    </Slide>
  )
}
