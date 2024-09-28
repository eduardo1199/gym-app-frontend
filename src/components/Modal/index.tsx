import { ReactNode } from 'react'

import {
  Modal as ModalContainer,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

interface ListData {
  name: string
}

interface ModalComponentProps {
  onCloseModal: () => void
  isOpenModal: boolean
  children: ReactNode
  modalTitle: string
}

const api = axios.create({})

export function ModalComponent({
  isOpenModal,
  onCloseModal,
  children,
  modalTitle,
}: ModalComponentProps) {
  const [list, setList] = useState<ListData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const retriveList = async () => {
        const params = {}
        setIsLoading(true)
      
        const list  = await api.get('URL', { params })

        setList(list.response)
        setIsLoading(false)

      // pode usar um try catch para tratar o erro dessa requisição
    }

    retriveList()
  }, [])

  // DAI BASTA MOSTRAR O DADO LIST ABAIXO NO RETORNO DO JSX
  // PODE SE QUISER UTILIZAR O ISLOADING PARA MOSTRAR UM CARREGAMENTO NO MODAL
  
  return (
    <ModalContainer onClose={onCloseModal} isOpen={isOpenModal}>
      <ModalOverlay />
      <ModalContent bg={'#5041BC'}>
        <ModalHeader>
          <p className="text-primary-white">{modalTitle}</p>
        </ModalHeader>
        <ModalCloseButton textColor={'white'} fontSize={14} />

        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalContainer>
  )
}
