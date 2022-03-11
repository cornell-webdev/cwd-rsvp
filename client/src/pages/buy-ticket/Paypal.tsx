import React, { useEffect } from 'react'
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
    `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=buttons&enable-funding=venmo&disable-funding=credit&currency=USD`
  )

  // @ts-ignore
  const paypal = window.paypal

  useEffect(() => {
    if (paypal) {
      console.log('init paypal env:', IS_PROD ? 'prod' : 'dev')
      paypal
        .Buttons({
          createOrder: function (data: any, actions: any) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: price,
                  },
                },
              ],
            })
          },
          onApprove: function (data: any, actions: any) {
            return actions.order.capture().then(function (orderData: any) {
              onPayment(orderData)
            })
          },
        })
        .render('#paypal-button-container')
    }
  }, [paypal])

  return <Container id='paypal-button-container' />
}

const Container = styled.div`
  max-width: 300px;
`

export default Paypal
