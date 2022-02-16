import React, { useEffect } from 'react'

import useScript from 'src/hooks/useScript'
import styled from 'styled-components'

const TestTicketing = () => {
  const IS_PROD = import.meta.env.VITE_NODE_ENV === 'production'
  // const IS_PROD = true

  const PAYPAL_CLIENT_ID_PROD =
    'AXpcp5QBJP8WFzcs4EYeQzHxktf5XrtMaFwDdUdQlvJBDLDLSKlOy5Y7KFUt89IWHhlbOodnHSZJy3as'
  const PAYPAY_CLIENT_ID_SANDBOX =
    'AYSVsYzaqgrGAFGHTn-ZKX6sQr3YVU8J8nWDli6EZtk4_C6-KrtGNlaK_FuLS1vNHAfiNzWBmcHHZC5X'
  const PAYPAL_CLIENT_ID = IS_PROD ? PAYPAL_CLIENT_ID_PROD : PAYPAY_CLIENT_ID_SANDBOX

  useScript(`https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=buttons`)

  // @ts-ignore
  const paypal = window.paypal

  useEffect(() => {
    if (paypal) {
      console.log('init paypal env:', IS_PROD ? 'prod' : 'dev')
      paypal
        .Buttons({
          // Sets up the transaction when a payment button is clicked
          createOrder: function (data: any, actions: any) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: '0.10', // Can reference variables or functions. Example: `value: document.getElementById('...').value`
                  },
                },
              ],
            })
          },

          // Finalize the transaction after payer approval
          onApprove: function (data: any, actions: any) {
            return actions.order.capture().then(function (orderData: any) {
              // Successful capture! For dev/demo purposes:
              console.log('Capture result', orderData, JSON.stringify(orderData, null, 2))
              const transaction = orderData.purchase_units[0].payments.captures[0]
              alert(
                'Transaction ' +
                  transaction.status +
                  ': ' +
                  transaction.id +
                  '\n\nSee console for all available details'
              )

              // When ready to go live, remove the alert and show a success message within this page. For example:
              // var element = document.getElementById('paypal-button-container');
              // element.innerHTML = '';
              // element.innerHTML = '<h3>Thank you for your payment!</h3>';
              // Or go to another URL:  actions.redirect('thank_you.html');
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

export default TestTicketing
