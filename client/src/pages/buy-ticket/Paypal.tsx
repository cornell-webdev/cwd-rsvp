import React from 'react'
import ReactDOM from 'react-dom'
import useScript from 'src/hooks/useScript'
import styled from 'styled-components'

export interface IPaypalProps {
  onPayment: (orderData: any) => void
  price: number
}

const Paypal = ({ onPayment, price }: IPaypalProps) => {
  const IS_PROD = import.meta.env.VITE_NODE_ENV === 'production'
  const PAYPAY_CLIENT_ID_SANDBOX =
    'AYSVsYzaqgrGAFGHTn-ZKX6sQr3YVU8J8nWDli6EZtk4_C6-KrtGNlaK_FuLS1vNHAfiNzWBmcHHZC5X'

  const PAYPAL_CLIENT_ID = IS_PROD
    ? import.meta.env.VITE_PAYPAL_CLIENT_ID
    : PAYPAY_CLIENT_ID_SANDBOX

  useScript(
    `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=buttons&disable-funding=credit&currency=USD`,
    true
  )

  // @ts-ignore
  const PayPalButton = window.paypal?.Buttons?.driver('react', { React, ReactDOM })

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: price,
          },
        },
      ],
    })
  }

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(function (orderData: any) {
      onPayment(orderData)
    })
  }

  if (!PayPalButton) return null

  return (
    <Container>
      <PayPalButton
        createOrder={(data: any, actions: any) => createOrder(data, actions)}
        onApprove={(data: any, actions: any) => onApprove(data, actions)}
      />
    </Container>
  )
}

const Container = styled.div`
  max-width: 300px;
`

export default Paypal
