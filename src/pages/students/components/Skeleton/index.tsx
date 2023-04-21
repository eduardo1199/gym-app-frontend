import { Skeleton } from '@chakra-ui/react'

export function LoadingSkeleton() {
  return (
    <>
      <tr>
        <td colSpan={6}>
          <Skeleton height="45px" />
        </td>
      </tr>
      <tr>
        <td className="py-2" />
      </tr>
    </>
  )
}
