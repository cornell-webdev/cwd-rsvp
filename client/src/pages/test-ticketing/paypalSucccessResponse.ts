export const prodSuccessResponse = {
  id: '91K48614G7672683D',
  intent: 'CAPTURE',
  status: 'COMPLETED',
  purchase_units: [
    {
      reference_id: 'default',
      amount: {
        currency_code: 'USD',
        value: '0.10',
      },
      payee: {
        email_address: 'sb-sueeb13849060@business.example.com',
        merchant_id: 'XTVBE94X3QMLJ',
      },
      soft_descriptor: 'PAYPAL *TEST STORE',
      shipping: {
        name: {
          full_name: 'JAEHYUNG JOO',
        },
        address: {
          address_line_1: '151 Dryden Road',
          admin_area_2: 'Ithaca',
          admin_area_1: 'NY',
          postal_code: '14850',
          country_code: 'US',
        },
      },
      payments: {
        captures: [
          {
            id: '1XC11668CM433882A',
            status: 'COMPLETED',
            amount: {
              currency_code: 'USD',
              value: '0.10',
            },
            final_capture: true,
            seller_protection: {
              status: 'NOT_ELIGIBLE',
            },
            create_time: '2022-02-16T15:23:46Z',
            update_time: '2022-02-16T15:23:46Z',
          },
        ],
      },
    },
  ],
  payer: {
    name: {
      given_name: 'JAEHYUNG',
      surname: 'JOO',
    },
    email_address: 'jj534@cornell.edu',
    payer_id: 'H9PJYQ4NPFYBS',
    address: {
      country_code: 'US',
    },
  },
  create_time: '2022-02-16T15:22:53Z',
  update_time: '2022-02-16T15:23:46Z',
  links: [
    {
      href: 'https://api.sandbox.paypal.com/v2/checkout/orders/91K48614G7672683D',
      rel: 'self',
      method: 'GET',
    },
  ],
}

export const devSucccessResponse = {
  id: '86U50485EC604163S',
  intent: 'CAPTURE',
  status: 'COMPLETED',
  purchase_units: [
    {
      reference_id: 'default',
      amount: {
        currency_code: 'USD',
        value: '0.01',
      },
      payee: {
        email_address: 'sb-sueeb13849060@business.example.com',
        merchant_id: 'XTVBE94X3QMLJ',
      },
      soft_descriptor: 'PAYPAL *TEST STORE',
      shipping: {
        name: {
          full_name: 'Jaehyung Joo',
        },
        address: {
          address_line_1: '151 Dryden Road',
          admin_area_2: 'Ithaca',
          admin_area_1: 'NY',
          postal_code: '14850',
          country_code: 'US',
        },
      },
      payments: {
        captures: [
          {
            id: '94617082NS361823J',
            status: 'COMPLETED',
            amount: {
              currency_code: 'USD',
              value: '0.01',
            },
            final_capture: true,
            seller_protection: {
              status: 'NOT_ELIGIBLE',
            },
            create_time: '2022-02-16T01:30:29Z',
            update_time: '2022-02-16T01:30:29Z',
          },
        ],
      },
    },
  ],
  payer: {
    name: {
      given_name: 'Jaehyung',
      surname: 'Joo',
    },
    email_address: 'cornellwebdev@gmail.com',
    payer_id: 'TGH9ZFY5NHRTC',
    address: {
      country_code: 'US',
    },
  },
  create_time: '2022-02-16T01:29:04Z',
  update_time: '2022-02-16T01:30:29Z',
  links: [
    {
      href: 'https://api.sandbox.paypal.com/v2/checkout/orders/86U50485EC604163S',
      rel: 'self',
      method: 'GET',
    },
  ],
}
