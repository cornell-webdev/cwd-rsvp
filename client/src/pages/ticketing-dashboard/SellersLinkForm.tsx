import { Button, FlexContainer, Spacer } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { useGenerateSeller } from 'src/api/seller'
import Input from 'src/components/form-elements/Input'
import getSellersLink from 'src/util/getSellersLink'
import styled from 'styled-components'

interface ISellersLinkFormProps {
  eventId: string
}

const SellersLinkForm = ({ eventId }: ISellersLinkFormProps) => {
  const [fullName, setFullName] = useState<string>('')
  const [netId, setNetId] = useState<string>('')
  const [generatedLink, setGeneratedLink] = useState<string>('')
  const { generateSellerAsync } = useGenerateSeller()

  const handleGenerateLink = async () => {
    const seller = await generateSellerAsync({
      eventId,
      fullName,
      netId,
    })
    setGeneratedLink(getSellersLink({ eventId, sellerId: seller?._id }))
    setFullName(seller?.fullName)
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
      <FlexContainer alignEnd justifyStart>
        <Input
          label="Seller's NetID"
          width='130'
          value={netId}
          onChange={(event) => setNetId(event.target?.value)}
          autoComplete='new-password'
        />
        <Spacer x={1.5} />
        <div>
          <Button onClick={handleGenerateLink}>Generate</Button>
          <Spacer y={0.2} />
        </div>
      </FlexContainer>
      <Spacer y={2} />
      <Input value={generatedLink} disabled />
    </Container>
  )
}

const Container = styled.div`
  padding-top: 1rem;
`

export default SellersLinkForm
