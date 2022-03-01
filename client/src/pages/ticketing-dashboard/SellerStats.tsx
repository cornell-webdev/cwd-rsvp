import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined'
import { Button, FlexContainer, Spacer, Text } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { useSellerStats } from 'src/api/seller'
import useIsMobile from 'src/hooks/useIsMobile'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
import FilterInput from './FilterInput'

interface ISellerStatsProps {
  eventId: string
}

const SellerStats = ({ eventId }: ISellerStatsProps) => {
  const [filterString, setFilterString] = useState<string>('')
  const [isReversed, setIsReversed] = useState<boolean>(false)
  const [isShowAll, setIsShowAll] = useState<boolean>(false)
  const [debouncedFilterString] = useDebounce(filterString, 1000)
  const { sellerStats } = useSellerStats(eventId, isReversed, isShowAll, debouncedFilterString)
  const isMobile = useIsMobile()

  return (
    <Container>
      <FlexContainer justifySpaceBetween alignCenter>
        <FilterInput
          placeholder='Name'
          value={filterString}
          onChange={(event) => setFilterString(event.target.value)}
        />
        <Button
          variant='text'
          size='small'
          startIcon={<SwapVertOutlinedIcon />}
          onClick={() => setIsReversed(!isReversed)}>
          Reverse {!isMobile && 'order'}
        </Button>
      </FlexContainer>
      {sellerStats && sellerStats?.length > 0 && (
        <>
          <ListContainer>
            {sellerStats?.map((seller) => (
              <SellerListItem key={seller?._id}>
                <Text variant='meta1'>{seller?.fullName}</Text>
                <FlexContainer alignCenter>
                  <HoriBar width={(seller?.soldCount / sellerStats[0]?.soldCount) * 100} />
                  <Spacer x={0.5} />
                  <Text variant='meta1'>{seller?.soldCount}</Text>
                </FlexContainer>
              </SellerListItem>
            ))}
          </ListContainer>
          <Button variant='text' size='small' onClick={() => setIsShowAll(true)}>
            Show all
          </Button>
        </>
      )}
    </Container>
  )
}

const Container = styled.div``

const ListContainer = styled.div`
  margin: 1.5rem 0;
`

const SellerListItem = styled.div`
  margin: 0.5rem 0;
`

interface HoriBarProps {
  width: number
}

const HoriBar = styled.div<HoriBarProps>`
  height: 11px;
  min-width: 16px;
  border-radius: 8px;
  background: ${(props) => props.theme.brand[500]};
  width: ${(props) => `${props.width - 10}%`};
`

export default SellerStats
