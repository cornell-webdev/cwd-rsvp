import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined'
import { Button, FlexContainer, Spacer, Text } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { useSellerStats } from 'src/api/seller'
import useIsMobile from 'src/hooks/useIsMobile'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
import FilterInput from './FilterInput'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import { useSnackbar } from 'notistack'
import copyToClipboard from 'src/util/copyToClipboard'
import getSellersLink from 'src/util/getSellersLink'
import LoadingDots from 'src/components/LoadingDots'

interface ISellerStatsProps {
  eventId: string
}

const SellerStats = ({ eventId }: ISellerStatsProps) => {
  const [filterString, setFilterString] = useState<string>('')
  const [isReversed, setIsReversed] = useState<boolean>(false)
  const [isShowAll, setIsShowAll] = useState<boolean>(false)
  const [debouncedFilterString] = useDebounce(filterString, 1000)
  const { sellerStats, isLoading } = useSellerStats(
    eventId,
    isReversed,
    isShowAll,
    debouncedFilterString
  )
  const isMobile = useIsMobile()
  const { enqueueSnackbar } = useSnackbar()

  const copySellersLink = (sellerId: string) => {
    copyToClipboard(getSellersLink({ eventId, sellerId }))
    enqueueSnackbar("Copied seller's link")
  }

  if (isLoading) {
    return <LoadingDots />
  }

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
              <SellerListItem key={seller?._id} onClick={() => copySellersLink(seller?._id)}>
                <FlexContainer alignCenter>
                  <Text variant='meta1'>{seller?.fullName}</Text>
                  <Spacer x={0.3} />
                  <StyledLinkIcon />
                </FlexContainer>
                <FlexContainer alignCenter>
                  <HoriBar
                    width={
                      (seller?.soldCount /
                        Math.max(
                          sellerStats[0]?.soldCount,
                          sellerStats[sellerStats?.length - 1]?.soldCount
                        )) *
                      100
                    }
                  />
                  <Spacer x={0.5} />
                  <Text variant='meta1'>{seller?.soldCount}</Text>
                </FlexContainer>
              </SellerListItem>
            ))}
          </ListContainer>
          {!isShowAll && (
            <Button variant='text' size='small' onClick={() => setIsShowAll(true)}>
              Show all
            </Button>
          )}
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
  margin: 0.2rem 0;
  padding: 0.3rem 0.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 80ms ease-in-out;

  @media (min-width: ${(props) => props.theme.small}) {
    &:hover {
      background: ${(props) => props.theme.grey[100]};
    }
  }
`

const StyledLinkIcon = styled(InsertLinkOutlinedIcon)`
  fill: ${(props) => props.theme.brand[500]};
  opacity: 0;
  transition: opacity 80ms ease-in-out;

  ${SellerListItem}:hover & {
    opacity: 1;
  }
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
