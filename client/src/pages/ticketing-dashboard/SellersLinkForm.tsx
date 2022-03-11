import { Button, FlexContainer, IconButton, Spacer } from 'cornell-glue-ui'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { useGenerateSeller } from 'src/api/seller'
import Input from 'src/components/form-elements/Input'
import copyToClipboard from 'src/util/copyToClipboard'
import getSellersLink from 'src/util/getSellersLink'
import styled from 'styled-components'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

interface ISellersLinkFormProps {
  eventId: string
}

const SellersLinkForm = ({ eventId }: ISellersLinkFormProps) => {
  const [fullName, setFullName] = useState<string>('')
  const [netId, setNetId] = useState<string>('')
  const [generatedLink, setGeneratedLink] = useState<string>('')
  const { generateSellerAsync } = useGenerateSeller()
  const { enqueueSnackbar } = useSnackbar()

  const handleGenerateLink = async () => {
    const seller = await generateSellerAsync({
      eventId,
      fullName,
      netId,
    })
    setGeneratedLink(getSellersLink({ eventId, sellerId: seller?._id }))
    setFullName(seller?.fullName)
  }

  const copySellersLink = () => {
    if (generatedLink && generatedLink?.length > 0) {
      copyToClipboard(generatedLink)
      enqueueSnackbar("Copied seller's link")
    }
  }

  return (
    <Container>
      <Input
        label="Seller's full name"
        width='250'
        value={fullName}
        onChange={(event) => setFullName(event.target?.value)}
        autoComplete='new-password'
      />
      <Spacer y={0.5} />
      <FlexContainer alignEnd justifyStart>
        <Input
          label="Seller's NetID"
          width='140'
          value={netId}
          onChange={(event) => setNetId(event.target?.value)}
          autoComplete='new-password'
        />
        <Spacer x={1} />
        <div>
          <Button onClick={handleGenerateLink}>Generate</Button>
          <Spacer y={0.2} />
        </div>
      </FlexContainer>
      <Spacer y={2} />
      <RelativeContainer>
        <IconContainer onClick={copySellersLink}>
          <StyledCopyIcon />
        </IconContainer>
        <StyledInput value={generatedLink} disabled />
      </RelativeContainer>
    </Container>
  )
}

const Container = styled.div`
  padding-top: 1rem;
`

const RelativeContainer = styled.div`
  position: relative;
`

const StyledInput = styled(Input)`
  padding-left: 50px;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
`

const IconContainer = styled.div`
  border-radius: 50%;
  background: ${(props) => props.theme.brand[50]};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 10px;
  top: 6px;
  height: 30px;
  width: 30px;
  box-shadow: ${(props) => props.theme.shadow.default};
  cursor: pointer;

  @media (min-width: ${(props) => props.theme.small}) {
    &:hover {
      background: ${(props) => props.theme.brand[100]};
    }
  }
`

const StyledCopyIcon = styled(ContentCopyIcon)`
  fill: ${(props) => props.theme.brand[500]};
  height: 18px;
  width: 18px;
`

export default SellersLinkForm
